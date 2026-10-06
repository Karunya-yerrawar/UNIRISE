// UNIRISE Supabase Edge Function: AI Assistant
// Serves as the serverless gateway for RAG query processing & AI recommendations.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AIQueryRequest {
  prompt: string;
  category?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, category } = await req.json() as AIQueryRequest;

    // TODO: Connect to Google Gemini API or RAG vector search endpoint using process.env.GEMINI_API_KEY
    // For now, return structured placeholder response schema
    const responsePayload = {
      status: "success",
      query: prompt,
      summary: `UNIRISE AI analyzed campus listings for "${prompt}".`,
      cards: [
        {
          id: "edge-101",
          title: "AI INNOVATE 2026",
          category: "HACKATHON",
          type: "hackathon",
          organization: "AI Club",
          date: "15 Oct 2026",
          location: "Innovation Lab",
          description: "Build innovative AI solutions and compete with top student teams.",
          tags: ["AI", "Hackathon", "EdgeFunction"],
          actionText: "Register",
          link: "#"
        }
      ]
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
