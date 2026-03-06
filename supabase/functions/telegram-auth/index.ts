import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const BOT_TOKEN = "8682825900:AAEVGTyLUp5GTuGWEqo33xnyh-zPUMlx55k";
const SUPABASE_URL = "https://ysvzgkpzygnjpmckljaa.supabase.co";
const SUPABASE_SERVICE_ROLE = "sbp_43200663c51663d1a2ab8bfb2ccfbf8cf3a9c651"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const m = body.message || body.edited_message;
    if (!m || !m.from) return new Response("OK");

    const { id, first_name } = m.from;
    const link = `https://oneapp-xi.vercel.app/?tid=${id}`;

    // Amharic Onboarding Message
    const text = `<b>እንኳን ደህና መጡ ${first_name}! 🌟</b>\n\nየ <b>70% ቅናሽ</b> ኩፖንዎ አሁን ዝግጁ ነው።\n\n💰 <b>ዋጋ:</b> <s>500 ETB</s> → <b>150 ETB</b>\n\n<i>ይህ አቅርቦት ለተወሰነ ጊዜ ብቻ ነው!</i>`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: m.chat.id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "🛍️ ቅናሹን አሁኑኑ ያግኙ (CLAIM DISCOUNT)", url: link }]]
        }
      })
    });

    return new Response("OK");
  } catch (e) {
    return new Response("OK");
  }
});
