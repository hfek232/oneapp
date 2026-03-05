import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; 
import { Send } from "lucide-react";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TelegramLogin() {
  // 1. Auto-Sync Logic (Migration Truth)
  useEffect(() => {
    const tid = new URLSearchParams(window.location.search).get("tid");
    if (tid) {
      const syncUser = async () => {
        const { error } = await supabase.from("profiles").upsert({ telegram_id: parseInt(tid) }, { onConflict: "telegram_id" });
        if (!error) toast.success("Telegram Synced!");
      };
      syncUser();
    }
  }, []);
  const BOT_HANDLE = "App_yehfdhdbot"; 

  const handleTelegramAuth = () => {
    // Sonner Toast: Simple and clean
    toast.success("Opening Telegram", {
      description: "Check your bot messages for the login link.",
      position: "top-center",
    });

    const tgProtocol = `tg://resolve?domain=${BOT_HANDLE}&start=auth`;
    window.location.href = tgProtocol;

    setTimeout(() => {
      if (document.hasFocus()) {
        window.open(`https://t.me/${BOT_HANDLE}?start=auth`, '_blank');
      }
    }, 600);
  };

  return (
    <Button 
      onClick={handleTelegramAuth}
      className="w-full h-14 rounded-full bg-[#24A1DE] hover:bg-[#208aba] text-white flex items-center justify-center gap-3 font-bold border-none active:scale-95 transition-all shadow-lg shadow-blue-500/10"
    >
      <Send className="w-5 h-5" />
      Sign in with Telegram
    </Button>
  );
}
