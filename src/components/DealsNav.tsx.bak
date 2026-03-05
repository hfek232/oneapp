import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  // Sync Carousel swipe to Tabs highlight
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
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b">
        <Tabs value={current} onValueChange={handleTabChange} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="inline-flex w-max justify-start rounded-none bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 text-base data-[state=active]:border-red-500 data-[state=active]:text-red-500 transition-all"
                >
                  {tab.label}
                </TabsTrigger>
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
