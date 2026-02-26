import { Home, LayoutGrid, ShoppingCart, Package, User } from "lucide-react"

const items = [
  { icon: Home, label: "Home" },
  { icon: LayoutGrid, label: "Categories" },
  { icon: ShoppingCart, label: "Cart" },
  { icon: Package, label: "Orders" },
  { icon: User, label: "Profile" },
]

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="grid grid-cols-5 py-2">

        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Icon className="size-5 mb-1" />
            {label}
          </button>
        ))}

      </div>
    </nav>
  )
}
