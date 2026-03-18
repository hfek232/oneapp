import os
from pathlib import Path

def check_files():
    print("📁 --- Checking File Structure ---")
    required = [
        "src/features/auth/hooks/useTelegramAuth.ts",
        "src/features/auth/components/TelegramLogin.tsx",
        "src/lib/supabase.ts",
        "supabase/functions/telegram-auth/index.ts"
    ]
    for f in required:
        status = "✅ FOUND" if os.path.exists(f) else "❌ MISSING"
        print(f"{status}: {f}")

def check_env():
    print("\n🔑 --- Checking Environment Variables ---")
    vars = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"]
    # In a real environment, we'd check .env, but here we just remind the user
    print("Action: Ensure your .env file contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY")

def check_botfather():
    print("\n🤖 --- Telegram Bot Configuration ---")
    print("Action: Open @BotFather in Telegram and verify:")
    print("  1. /setdomain for @App_yehfdhdbot is set to 'oneapp-xi.vercel.app'")
    print("  2. The Widget JS uses the correct bot username.")

if __name__ == "__main__":
    check_files()
    check_botfather()
