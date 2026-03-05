import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthComponent from './components/AuthComponent';
import { PrivacyPolicy, Terms, DataDeletion } from "./components/LegalRoutes";
import TelegramLogin from "./components/TelegramLogin";
import MarketplaceShell from './components/marketplace-shell';
import { Toaster } from 'sonner';

export default function App() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tid = params.get("tid");
    if (tid) {
      localStorage.setItem("oneapp_tid", tid);
      alert("✅ Telegram Linked Successfully!");
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);
  // --- TELEGRAM AUTH SYNC (Migration Truth) ---
  React.useEffect(() => {
    if (tid) {
      localStorage.setItem("oneapp_tid", tid);
      alert("✅ Telegram Linked Successfully! Welcome to OneApp.");
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);
  // --- TELEGRAM AUTH SYNC (Migration Truth) ---
  React.useEffect(() => {
    if (tid) {
      localStorage.setItem("oneapp_tid", tid);
      alert("✅ Telegram Linked Successfully! Welcome to OneApp.");
      // Clear URL and refresh to apply state
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);
  // --- TELEGRAM AUTH SYNC (Migration Truth) ---
  React.useEffect(() => {
    if (tid) {
      localStorage.setItem("oneapp_tid", tid);
      alert("✅ Telegram Linked Successfully! Welcome to OneApp.");
      // Clear URL and refresh to apply state
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);
  // --- TELEGRAM AUTH SYNC (Migration Truth) ---
  React.useEffect(() => {
    if (tid) {
      console.log("Found Telegram ID:", tid);
      localStorage.setItem("oneapp_tid", tid);
      alert("✅ Telegram Linked Successfully! Welcome to OneApp.");
      // Clear the URL for a clean look
      window.history.replaceState({}, document.title, window.location.pathname);
      // Trigger a page refresh to apply "Logged In" state
      window.location.reload();
    }
  }, []);
  // -------------------------------------------
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tid) {
      console.log("✅ Telegram Auth Sync:", tid);
      setIsGuest(true); // The Pinduoduo Bypass
    }
    if (tid) {
      console.log("Telegram Auth Detected:", tid);
      setIsGuest(true);
    }
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
