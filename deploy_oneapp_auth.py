import os
from pathlib import Path

# --- THE CONFIGURATION ---
BOT_USERNAME = "App_yehfdhdbot"

files = {
    # 1. THE EDGE FUNCTION (Deno) - The "Brain"
    "supabase/functions/telegram-auth/index.ts": r'''
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { id, first_name, username, auth_date, hash } = await req.json()
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN")!

    // --- HMAC VALIDATION ---
    const dataCheckString = Object.entries({ id, first_name, username, auth_date })
      .filter(([_, v]) => v !== undefined)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join('\n')

    const encoder = new TextEncoder()
    const secretKey = await crypto.subtle.importKey(
      "raw", encoder.encode("WebAppData"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    )
    const secret = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(botToken))
    const signatureKey = await crypto.subtle.importKey(
      "raw", secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    )
    const signature = await crypto.subtle.sign("HMAC", signatureKey, encoder.encode(dataCheckString))
    const hexSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('')

    if (hexSignature !== hash) {
      return new Response(JSON.stringify({ error: 'Invalid hash' }), { status: 401, headers: corsHeaders })
    }

    // --- SUPABASE USER CREATION ---
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
    
    // We use a virtual email based on Telegram ID to keep it permanent
    const email = `tg_${id}@oneapp.internal`
    
    const { data: user, error: userError } = await supabase.auth.admin.getUserByEmail(email)
    
    let targetUser = user?.user
    if (userError || !targetUser) {
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: True,
        user_metadata: { tg_id: id, username, first_name }
      })
      if (createError) throw createError
      targetUser = newUser.user
    }

    // Generate a link to sign them in immediately
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    })
    
    if (linkError) throw linkError

    return new Response(JSON.stringify({ 
        access_token: linkData.properties.hashed_token, // This is simplified for the demo
        user: targetUser 
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders })
  }
})
''',

    # 2. THE FRONTEND HOOK (TanStack) - The "Permanent Session" manager
    "src/features/auth/hooks/useTelegramAuth.ts": r'''
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useTelegramAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (telegramUser: any) => {
      const { data, error } = await supabase.functions.invoke('telegram-auth', { body: telegramUser });
      if (error) throw error;

      // setSession makes the login PERMANENT in localStorage
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      if (sessionError) throw sessionError;
      return sessionData.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['auth-user'], user);
      console.log("Welcome to OneApp Marketplace, ", user?.user_metadata?.username);
    }
  });
};
'''
}

def run():
    for p, content in files.items():
        path = Path(p)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content.strip())
        print(f"✅ Setup: {p}")

if __name__ == "__main__":
    run()
