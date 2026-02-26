import { Card, CardContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SocialFeed() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* 1. TikTok-Style Stories Section */}
      <div className="space-y-2">
        <h3 className="px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Stories</h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 px-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="h-20 w-20 rounded-full border-2 border-red-500 p-1">
                  <div className="h-full w-full rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/100/100?random=${i}`} alt="story" className="object-cover" />
                  </div>
                </div>
                <span className="text-xs font-medium">Live {i}</span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* 2. Interactive Poll Card */}
      <div className="px-4">
        <div className="rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 p-4 text-white">
          <h4 className="font-bold">Community Poll: Is this a Steal? 🔥</h4>
          <p className="text-sm opacity-90 mb-3">iPhone 15 Pro for 25,000 ETB</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-lg bg-white/20 py-2 text-sm font-semibold hover:bg-white/30">Yes! 🚀</button>
            <button className="rounded-lg bg-white/20 py-2 text-sm font-semibold hover:bg-white/30">Too Much 💸</button>
          </div>
        </div>
      </div>

      {/* 3. Social "Hot Deal" Feed */}
      <div className="grid grid-cols-1 gap-4 px-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 p-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">Abebe shared a group buy</p>
                <p className="text-[10px] text-muted-foreground">2 mins ago • Addis Ababa</p>
              </div>
            </div>
            <div className="aspect-video bg-slate-100 relative">
               <img src={`https://picsum.photos/400/225?random=${i}`} className="object-cover w-full h-full" />
               <Badge className="absolute top-2 right-2 bg-red-600">80% OFF</Badge>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Wireless Headphones</p>
                <p className="text-lg font-bold text-red-600">450 ETB <span className="text-xs text-muted-foreground line-through ml-2">1,200 ETB</span></p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
