import ProductGrid from "./product-grid"

export default function OneMarket() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="px-4 pt-2">
        <h2 className="text-xl font-bold tracking-tight">አንድ ገበያ</h2>
        <p className="text-sm text-muted-foreground">የተመረጡ ምርቶች ለእናንተ</p>
      </div>
      <div className="pb-10">
        <ProductGrid />
      </div>
    </div>
  )
}
