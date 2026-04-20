// Subscribe a user to NHIS news email updates.
// Creates a pending subscriber, sends a confirmation email via Resend.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const APP_URL = "https://nhis-nextgen-gh.lovable.app";
const FROM = "NHIS Ghana <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return json({ error: "Invalid email address" }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Upsert: if existing, get tokens; otherwise insert new
    const { data: existing } = await supabase
      .from("news_subscribers")
      .select("id, status, confirm_token, unsubscribe_token")
      .eq("email", email)
      .maybeSingle();

    let confirmToken: string;
    let unsubToken: string;

    if (existing) {
      if (existing.status === "confirmed") {
        return json({ ok: true, message: "You're already subscribed." });
      }
      confirmToken = existing.confirm_token;
      unsubToken = existing.unsubscribe_token;
      // Reset to pending in case they previously unsubscribed
      await supabase
        .from("news_subscribers")
        .update({ status: "pending" })
        .eq("id", existing.id);
    } else {
      const { data: inserted, error: insertErr } = await supabase
        .from("news_subscribers")
        .insert({ email })
        .select("confirm_token, unsubscribe_token")
        .single();
      if (insertErr || !inserted) {
        console.error("Insert error:", insertErr);
        return json({ error: "Could not subscribe right now. Please try again." }, 500);
      }
      confirmToken = inserted.confirm_token;
      unsubToken = inserted.unsubscribe_token;
    }

    const confirmUrl = `${SUPABASE_URL}/functions/v1/confirm-news-subscription?token=${confirmToken}`;
    const unsubUrl = `${SUPABASE_URL}/functions/v1/unsubscribe-news?token=${unsubToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a">
        <div style="text-align:center;padding:16px 0;border-bottom:3px solid #0066B3">
          <h1 style="color:#0066B3;margin:0;font-size:24px">NHIS Ghana News</h1>
        </div>
        <h2 style="color:#0066B3;margin-top:24px">Confirm your subscription</h2>
        <p>Thanks for signing up to receive the latest news and updates from the National Health Insurance Scheme.</p>
        <p>Please confirm your email address to start receiving NHIS articles in your inbox:</p>
        <p style="text-align:center;margin:32px 0">
          <a href="${confirmUrl}" style="background:#0066B3;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
            Confirm Subscription
          </a>
        </p>
        <p style="color:#666;font-size:13px">If you did not request this, simply ignore this email.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px;text-align:center">
          National Health Insurance Authority · Accra, Ghana<br/>
          <a href="${unsubUrl}" style="color:#999">Unsubscribe</a>
        </p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "Confirm your NHIS news subscription",
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return json({ error: "Could not send confirmation email." }, 500);
    }

    return json({
      ok: true,
      message: "Check your inbox to confirm your subscription.",
    });
  } catch (err: any) {
    console.error("subscribe-news error:", err);
    return json({ error: err?.message ?? "Unknown error" }, 500);
  }
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
