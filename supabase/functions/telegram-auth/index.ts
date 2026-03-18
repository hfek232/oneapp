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
    const link = `https://t.me/App_yehfdhdbot/Habirna?startapp=${id}`;

    // URGENCY: Calculate 2 hours from now
    const expiryTime = "2:00:00"; 

    // Amharic Onboarding Message with Countdown
    const text = `<b>እንኳን ደህና መጡ ${first_name}! 🌟</b>\n\n` +
                 `የ <b>70% ቅናሽ</b> ኩፖንዎ አሁን ዝግጁ ነው።\n\n` +
                 `💰 <b>ዋጋ:</b> <s>500 ETB</s> → <b>150 ETB</b>\n` +
                 `⏳ <b>የሚቆይበት ጊዜ:</b> <code>${expiryTime}</code> ቀርቷል!\n\n` +
                 `<i>ይህ ቅናሽ በ 2 ሰዓት ውስጥ ይጠናቀቃል!</i>`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: m.chat.id,
        text: text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🛍️ ቅናሹን አሁኑኑ ያግኙ (CLAIM NOW)", url: link }],
            [{ text: "⏰ አስታውሰኝ (REMIND ME)", callback_data: "remind" }]
          ]
        }
      })
    });

    return new Response("OK");
  } catch (e) {
    return new Response("OK");
  }
});
