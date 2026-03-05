#!/usr/bin/perl
use strict;
use warnings;

# Target file path
my $app_file = 'src/App.tsx';

# The synchronized logic for the Traffic Controller
my $app_content = <<'APP_EOF';
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import MarketplaceShell from './components/marketplace-shell';
import { Toaster } from 'sonner';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false); // The Pinduoduo Bypass State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <>
      {/* Required for the "Account already exists" and "Welcome" toasts */}
      <Toaster position="top-center" richColors />
      
      {/* TRAFFIC CONTROLLER: 
          If session exists OR user clicked "Skip for now" (isGuest), 
          show the Marketplace. Otherwise, show the Grandfather Auth.
      */}
      { (session || isGuest) ? (
        <MarketplaceShell />
      ) : (
        <Auth onSkip={() => setIsGuest(true)} />
      )}
    </>
  );
}
APP_EOF

# Write the file to disk
open(my $fh, '>', $app_file) or die "Could not open $app_file: $!";
print $fh $app_content;
close($fh);

print "✅ App.tsx has been updated with the latest Traffic Controller logic.\n";
