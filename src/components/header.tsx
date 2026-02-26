import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Flame, Camera, Search } from "lucide-react"

const categories = [
  { name: "Recommended", live: true },
  { name: "Apparel" },
  { name: "Electronics", sale: true },
  { name: "Home" },
  { name: "Beauty" },
  { name: "Sports" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      {/* SEARCH BAR */}
      <div className="px-4 py-3">
        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="w-full">
            <NavigationMenuItem className="w-full">
              <div className="relative w-full">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                <Input
                  placeholder="Search products..."
                  className="pl-9 pr-16 h-11 rounded-full bg-muted/60"
                />

                <Flame className="absolute right-10 top-1/2 -translate-y-1/2 size-4 text-orange-500" />
                <Camera className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground cursor-pointer hover:text-foreground transition" />

              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* CATEGORY RAIL */}
      <div className="border-t">
        <Tabs defaultValue="Recommended">
          <TabsList className="w-full overflow-x-auto justify-start px-2 gap-2 bg-transparent">

            {categories.map((cat) => (
              <TabsTrigger
                key={cat.name}
                value={cat.name}
                className="shrink-0 rounded-full px-4"
              >
                {cat.name}

                {cat.live && (
                  <Badge className="ml-2 px-1.5 py-0 text-[10px]" variant="destructive">
                    LIVE
                  </Badge>
                )}

                {cat.sale && (
                  <Badge className="ml-2 px-1.5 py-0 text-[10px]" variant="secondary">
                    SALE
                  </Badge>
                )}

              </TabsTrigger>
            ))}

          </TabsList>
        </Tabs>
      </div>

    </header>
  )
}
