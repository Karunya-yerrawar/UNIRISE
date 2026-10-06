// UNIRISE Supabase Edge Function: Poster OCR & Extraction
// Accepts uploaded event posters and uses Vision AI to extract event metadata.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // TODO: Process image FormData or base64 stream and invoke Vision AI model (e.g. Gemini Vision API)
    const mockExtractedData = {
      title: "UNIRISE AI & Cloud Innovation Summit 2026",
      organizer: "AI Club & Department of Computer Science",
      date: "25 October 2026",
      time: "10:00 AM – 4:30 PM",
      venue: "Main Auditorium, Block C",
      description: "Join us for the annual campus AI & Cloud Summit featuring keynote talks from industry tech leads.",
      deadline: "22 October 2026",
      registrationLink: "https://unirise.campus/summit-2026",
      type: "event"
    };

    return new Response(JSON.stringify({ status: "success", extracted: mockExtractedData }), {
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
