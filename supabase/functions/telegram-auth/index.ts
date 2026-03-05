import { serve } from "https://deno.land/std@0.168.0/http/server.ts"; import { createClient } from "https://esm.sh/@supabase/supabase-js@2"; const BT = Deno.env.get("TELEGRAM_BOT_TOKEN"); const SU = Deno.env.get("SUPABASE_URL"); const SK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"); const sb = createClient(SU, SK); serve(async (r) => { try { const { message: m } = await r.json(); if (!m?.from) return new Response("OK"); const { id, first_name: fn } = m.from; await sb.from("profiles").upsert({ telegram_id: id, first_name: fn }, { onConflict: "telegram_id" }); const link = `https://oneapp-xi.vercel.app/?tid=${id}`; const text = `<b>🔥 LIMITED TIME GROUP BUY</b> 🇪🇹

Welcome <b>${fn.toUpperCase()}</b>! You've been invited to unlock exclusive community pricing.

📦 <b>Product:</b> Entertainment Premium Pass
💰 <b>Retail Price:</b> <s>500 ETB</s>
✨ <b>Group Price:</b> <b>150 ETB</b>
👥 <b>Status:</b> 3/5 Spots Filled (Hurry!)

<i>Join the group now to claim your 70% discount.</i>`; const keyboard = { inline_keyboard: [[{ text: "🛍️ JOIN GROUP & CLAIM DISCOUNT", url: link }], [{ text: "🎮 PLAY & EARN", url: `${link}&task=games` }, { text: "🤝 SHARE DEAL", switch_inline_query: "🔥 Get 70% off with me on OneApp!" }], [{ text: "🛡️ Secure Payment Verified", callback_data: "security_info" }]] }; await fetch(`https://api.telegram.org/bot${BT}/sendMessage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: m.chat.id, text, parse_mode: "HTML", reply_markup: keyboard }) }); return new Response("OK"); } catch (e) { return new Response(e.message); } })
