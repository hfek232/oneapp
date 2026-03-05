import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="p-8 max-w-2xl mx-auto text-white bg-black min-h-screen font-sans selection:bg-pink-500/30">
    {children}
    <button 
      onClick={() => window.location.href = '/'}
      className="mt-12 px-6 py-2 border border-zinc-800 rounded-full text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
    >
      Back to OneApp
    </button>
  </div>
);

export const PrivacyPolicy = () => (
  <Container>
    <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent italic">Privacy Policy</h1>
    <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
      <p>OneApp collects your name and email via social providers (Facebook, Google, Telegram) to create your marketplace profile.</p>
      <p>Data is stored securely in Supabase and is never sold to third parties.</p>
    </div>
  </Container>
);

export const DataDeletion = () => (
  <Container>
    <h1 className="text-4xl font-black mb-6 text-red-500 italic">Data Deletion</h1>
    <div className="space-y-4 text-zinc-400 text-sm leading-relaxed border-l-2 border-red-900 pl-4">
      <p className="text-white font-bold text-lg">How to delete your OneApp data:</p>
      <p>1. Log into your Facebook Account.</p>
      <p>2. Go to <span className="text-white">Settings & Privacy &gt; Settings &gt; Apps and Websites</span>.</p>
      <p>3. Find <span className="text-white font-bold italic">OneApp</span> and click "Remove".</p>
      <p>4. Alternatively, email <span className="text-pink-500 underline">hiruyfekre@gmail.com</span> with the subject "Data Deletion Request" to have your Supabase account wiped manually.</p>
    </div>
  </Container>
);

export const Terms = () => (
  <Container>
    <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent italic">Terms of Service</h1>
    <p className="text-zinc-400 text-sm leading-relaxed">By using OneApp, you agree to fair social buying and group-buy rules. Fraudulent activity will result in a ban.</p>
  </Container>
);
