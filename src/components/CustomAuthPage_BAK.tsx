import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Loader = () => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
  </div>
);

export default function CustomAuthPage({ onSkip }: { onSkip: () => void }) {
  const [view, setView] = useState<'login' | 'signup'>('signup');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Enter your credentials to continue");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: authError } = view === 'signup' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      // Mapping "ugly" technical errors to "Friendly" 2026 UX language
      if (authError.message.includes("Anonymous")) {
        setError("Please use a valid email address");
      } else if (authError.message.includes("Invalid login")) {
        setError("Double check your email or password");
      } else {
        setError(authError.message);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center font-sans p-4 overflow-hidden relative">
      
      {/* ETHIOPIAN HIGH ART TRICOLOR BAR */}
      <div className="absolute top-0 w-full h-1.5 flex">
        <div className="flex-1 bg-[#009739]"></div>
        <div className="flex-1 bg-[#FFD100]"></div>
        <div className="flex-1 bg-[#EF3340]"></div>
      </div>

      <div className={`w-full max-w-[400px] z-10 transition-transform ${error ? 'animate-shake' : ''}`}>
        <Card className="border-none shadow-[0_40px_80px_-15px_rgba(239,51,64,0.15)] rounded-[3rem] bg-white">
          
          <CardHeader className="pt-10 pb-4 text-center">
            <h1 className="text-6xl font-[1000] italic tracking-tighter text-black">
              A-nd<span className="text-[#EF3340]">!</span>
            </h1>
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">
              {view === 'signup' ? 'New Bargain Hunter' : 'Member Access'}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-8 space-y-6">
            
            {/* INLINE ERROR BADGE (No more alerts!) */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-3 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold text-[#EF3340] text-center uppercase tracking-tight">
                  ⚠️ {error}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-14 rounded-2xl border-slate-100 font-black text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-all">
                Google
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-slate-100 font-black text-[10px] uppercase tracking-wider hover:bg-slate-50 transition-all text-[#229ED9]">
                Telegram
              </Button>
            </div>

            <div className="space-y-3">
              <Input 
                placeholder="Mobile / Email" 
                className={`h-14 rounded-2xl bg-slate-50 border-none font-bold transition-all ${error ? 'ring-1 ring-red-100' : ''}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
              />
              <Input 
                type="password" 
                placeholder="Security Key" 
                className={`h-14 rounded-2xl bg-slate-50 border-none font-bold transition-all ${error ? 'ring-1 ring-red-100' : ''}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
              />
            </div>

            <Button 
              onClick={handleAuth}
              disabled={loading}
              className="w-full h-16 rounded-[1.5rem] bg-[#EF3340] hover:bg-[#D12B35] text-white font-[1000] text-xl shadow-[0_15px_30px_rgba(239,51,64,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 italic"
            >
              {loading ? <Loader /> : view === 'signup' ? 'JOIN THE CLUB' : 'GO TO SHOP'}
            </Button>
          </CardContent>

          <CardFooter className="pb-10 pt-2 flex flex-col items-center">
             <button 
               onClick={() => { setView(view === 'signup' ? 'login' : 'signup'); setError(null); }}
               className="text-[10px] font-black text-slate-400 hover:text-black uppercase tracking-widest transition-colors"
             >
               {view === 'signup' ? 'Already have account? Sign In' : 'Need account? Register'}
             </button>
          </CardFooter>
        </Card>

        <div className="mt-8 w-full text-center">
          <button 
            onClick={onSkip}
            className="text-[10px] font-black text-slate-300 hover:text-[#EF3340] tracking-[0.5em] uppercase transition-all py-4 px-8"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
}
