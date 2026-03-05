import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import CustomAuthPage from './components/CustomAuthPage';
import IdentityManager from './components/IdentityManager';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2026 Pulse Loader
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <h1 className="text-5xl font-[1000] italic text-[#FF3B30] animate-pulse tracking-tighter">A-ND!</h1>
    </div>
  );

  // Router: If logged in OR skipped, show Marketplace. Else show Auth.
  if (session || skipped) {
    return (
      <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-black italic mb-2 tracking-tighter">Marketplace</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Habesha Deals Loading...</p>
        <button 
          onClick={() => {supabase.auth.signOut(); setSkipped(false)}} 
          className="mt-12 text-[10px] font-black uppercase text-slate-300 underline hover:text-[#FF3B30] transition-colors"
        >
          Logout / Reset Session
        </button>
      </div>
    );
  }

  return <CustomAuthPage onSkip={() => setSkipped(true)} />;
}
