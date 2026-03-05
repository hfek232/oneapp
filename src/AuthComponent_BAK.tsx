import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from './lib/supabase';

export default function AuthComponent({ onSkip }: { onSkip: () => void }) {
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double-clicks

    setLoading(true);
    setErrorMsg(null);

    const { error } = view === 'sign_up' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      // Handle the "User already exists" case gracefully
      if (error.message.includes("already registered")) {
        setErrorMsg("Account exists! Try signing in instead.");
      } else {
        setErrorMsg(error.message);
      }
      setLoading(false);
    } else {
      // Success! (App.tsx useEffect will catch the session change)
      console.log("Auth successful");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background p-6 pb-12 font-sans select-none">
      <div className="w-full max-w-[400px] flex-1 flex flex-col justify-center space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-primary italic italic-accent">A-ndApp</h1>
          <p className="text-muted-foreground font-semibold text-lg uppercase tracking-widest opacity-80">
            {view === 'sign_up' ? 'New Account' : 'Welcome Back'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="bg-card p-8 rounded-[40px] border-2 border-border/50 shadow-2xl space-y-4 relative overflow-hidden">
          {/* Subtle Loading Bar */}
          {loading && <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />}

          <Input 
            type="email" 
            placeholder="Email Address" 
            className="rounded-2xl h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            className="rounded-2xl h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Inline Error Message (No more alerts!) */}
          <div className="h-4 flex items-center justify-center">
             {errorMsg && (
               <p className="text-destructive text-xs font-bold animate-in fade-in slide-in-from-top-1">
                 {errorMsg}
               </p>
             )}
          </div>
          
          <Button 
            type="submit"
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black text-lg shadow-lg active:scale-95 transition-all"
            disabled={loading}
          >
            {loading ? 'WAIT A SEC...' : (view === 'sign_up' ? 'JOIN NOW' : 'LOG IN')}
          </Button>

          <Button 
            type="button"
            variant="ghost" 
            className="w-full mt-2 text-primary/70 font-bold hover:bg-transparent hover:text-primary transition-colors"
            onClick={() => {
              setView(view === 'sign_in' ? 'sign_up' : 'sign_in');
              setErrorMsg(null);
            }}
          >
            {view === 'sign_in' ? '→ Create new account' : '→ Already a member? Login'}
          </Button>
        </form>
      </div>

      <button 
        onClick={onSkip}
        className="text-sm font-black text-muted-foreground/60 hover:text-primary transition-all flex items-center gap-2 px-8 py-3 bg-muted/20 hover:bg-muted/40 rounded-full border border-transparent hover:border-border"
      >
        SKIP FOR NOW <span className="text-xl">→</span>
      </button>
    </div>
  );
}
