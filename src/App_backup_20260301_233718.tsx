import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import CustomAuthPage from './components/CustomAuthPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const params = new URLSearchParams(window.location.search);
      const tid = params.get('tid');

      // 1. Check for Telegram User
      if (tid) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('telegram_id', tid)
          .single();

        if (profile) {
          setUser(profile);
          window.history.replaceState({}, '', '/'); // Clean URL
          setLoading(false);
          return;
        }
      }

      // 2. Check for Standard Auth Session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', session.user.id)
          .single();
        setUser(profile || session.user);
      }
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center">Connecting to OneApp...</div>;

  return user ? <Dashboard user={user} /> : <CustomAuthPage />;
}
