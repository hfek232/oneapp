import React from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from '../lib/supabase';
import { LogOut, User, Settings } from "lucide-react";
import { toast } from "sonner";

export default function UserNav() {
  const handleSignOut = async () => {
    // Using Sonner Promise for that Shadcn interactivity
    toast.promise(supabase.auth.signOut(), {
      loading: 'Signing out of OneApp...',
      success: 'See you soon!',
      error: 'Could not sign out. Try again.',
    });
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-zinc-900/50 rounded-full border border-zinc-800">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full hover:bg-zinc-800"
      >
        <User className="h-4 w-4 text-zinc-400" />
      </Button>
      
      <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

      <Button 
        variant="ghost" 
        onClick={handleSignOut}
        className="h-8 px-3 rounded-full text-xs font-bold text-zinc-400 hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all gap-2"
      >
        <LogOut className="h-3.5 w-3.5" />
        Logout
      </Button>
    </div>
  );
}
