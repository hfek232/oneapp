import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function QuickView({ children, title, price, image }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md">
        <img src={image} className="rounded-lg mb-4" />
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-muted-foreground mb-4">{price}</p>
        <button className="w-full bg-primary text-primary-foreground py-2 rounded-md">
          Add to Cart
        </button>
      </DialogContent>
    </Dialog>
  )
}
