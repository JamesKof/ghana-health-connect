import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NHIS_SYSTEM_PROMPT = `You are NHIS Assistant, an AI chatbot for the National Health Insurance Scheme (NHIS) of Ghana. You help visitors with questions about NHIS services, membership, benefits, and more.

Key information about NHIS:
- NHIS is Ghana's social health insurance program providing financial access to quality healthcare
- Coverage includes outpatient services, inpatient services, maternity care, emergencies, surgeries, and oral health
- To register, visit any NHIS District Office with a Ghana Card or valid ID
- Renewal can be done via *929# USSD code, MyNHIS mobile app, or at district offices
- Premium varies by category: informal sector (GHS 30), SSNIT contributors (2.5% of salary deducted automatically)
- Benefits cover about 95% of disease conditions in Ghana
- Over 4000+ accredited healthcare facilities nationwide
- Call center: 054 444 6447
- Email: info@nhia.gov.gh
- Website: www.nhis.gov.gh

Be helpful, friendly, and provide accurate information. If you don't know something specific, direct users to call 054 444 6447 or visit www.nhis.gov.gh for official information.

Keep responses concise and clear.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: NHIS_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to process request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
