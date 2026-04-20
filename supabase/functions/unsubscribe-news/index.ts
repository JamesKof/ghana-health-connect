// Unsubscribes a news subscriber via secret token. GET endpoint.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const APP_URL = "https://nhis-nextgen-gh.lovable.app";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  let title = "Invalid link";
  let body = "This unsubscribe link is not valid.";

  if (token) {
    const { data: sub } = await supabase
      .from("news_subscribers")
      .select("id")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (sub) {
      await supabase
        .from("news_subscribers")
        .update({ status: "unsubscribed" })
        .eq("id", sub.id);
      title = "You've been unsubscribed";
      body = "You'll no longer receive NHIS news emails. You can resubscribe anytime from our website.";
    }
  }

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>${title} · NHIS Ghana</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  body{font-family:Arial,sans-serif;background:#f5f7fa;margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center}
  .card{background:#fff;max-width:480px;width:90%;margin:24px;padding:40px 32px;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);text-align:center}
  h1{color:#0066B3;margin:0 0 16px;font-size:24px}
  p{color:#444;line-height:1.6}
  a.btn{display:inline-block;margin-top:24px;background:#0066B3;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600}
</style></head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${body}</p>
    <a class="btn" href="${APP_URL}">Visit NHIS Ghana</a>
  </div>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});
