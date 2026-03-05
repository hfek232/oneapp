import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import TelegramLogin from './TelegramLogin';
import { toast } from 'sonner';

interface AuthProps {
  onSkip: () => void;
}

/**
 * ADDIS NEON - GRANDFATHER EDITION
 * Merges original bypass logic with latest Telegram auth steps.
 */
export default function Auth({ onSkip }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [errorMsg, setErrorMsg] = useState('');

  // --- GRANDFATHER LOGIC ---
  // Listen for session changes directly in the component to handle 'Syncing' state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setLoading(true); // Immediate visual feedback during transition
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const { error } = view === 'sign_up' 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("already registered")) {
          setErrorMsg("Account exists. Try signing in!");
          toast.error("Account already exists");
        } else {
          setErrorMsg(error.message);
        }
      } else if (view === 'sign_up') {
        toast.success("Welcome to Addis Neon!");
      }
    } catch (err) {
      setErrorMsg("Connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-sm space-y-10">
        
        {/* Header - Pinduoduo Style */}
        <div className="text-center space-y-1">
          <h1 className="text-5xl font-black italic text-[#FF3B30] tracking-tighter leading-none">
            ADDIS NEON
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">
            Pinduoduo Edition
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Telegram Auth Step - telegramauthsteps */}
          <div className="transform active:scale-95 transition-transform">
            <TelegramLogin />
          </div>

          <div className="flex items-center gap-4 px-2">
            <div className="h-[1px] bg-slate-100 flex-1" />
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">or secure email</span>
            <div className="h-[1px] bg-slate-100 flex-1" />
          </div>

          {/* 2. Email Form */}
          <form onSubmit={handleAuth} className="space-y-3">
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus:ring-2 ring-red-100 transition-all font-medium" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <Input 
                type="password" 
                placeholder="Password" 
                className="rounded-2xl h-14 bg-slate-50 border-none px-6 focus:ring-2 ring-red-100 transition-all font-medium" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <div className="h-4 flex items-center justify-center">
              {errorMsg && <p className="text-[#FF3B30] text-[10px] font-bold uppercase animate-pulse">{errorMsg}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 rounded-[1.5rem] bg-[#FF3B30] text-white font-black text-lg shadow-xl shadow-red-100 hover:shadow-red-200 active:scale-95 transition-all" 
              disabled={loading}
            >
              {loading ? 'SYNCING...' : (view === 'sign_up' ? 'CREATE ACCOUNT' : 'LOG IN')}
            </Button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')} 
              className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:text-[#FF3B30] transition-colors underline decoration-slate-200 underline-offset-4"
            >
              {view === 'sign_in' ? "Don't have an account? Join Now" : "Already a member? Sign In"}
            </button>
          </div>
        </div>

        {/* 3. The Pinduoduo Skip Bypass */}
        <div className="pt-6 text-center border-t border-slate-50">
          <button 
            onClick={onSkip}
            className="group inline-flex flex-col items-center gap-3 transition-all"
          >
            <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-500 uppercase tracking-widest transition-colors">
              Explore as Guest
            </span>
            <div className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-[#FF3B30] group-hover:bg-red-50 transition-all duration-300">
              <span className="text-slate-300 group-hover:text-[#FF3B30] text-2xl font-light">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
