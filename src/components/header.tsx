import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import UserNav from './UserNav';
import { Button } from "@/components/ui/button";

export default function Header() {
  const [session, setSession] = useState<any>(null);
  const [tid, setTid] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setTid(new URLSearchParams(window.location.search).get("tid"));
    });

    // Listen for changes (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setTid(new URLSearchParams(window.location.search).get("tid"));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#FF3B30] rounded-full flex items-center justify-center font-black text-white text-sm">
          A
        </div>
        <span className="font-bold tracking-tight hidden sm:block">OneApp</span>
      </div>

      <div className="flex items-center gap-3">
        {(session || tid) ? (
          <UserNav />
        ) : (
          <Button 
            variant="ghost" 
            className="text-zinc-400 hover:text-white font-bold text-sm"
            onClick={() => window.location.href = '/'} 
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
