import ProductCard from "./product-card"

const items = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: "Wireless Headphones",
  price: "$59",
  image: "https://picsum.photos/400?random=" + i,
  sale: i % 3 === 0,
}))

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  )
}
