import React from "react";
import { Home, Tv, ShoppingBag, MessageCircle, User } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ProfileView } from "./profile-view";

export function BottomBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-background border-t h-16 z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-full max-w-md mx-auto">
        <button className="flex flex-col items-center justify-center gap-1 text-primary border-none bg-transparent outline-none">
          <Home size={22} fill="currentColor" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors border-none bg-transparent outline-none">
              <Tv size={22} />
              <span className="text-[10px] font-medium">Streams</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[92vh] bg-background border-none rounded-t-[32px]">
            <div className="p-10 text-center text-muted-foreground">Streams Feed Content</div>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors border-none bg-transparent outline-none">
              <ShoppingBag size={22} />
              <span className="text-[10px] font-medium">Sale</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[92vh] bg-background border-none rounded-t-[32px]">
            <div className="p-10 text-center text-muted-foreground">Flash Sales Content</div>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors border-none bg-transparent outline-none">
              <MessageCircle size={22} />
              <span className="text-[10px] font-medium">Chat</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[92vh] bg-background border-none rounded-t-[32px]">
            <div className="p-10 text-center text-muted-foreground">Messages Content</div>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors border-none bg-transparent outline-none">
              <User size={22} />
              <span className="text-[10px] font-medium">You</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[92vh] bg-muted/30 border-none rounded-t-[32px] overflow-hidden">
            <DrawerHeader className="sr-only"><DrawerTitle>Profile</DrawerTitle></DrawerHeader>
            <ProfileView />
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
