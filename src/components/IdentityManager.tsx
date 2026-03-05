import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function IdentityManager() {
  const [identities, setIdentities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIdentities = async () => {
    // 1. Fetch all linked identities from Supabase
    const { data, error } = await supabase.auth.getUserIdentities();
    if (!error && data) {
      setIdentities(data.identities);
    }
    setLoading(false);
  };

  useEffect(() => { fetchIdentities(); }, []);

  const handleLink = async (provider: 'google' | 'telegram') => {
    // 2. Initiate Manual Linking flow
    await supabase.auth.linkIdentity({ provider });
  };

  const handleUnlink = async (identity: any) => {
    // 3. Unlink identity (Requires at least 2 identities to remain safe)
    if (identities.length < 2) {
      alert("Add another login method before unlinking this one.");
      return;
    }
    const { error } = await supabase.auth.unlinkIdentity(identity);
    if (!error) fetchIdentities();
  };

  if (loading) return <div className="animate-pulse text-[10px] font-black italic">SYNCING KEYS...</div>;

  return (
    <Card className="border-none shadow-xl rounded-[2rem] bg-white overflow-hidden max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-[1000] uppercase tracking-widest italic">
          Digital Keys <span className="text-[#EF3340]">!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {['google', 'telegram'].map((provider) => {
          const isLinked = identities.find(i => i.provider === provider);
          return (
            <div key={provider} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isLinked ? 'bg-[#009739]' : 'bg-slate-200'}`} />
                <span className="text-[10px] font-black uppercase tracking-tight italic">
                  {provider}
                </span>
                {isLinked && <Badge className="bg-[#FFD100] text-black text-[8px] h-4">ACTIVE</Badge>}
              </div>
              
              {isLinked ? (
                <button 
                  onClick={() => handleUnlink(isLinked)}
                  className="text-[8px] font-black text-slate-300 hover:text-[#EF3340] uppercase"
                >
                  Unlink
                </button>
              ) : (
                <button 
                  onClick={() => handleLink(provider as any)}
                  className="text-[8px] font-black text-[#EF3340] hover:scale-110 transition-transform uppercase"
                >
                  Connect +
                </button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
