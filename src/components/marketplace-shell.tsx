import { useState } from "react"
import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import FilterDrawer from "@/components/filter-drawer"
import BottomBar from "@/components/bottom-bar"
import DealsNav from "@/components/DealsNav"

export default function MarketplaceShell() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DealsNav />
      <div className="flex">
        <main className="flex-1 pb-24">
          <ProductGrid />
        </main>
      </div>
      <FilterDrawer open={filtersOpen} onOpenChange={setFiltersOpen} />
      <BottomBar />
    </div>
  )
}
