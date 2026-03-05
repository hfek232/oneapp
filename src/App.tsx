import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthComponent from './components/AuthComponent';
import { PrivacyPolicy, Terms, DataDeletion } from "./components/LegalRoutes";
import TelegramLogin from "./components/TelegramLogin";
import MarketplaceShell from './components/marketplace-shell';
import { Toaster } from 'sonner';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(!!new URLSearchParams(window.location.search).get("tid")); // The Pinduoduo Bypass State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tid = params.get("tid");
    if (tid) {
      console.log("✅ Telegram Auth Sync:", tid);
      setIsGuest(true); // The Pinduoduo Bypass
    }
    // Catch Telegram ID from URL (Migration Truth)
    const params = new URLSearchParams(window.location.search);
    const tid = params.get("tid");
    if (tid) {
      console.log("Telegram Auth Detected:", tid);
      setIsGuest(true);
    }
    // 1. Catch Telegram ID from URL (Migration Truth)
    const params = new URLSearchParams(window.location.search);
    const tid = params.get("tid");
    if (tid) {
      console.log("Telegram Auth Detected:", tid);
      setIsGuest(true);
    }
    // telegramauthsteps: Check initial session and listen for changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setIsGuest(false); // Reset guest state if they actually log in
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  const path = window.location.pathname;
  if (path === "/privacy") return <PrivacyPolicy />;
  if (path === "/terms") return <Terms />;
  if (path === "/deletion") return <DataDeletion />;
  if (path === "/deletion") return <DataDeletion />;

  return (
    <>
      {/* Required for "Account already exists" and "Welcome" toasts */}
      <Toaster position="top-center" richColors />
      
      {/* TRAFFIC CONTROLLER: 
          If session exists OR user clicked "Skip for now" (isGuest), 
          show the Marketplace. Otherwise, show the AuthComponent.
      */}
      { (session || isGuest) ? (
        <MarketplaceShell />
      ) : (
        <AuthComponent onSkip={() => setIsGuest(true)} />
      )}
    </>
  );
}
