import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")
const VERCEL_URL = "https://oneapp-xi.vercel.app" 

serve(async (req) => {
  try {
    const body = await req.json();
    const message = body.message;
    if (!message) return new Response("OK");

    const chatId = message.chat.id;
    const id = message.from.id;
    const fn = message.from.first_name || "User";

    const text = `<b>🔥 LIMITED TIME GROUP BUY</b> 🇪🇹

Welcome <b>${fn.toUpperCase()}</b>! You've been invited to unlock exclusive community pricing.

📦 <b>Product:</b> Entertainment Premium Pass
💰 <b>Retail Price:</b> <s>500 ETB</s>
✨ <b>Group Price:</b> <b>150 ETB</b>
👥 <b>Status:</b> 3/5 Spots Filled (Hurry!)

<i>Join the group now to claim your 70% discount.</i>`;

    const keyboard = { inline_keyboard: [[{ text: "🛍️ JOIN GROUP & CLAIM DISCOUNT", url: link }], [{ text: "🎮 PLAY & EARN", url: `${link}&task=games` }, { text: "🤝 SHARE DEAL", switch_inline_query: "🔥 Get 70% off with me on OneApp!" }], [{ text: "🛡️ Secure Payment Verified", callback_data: "security_info" }]] };

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        reply_markup: keyboard
      })
    });

    return new Response("OK");
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
})
