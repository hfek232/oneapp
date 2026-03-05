import React from "react";
import { Package, ShoppingBag, Star, MapPin, CheckCircle2 } from "lucide-react";

export function ProfileView() {
  return (
    <div className="w-full bg-muted/30">
      {/* Top Section */}
      <div className="bg-background pb-8 rounded-b-3xl shadow-sm border-b">
        <div className="pt-6 pb-6 px-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold border-4 border-background shadow-lg">
            F
          </div>
          <h2 className="mt-4 text-xl font-bold text-foreground">Finkisa Glomsa</h2>
          <div className="flex items-center gap-1.5 mt-1 text-primary text-xs font-semibold">
            <CheckCircle2 size={14} fill="currentColor" className="text-background" /> 
            Verified Member
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="px-5 py-8">
        <div className="grid grid-cols-4 gap-3 bg-card rounded-2xl p-5 border shadow-sm">
          {[
            { icon: Package, label: "Shipping", color: "text-blue-500" },
            { icon: ShoppingBag, label: "Orders", color: "text-orange-500" },
            { icon: Star, label: "Reviews", color: "text-yellow-500" },
            { icon: MapPin, label: "Address", color: "text-green-500" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="p-3 bg-muted rounded-xl">
                <item.icon size={22} className={item.color} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
