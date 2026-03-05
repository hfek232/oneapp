import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "../lib/supabase";
import TelegramLogin from "./TelegramLogin"; // <--- THE CRITICAL IMPORT

export default function CustomAuthPage({ onSkip }: { onSkip: () => void }) {
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) setErrorMsg(error.message);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    const { error } = view === 'sign_up' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white p-6 pb-12 font-sans">
      <div className="w-full max-w-[400px] flex-1 flex flex-col justify-center space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black italic text-[#FF3B30] tracking-tighter uppercase">A-ND!</h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Verified Access</p>
        </div>

        <div className="space-y-4">
          {/* 1. Google Social */}
          <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center gap-3 font-bold">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            Continue with Google
          </Button>

          {/* 2. THE TELEGRAM COMPONENT */}
          <div className="py-2">
            <TelegramLogin />
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] bg-slate-100 flex-1" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">or email</span>
            <div className="h-[1px] bg-slate-100 flex-1" />
          </div>

          {/* 3. Email Form */}
          <form onSubmit={handleAuth} className="space-y-3">
            <Input type="email" placeholder="Email" className="rounded-xl h-12 bg-slate-50 border-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" className="rounded-xl h-12 bg-slate-50 border-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="h-4 text-center">{errorMsg && <p className="text-[#FF3B30] text-[10px] font-bold">{errorMsg}</p>}</div>
            <Button type="submit" className="w-full h-14 rounded-2xl bg-[#FF3B30] text-white font-black" disabled={loading}>
              {loading ? 'SYNCING...' : (view === 'sign_up' ? 'CREATE ACCOUNT' : 'LOG IN')}
            </Button>
          </form>
        </div>
      </div>

      <button onClick={onSkip} className="text-sm font-black text-slate-300 hover:text-[#FF3B30] flex items-center gap-2 px-10 py-4 bg-slate-50 rounded-full transition-all">
        SKIP FOR NOW <span className="text-xl">→</span>
      </button>
    </div>
  );
}
