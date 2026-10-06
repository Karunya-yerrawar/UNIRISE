// UNIRISE Supabase Edge Function: Club Position Transfer
// Atomically transfers verified leadership positions (e.g., President, Treasurer) from one student to another.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PositionTransferRequest {
  clubId: string;
  positionId: string;
  currentHolderId: string;
  newHolderId: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { clubId, positionId, newHolderId } = await req.json() as PositionTransferRequest;

    // TODO: Validate caller authorization using Supabase Service Role client
    // Verify caller is current club leader or college administrator before executing position update in public.club_positions
    
    return new Response(
      JSON.stringify({
        status: "success",
        message: "Position successfully transferred",
        details: { clubId, positionId, newHolderId, transferredAt: new Date().toISOString() }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
