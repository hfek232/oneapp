import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from '../lib/supabase';

export default function EmailAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sonner Promise: Handles loading/success/error in one go
    toast.promise(async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error && error.message.includes("Invalid login credentials")) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
      } else if (error) {
        throw error;
      }
    }, {
      loading: 'Verifying credentials...',
      success: 'Welcome to OneApp!',
      error: (err) => `Auth failed: ${err.message}`,
    });
  };

  return (
    <form onSubmit={handleAuth} className="space-y-4 w-full">
      <div className="space-y-2">
        <Input 
          type="email" 
          placeholder="Email address" 
          className="h-14 rounded-full bg-zinc-900 border-zinc-800 text-white focus:ring-[#FF3B30]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          type="password" 
          placeholder="Password" 
          className="h-14 rounded-full bg-zinc-900 border-zinc-800 text-white focus:ring-[#FF3B30]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full h-14 rounded-full bg-[#FF3B30] hover:bg-[#E60023] font-bold text-lg active:scale-95 transition-all">
        Continue
      </Button>
    </form>
  );
}
