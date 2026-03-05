import requests
import json

project_ref = "ysvzgkpzygnjpmckljaa"
token = "sbp_43200663c51663d1a2ab8bfb2ccfbf8cf3a9c651"
function_slug = "telegram-auth"

# The Clean TypeScript Code
ts_code = """
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
serve(async (req) => {
  try {
    const b = await req.json();
    const m = b.message || b.edited_message;
    if (!m) return new Response("OK");
    
    const payload = {
      chat_id: m.chat.id,
      text: `<b>Selam ${m.from?.first_name || "User"}!</b> 🇪🇹\\nWelcome back to OneApp.`,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ 
          text: "🚀 OPEN ONEAPP", 
          web_app: { url: `https://oneapp-xi.vercel.app/?tid=${m.from.id}` } 
        }]]
      }
    };
    
    await fetch("https://api.telegram.org/bot8682825900:AAEVGTyLUp5GTuGWEqo33xnyh-zPUMlx55k/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error(e);
  }
  return new Response("OK");
});
"""

url = f"https://api.supabase.com/v1/projects/{project_ref}/functions/{function_slug}"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
data = {
    "body": ts_code,
    "verify_jwt": False
}

print(f"Deploying to {function_slug}...")
response = requests.patch(url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    print("✅ Success! Version updated.")
    print(response.json())
else:
    print(f"❌ Failed: {response.status_code}")
    print(response.text)
