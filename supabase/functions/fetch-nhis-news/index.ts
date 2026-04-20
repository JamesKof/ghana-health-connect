// Fetch latest news articles from nhis.gov.gh, cache them in the
// news_articles table, and return the freshest items.
//
// Behavior:
// - GET (no params or ?refresh=false): Returns cached articles if they were
//   refreshed within the last hour. Otherwise scrapes pages 1-3 and refreshes.
// - GET ?refresh=true: Forces a re-scrape regardless of cache age.
// - Always responds with { articles, cached, fetched_at, count }.
//
// CORS: open (public news).

// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const NEWS_BASE = "https://www.nhis.gov.gh";

interface ScrapedArticle {
  title: string;
  url: string;
  category: string;
  published_date: string | null;
  published_text: string | null;
  summary: string | null;
  image_url: string | null;
  source: string;
}

// Lightweight HTML decoder for entities
function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function inferCategory(title: string): string {
  const t = title.toLowerCase();
  if (/(campus|nursing|midwifery|student|trainee|college)/.test(t)) return "Education";
  if (/(launch|policy|primary healthcare|uhc|free)/.test(t)) return "Policy";
  if (/(audit|review|driver|training|staff|retreat|operation)/.test(t)) return "Operations";
  if (/(register|registration|durbar|enroll|membership|card)/.test(t)) return "Membership";
  if (/(tariff|claim|payment|provider|facility|credential)/.test(t)) return "Providers";
  if (/(walk|partner|collaborat|undp|opportunity)/.test(t)) return "Partnerships";
  return "Announcements";
}

// Parse one news listing page from nhis.gov.gh/news?p=N
function parseNewsPage(html: string): ScrapedArticle[] {
  const articles: ScrapedArticle[] = [];

  // Match anchor tags pointing to /News/<slug>-<id> with a title attribute
  const anchorRegex =
    /<a[^>]+href=["'](\/News\/[^"']+?-(\d+))["'][^>]*?title=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;

  // We'll also need to find the date that follows each link in the listing.
  // The listing typically renders: <a ...>Title</a> ... <span>M/D/YYYY</span>
  // We capture text in a wider window to find dates near anchors.

  // Build list of anchors first
  const anchors: { url: string; title: string; index: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = anchorRegex.exec(html)) !== null) {
    const path = m[1];
    const title = decodeHtml(m[3]).trim();
    if (!title) continue;
    anchors.push({
      url: `${NEWS_BASE}${path}`,
      title,
      index: m.index,
    });
  }

  // Deduplicate by url
  const seen = new Set<string>();
  const unique = anchors.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // For each anchor, search for a date within the next 600 chars
  const dateRegex = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;

  for (const a of unique) {
    const window = html.slice(a.index, a.index + 600);
    const dm = window.match(dateRegex);
    let isoDate: string | null = null;
    let publishedText: string | null = null;
    if (dm) {
      const [_, mo, d, y] = dm;
      publishedText = `${mo}/${d}/${y}`;
      const dt = new Date(`${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`);
      if (!isNaN(dt.getTime())) {
        isoDate = dt.toISOString().slice(0, 10);
      }
    }

    articles.push({
      title: a.title,
      url: a.url,
      category: inferCategory(a.title),
      published_date: isoDate,
      published_text: publishedText,
      summary: null,
      image_url: null,
      source: "nhis.gov.gh",
    });
  }

  return articles;
}

async function scrapeAllPages(maxPages = 3): Promise<ScrapedArticle[]> {
  const all: ScrapedArticle[] = [];
  const seen = new Set<string>();

  for (let p = 1; p <= maxPages; p++) {
    const url = p === 1 ? `${NEWS_BASE}/news` : `${NEWS_BASE}/news?p=${p}`;
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; NHIS-Lovable-Bot/1.0; +https://lovable.dev)",
          "Accept": "text/html,application/xhtml+xml",
        },
      });
      if (!res.ok) {
        console.warn(`Page ${p} returned ${res.status}`);
        continue;
      }
      const html = await res.text();
      const items = parseNewsPage(html);
      for (const item of items) {
        if (seen.has(item.url)) continue;
        seen.add(item.url);
        all.push(item);
      }
    } catch (err) {
      console.error(`Error scraping page ${p}:`, err);
    }
  }
  return all;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase env vars missing");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get("refresh") === "true";

    // Check cache freshness — look at most recent fetched_at
    let useCache = false;
    if (!forceRefresh) {
      const { data: latest } = await supabase
        .from("news_articles")
        .select("fetched_at")
        .order("fetched_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (latest?.fetched_at) {
        const age = Date.now() - new Date(latest.fetched_at).getTime();
        if (age < CACHE_TTL_MS) useCache = true;
      }
    }

    let cached = useCache;

    if (!useCache) {
      console.log("Cache miss / refresh: scraping nhis.gov.gh...");
      const scraped = await scrapeAllPages(3);
      console.log(`Scraped ${scraped.length} articles`);

      if (scraped.length > 0) {
        const now = new Date().toISOString();
        const rows = scraped.map((a) => ({ ...a, fetched_at: now }));
        const { error: upsertErr } = await supabase
          .from("news_articles")
          .upsert(rows, { onConflict: "url" });
        if (upsertErr) {
          console.error("Upsert error:", upsertErr);
          // Fall back to cache if scrape upsert failed
          cached = true;
        }
      } else {
        // Scrape returned nothing — fall back to whatever is cached
        cached = true;
      }
    }

    // Return latest articles
    const { data: articles, error: readErr } = await supabase
      .from("news_articles")
      .select("*")
      .order("published_date", { ascending: false, nullsFirst: false })
      .order("fetched_at", { ascending: false })
      .limit(120);

    if (readErr) throw readErr;

    return new Response(
      JSON.stringify({
        articles: articles ?? [],
        count: articles?.length ?? 0,
        cached,
        fetched_at: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("fetch-nhis-news error:", error);
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
