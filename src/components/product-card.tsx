import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import QuickView from "./quick-view"

export default function ProductCard({ title, price, image, sale }: any) {
  return (
    <QuickView title={title} price={price} image={image}>
      <Card className="overflow-hidden cursor-pointer hover:shadow-md transition">
        <AspectRatio ratio={1}>
          <img src={image} className="object-cover w-full h-full" />
        </AspectRatio>

        <div className="p-3 space-y-1">
          <p className="text-sm line-clamp-2">{title}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold">{price}</p>
            {sale && <Badge>SALE</Badge>}
          </div>
        </div>
      </Card>
    </QuickView>
  )
}
