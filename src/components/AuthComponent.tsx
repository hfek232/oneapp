import React from 'react';
import { supabase } from '../lib/supabase';

interface AuthProps {
  onSkip: () => void;
}

export default function AuthComponent({ onSkip }: AuthProps) {
  
  // 1. YOUR EXISTING GOOGLE/FACEBOOK LOGIC
  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) console.error(`${provider} Auth Error:`, error.message);
  };

  // 2. THE TELEGRAM SMART LOGIC
  const handleTelegramAuth = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const isInsideTelegram = !!tg?.initData && tg.initData !== "";

    if (isInsideTelegram) {
      // Send the initData to your EXISTING Edge Function
      const { data, error } = await supabase.functions.invoke('telegram-auth', {
        body: { 
          payload: tg.initData, 
          type: 'tma' 
        }
      });

      if (!error && data?.session) {
        await supabase.auth.setSession(data.session);
      } else {
        console.error("Telegram Edge Auth Failed:", error);
      }
    } else {
      // Redirect to Bot to enter the Mini App environment
      window.location.href = "https://t.me/App_yehfdhdbot/oneapp";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-10 text-center border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">OneApp</h1>

        <div className="space-y-4">
          {/* TELEGRAM (Primary) */}
          <button
            onClick={handleTelegramAuth}
            className="w-full bg-[#24A1DE] hover:bg-[#208bbf] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            Continue with Telegram
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Or continue with</span></div>
          </div>

          {/* GOOGLE & FACEBOOK (Your existing providers) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialAuth('google')}
              className="flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialAuth('facebook')}
              className="flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700"
            >
              Facebook
            </button>
          </div>
        </div>

        <button onClick={onSkip} className="mt-8 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors">
          Browse as Guest
        </button>
      </div>
    </div>
  );
}
