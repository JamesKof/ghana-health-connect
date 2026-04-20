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
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const NEWS_BASE = "https://www.nhis.gov.gh";
const APP_URL = "https://nhis-nextgen-gh.lovable.app";
const FROM_EMAIL = "NHIS Ghana <onboarding@resend.dev>";

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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
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

// Generate a 1-sentence summary using Lovable AI
async function generateSummary(title: string, category: string): Promise<string | null> {
  if (!LOVABLE_API_KEY) return null;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You write a single concise preview sentence (max 22 words) describing a news article from Ghana's National Health Insurance Scheme (NHIS). Write in plain, neutral journalistic style. No quotes, no emoji, no hashtags. Output only the sentence.",
          },
          {
            role: "user",
            content: `Headline: ${title}\nCategory: ${category}\n\nWrite the preview sentence:`,
          },
        ],
      }),
    });
    if (!res.ok) {
      console.warn("AI summary failed:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) return null;
    // Strip surrounding quotes if model added them
    return text.replace(/^["'`]|["'`]$/g, "").slice(0, 280);
  } catch (err) {
    console.warn("AI summary error:", err);
    return null;
  }
}

// Email a single new article to all confirmed subscribers
async function emailArticleToSubscribers(
  supabase: any,
  article: { id: string; title: string; url: string; category: string; summary: string | null; published_text: string | null },
) {
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set; skipping subscriber emails");
    return;
  }
  const { data: subs } = await supabase
    .from("news_subscribers")
    .select("email, unsubscribe_token")
    .eq("status", "confirmed");

  if (!subs || subs.length === 0) return;
  console.log(`Emailing article "${article.title}" to ${subs.length} subscribers`);

  for (const sub of subs) {
    const unsubUrl = `${SUPABASE_URL}/functions/v1/unsubscribe-news?token=${sub.unsubscribe_token}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
        <div style="text-align:center;padding:16px 0;border-bottom:3px solid #0066B3">
          <h1 style="color:#0066B3;margin:0;font-size:22px">NHIS Ghana News</h1>
        </div>
        <div style="background:#f5f7fa;padding:6px 12px;border-radius:4px;display:inline-block;margin-top:24px;font-size:12px;color:#0066B3;font-weight:600;text-transform:uppercase">${article.category}</div>
        <h2 style="color:#1a1a1a;margin:12px 0 8px;font-size:20px;line-height:1.3">${escapeHtml(article.title)}</h2>
        ${article.published_text ? `<p style="color:#888;font-size:13px;margin:0 0 16px">${escapeHtml(article.published_text)}</p>` : ""}
        ${article.summary ? `<p style="color:#444;line-height:1.6;font-size:15px">${escapeHtml(article.summary)}</p>` : ""}
        <p style="text-align:center;margin:32px 0">
          <a href="${article.url}" style="background:#0066B3;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
            Read full article
          </a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px;text-align:center">
          You're receiving this because you subscribed to NHIS Ghana news updates.<br/>
          <a href="${unsubUrl}" style="color:#999">Unsubscribe</a>
        </p>
      </div>
    `;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [sub.email],
          subject: `NHIS: ${article.title}`,
          html,
        }),
      });
      if (!r.ok) console.warn("Resend send failed:", r.status, await r.text());
    } catch (err) {
      console.warn("Resend error:", err);
    }
  }

  // Mark article as emailed
  await supabase
    .from("news_articles")
    .update({ emailed_at: new Date().toISOString() })
    .eq("id", article.id);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req: Request) => {
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

    // Check cache freshness — only consider cache valid if we have articles
    let useCache = false;
    if (!forceRefresh) {
      const { count } = await supabase
        .from("news_articles")
        .select("*", { count: "exact", head: true });
      if ((count ?? 0) > 0) {
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

    // Generate AI summaries for articles missing them (cap at 8 per run for latency)
    const { data: needSummary } = await supabase
      .from("news_articles")
      .select("id, title, category")
      .is("summary", null)
      .limit(8);
    if (needSummary && needSummary.length > 0) {
      console.log(`Generating AI summaries for ${needSummary.length} articles`);
      for (const a of needSummary) {
        const summary = await generateSummary(a.title, a.category);
        if (summary) {
          await supabase.from("news_articles").update({ summary }).eq("id", a.id);
        }
      }
    }

    // Email new articles to confirmed subscribers (articles never emailed before)
    const { data: toEmail } = await supabase
      .from("news_articles")
      .select("id, title, url, category, summary, published_text")
      .is("emailed_at", null)
      .order("published_date", { ascending: false, nullsFirst: false })
      .limit(5);
    if (toEmail && toEmail.length > 0) {
      for (const article of toEmail) {
        await emailArticleToSubscribers(supabase, article);
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
