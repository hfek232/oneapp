import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthComponent from './AuthComponent';
import MarketplaceShell from './components/marketplace-shell';

/**
 * App is the "Traffic Controller".
 * It only cares if the user is Authenticated, a Guest, or Loading.
 */
export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for Auth changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Prevent "flicker" while checking session
  if (loading) return null;

  // CONVENTION: If user has a session OR clicked Skip, show the Main App
  if (session || isGuest) {
    return <MarketplaceShell />;
  }

  // Otherwise, show the Auth screen and pass the "Skip" handler down
  return <AuthComponent onSkip={() => setIsGuest(true)} />;
}
