import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function TelegramHeader({ user }: { user: any }) {
  if (!user) return null;
  return (
    <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#0088cc] p-1.5 rounded-lg">
            <ShoppingBag className="text-white size-5" />
          </div>
          <span className="font-black tracking-tighter text-xl italic text-[#0088cc]">ONEAPP</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <div className="size-6 bg-[#0088cc] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            {user.first_name?.[0]}
          </div>
          <span className="text-xs font-bold uppercase tracking-tight">{user.first_name}</span>
          <CheckCircle2 className="size-3 text-[#009739]" />
        </div>
      </div>
    </nav>
  );
}
