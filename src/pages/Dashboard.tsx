import React from 'react';

export default function Dashboard({ user }: { user: any }) {
  const balance = user?.balance || 50;
  const referralLink = `https://t.me/OneAppEthioBot?start=ref_${user?.id || 'new'}`;

  const shareOnTelegram = () => {
    const text = encodeURIComponent("Join me on OneApp Ethiopia! 🇪🇹 Get 50 ETB instantly and help me unlock a free order! 🎁");
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900">
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black tracking-tight italic">OneApp</h1>
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Addis Live
          </div>
        </div>

        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-1">Social Credit</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black">{balance}</span>
            <span className="text-xl font-bold opacity-60">ETB</span>
          </div>
          <button className="mt-8 w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-sm active:scale-95 transition-all hover:shadow-lg">
            SHOP WITH CREDIT
          </button>
        </div>
      </div>

      <div className="px-6 mt-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-[2rem] p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-black text-orange-900 text-lg leading-tight uppercase">Unlock<br/>Free Order</h3>
            <span className="text-2xl">⚡</span>
          </div>
          
          <div className="w-full bg-white/50 h-3 rounded-full overflow-hidden border border-orange-200 mb-4">
            <div className="bg-orange-500 h-full w-[33%] rounded-full shadow-lg transition-all duration-1000"></div>
          </div>
          
          <button 
            onClick={shareOnTelegram}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md shadow-orange-200 active:scale-95 transition-transform"
          >
            Invite Friends on Telegram
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-12 py-6 flex justify-between items-center z-50">
        <div className="flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
          <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest">Home</span>
        </div>
        <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">Deals</span>
        <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest">Profile</span>
      </div>
    </div>
  );
}
