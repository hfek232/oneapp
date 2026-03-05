'use client'

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import SocialFeed from "./social-feed"
import OneMarket from "./one-market"
import OneLocal from "./one-local"

export default function DealsNav() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState("deals")

  const tabs = [
    { id: "deals", label: "አንድ ላይ" },
    { id: "market", label: "አንድ ገበያ" },
    { id: "local", label: "አንድ ሰፈር" }
  ]

  React.useEffect(() => {
    if (!api) return
    api.on("select", () => {
      const index = api.selectedScrollSnap()
      if (tabs[index]) setCurrent(tabs[index].id)
    })
  }, [api, tabs])

  const handleTabChange = (val: string) => {
    const index = tabs.findIndex(t => t.id === val)
    if (index !== -1) {
      setCurrent(val)
      api?.scrollTo(index)
    }
  }

  return (
    <div className="w-full">
      <div className="sticky top-14 z-30 bg-white border-b border-gray-200">
        <Tabs value={current} onValueChange={handleTabChange} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="flex justify-between items-center w-full max-w-[380px] mx-auto px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 gap-2">
              {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                  <TabsTrigger
                    value={tab.id}
                    className="flex-1 py-2 px-3 text-sm font-semibold rounded-full transition-all duration-300 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 data-[state=active]:ring-1 data-[state=active]:ring-pink-300/60 hover:scale-105 active:scale-95 relative overflow-hidden"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent opacity-0 data-[state=active]:opacity-100 data-[state=active]:animate-shine pointer-events-none" />
                    {tab.label}
                  </TabsTrigger>

                  {index < tabs.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="h-5 w-[1.5px] mx-1 bg-gray-900/80"
                    />
                  )}
                </React.Fragment>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </Tabs>
      </div>

      <Carousel setApi={setApi} className="w-full" opts={{ loop: false, align: "start" }}>
        <CarouselContent className="ml-0">
          <CarouselItem className="pl-0">
            <SocialFeed />
          </CarouselItem>
          <CarouselItem className="pl-0">
            <OneMarket />
          </CarouselItem>
          <CarouselItem className="pl-0">
            <OneLocal />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
