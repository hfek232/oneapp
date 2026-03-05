#!/usr/bin/perl
use strict;
use warnings;

my $app_file = 'src/App.tsx';
my $app_content = <<'APP_EOF';
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import MarketplaceShell from './components/marketplace-shell';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;
  if (session || isGuest) return <MarketplaceShell />;
  return <Auth onSkip={() => setIsGuest(true)} />;
}
APP_EOF

my $auth_file = 'src/components/Auth.tsx';
my $auth_content = <<'AUTH_EOF';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import TelegramLogin from './TelegramLogin';

interface AuthProps { onSkip: () => void; }

export default function Auth({ onSkip }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_up');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = view === 'sign_up' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black italic text-[#FF3B30] tracking-tighter">ADDIS NEON</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Pinduoduo Edition</p>
        </div>
        <div className="space-y-6">
          <TelegramLogin />
          <div className="flex items-center gap-4"><div className="h-px bg-slate-100 flex-1"/><span className="text-[10px] font-black text-slate-300 uppercase">or</span><div className="h-px bg-slate-100 flex-1"/></div>
          <form onSubmit={handleAuth} className="space-y-3">
            <Input type="email" placeholder="Email" className="h-14 bg-slate-50 border-none rounded-xl" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" className="h-14 bg-slate-50 border-none rounded-xl" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <Button type="submit" className="w-full h-16 rounded-2xl bg-[#FF3B30] text-white font-black text-lg active:scale-95 transition-transform" disabled={loading}>
              {loading ? 'SYNCING...' : (view === 'sign_up' ? 'CREATE ACCOUNT' : 'LOG IN')}
            </Button>
          </form>
          <button onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-tight underline">
            {view === 'sign_in' ? "New? Create Account" : "Have account? Login"}
          </button>
        </div>
        <div className="pt-8 text-center">
          <button onClick={onSkip} className="group flex flex-col items-center gap-2 mx-auto">
            <span className="text-[10px] font-black text-slate-300 group-hover:text-[#FF3B30] uppercase">Skip for now</span>
            <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-[#FF3B30] transition-all">
              <span className="text-slate-300 group-hover:text-[#FF3B30] text-xl">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
AUTH_EOF

sub write_file {
    my ($path, $content) = @_;
    open(my $fh, '>', $path) or die "Could not open $path: $!";
    print $fh $content;
    close($fh);
    print "✅ Updated $path\n";
}

write_file($app_file, $app_content);
write_file($auth_file, $auth_content);
