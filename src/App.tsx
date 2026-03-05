import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthComponent from './components/AuthComponent';
import { PrivacyPolicy, Terms, DataDeletion } from "./components/LegalRoutes";
import MarketplaceShell from './components/marketplace-shell';
import { Toaster } from 'sonner';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // 1. TELEGRAM AUTH HANDSHAKE (Migration Truth)
    const params = new URLSearchParams(window.location.search);
    const tid = params.get("tid");
    
    if (tid) {
      console.log("Telegram Auth Detected:", tid);
      localStorage.setItem("oneapp_tid", tid);
      setIsGuest(true);
      
      // Clean URL and show success without full reload loop
      window.history.replaceState({}, document.title, window.location.pathname);
      alert("✅ Telegram Linked Successfully!");
    } else if (localStorage.getItem("oneapp_tid")) {
      setIsGuest(true);
    }

    // 2. SUPABASE SESSION CHECK
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setIsGuest(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  // ROUTING
  const path = window.location.pathname;
  if (path === "/privacy") return <PrivacyPolicy />;
  if (path === "/terms") return <Terms />;
  if (path === "/deletion") return <DataDeletion />;

  return (
    <>
      <Toaster position="top-center" richColors />
      { (session || isGuest) ? (
        <MarketplaceShell />
      ) : (
        <AuthComponent onSkip={() => setIsGuest(true)} />
      )}
    </>
  );
}
