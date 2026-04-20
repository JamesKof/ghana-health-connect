// Confirms a news subscriber via secret token. GET endpoint — opens in browser.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const APP_URL = "https://nhis-nextgen-gh.lovable.app";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  let success = false;
  let title = "Invalid link";
  let body = "This confirmation link is not valid or has already been used.";

  if (token) {
    const { data: sub } = await supabase
      .from("news_subscribers")
      .select("id, status")
      .eq("confirm_token", token)
      .maybeSingle();

    if (sub) {
      if (sub.status === "confirmed") {
        success = true;
        title = "Already confirmed";
        body = "Your subscription to NHIS news is already active. You'll receive new articles in your inbox.";
      } else {
        const { error } = await supabase
          .from("news_subscribers")
          .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
          .eq("id", sub.id);
        if (!error) {
          success = true;
          title = "You're subscribed!";
          body = "Thank you for confirming. You'll now receive the latest news and updates from NHIS Ghana directly in your inbox.";
        }
      }
    }
  }

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>${title} · NHIS Ghana</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center}
  .card{background:#fff;max-width:480px;width:90%;margin:24px;padding:40px 32px;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);text-align:center}
  .badge{width:64px;height:64px;border-radius:50%;background:${success ? '#00A651' : '#dc2626'};color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:32px;font-weight:bold}
  h1{color:#0066B3;margin:0 0 16px;font-size:24px}
  p{color:#444;line-height:1.6}
  a.btn{display:inline-block;margin-top:24px;background:#0066B3;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600}
</style></head>
<body>
  <div class="card">
    <div class="badge">${success ? '✓' : '!'}</div>
    <h1>${title}</h1>
    <p>${body}</p>
    <a class="btn" href="${APP_URL}/news">View NHIS News</a>
  </div>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
  });
});
