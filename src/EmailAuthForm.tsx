import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '../lib/supabase';

export default function EmailAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError && authError.message.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) setError(signUpError.message);
    } else if (authError) {
      setError(authError.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAuth} className="space-y-3 w-full">
      <Input 
        type="email" 
        placeholder="Email address" 
        className="h-14 rounded-full bg-zinc-900 border-zinc-800 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input 
        type="password" 
        placeholder="Password" 
        className="h-14 rounded-full bg-zinc-900 border-zinc-800 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full h-14 rounded-full bg-[#FF3B30] hover:bg-[#E60023] font-bold" disabled={loading}>
        {loading ? 'Authenticating...' : 'Continue'}
      </Button>
      {error && <p className="text-[#FF3B30] text-xs text-center font-bold">{error}</p>}
    </form>
  );
}
