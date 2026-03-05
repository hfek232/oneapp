import React from 'react';

export default function NeonCollage() {
  const images = [
    "https://images.unsplash.com/photo-1543087126-ee64a74bd97a?w=300",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300"
  ];

  return (
    <div className="relative w-full h-64 flex justify-center items-center mb-12 overflow-visible">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF3B30]/20 via-transparent to-transparent blur-3xl rounded-full" />
      
      <div className="relative flex gap-4 rotate-[-4deg]">
        <div className="w-24 h-36 bg-zinc-900 rounded-[2rem] overflow-hidden mt-8 shadow-[0_0_20px_rgba(52,199,89,0.3)] border border-[#34C759]/20">
          <img src={images[0]} className="object-cover h-full w-full" alt="Neon1" />
        </div>
        <div className="w-32 h-44 bg-zinc-900 rounded-[2.5rem] overflow-hidden z-10 shadow-[0_0_30px_rgba(255,59,48,0.4)] border-2 border-[#FF3B30]/40">
          <img src={images[1]} className="object-cover h-full w-full" alt="Neon2" />
        </div>
        <div className="w-24 h-36 bg-zinc-900 rounded-[2rem] overflow-hidden mt-8 shadow-[0_0_20px_rgba(255,204,0,0.3)] border border-[#FFCC00]/20">
          <img src={images[2]} className="object-cover h-full w-full" alt="Neon3" />
        </div>
      </div>
    </div>
  );
}
