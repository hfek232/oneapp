#!/usr/bin/perl
use strict;
use warnings;

my $app_file = 'src/App.tsx';
my $app_content = <<'APP_EOF';
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import MarketplaceShell from './components/marketplace-shell';
import { Toaster } from 'sonner';

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

  return (
    <>
      <Toaster position="top-center" expand={false} richColors />
      { (session || isGuest) ? (
        <MarketplaceShell />
      ) : (
        <Auth onSkip={() => setIsGuest(true)} />
      )}
    </>
  );
}
APP_EOF

open(my $fh, '>', $app_file) or die "Could not open $app_file: $!";
print $fh $app_content;
close($fh);
print "✅ Updated $app_file with Sonner Toaster and Skip Logic\n";
