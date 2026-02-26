import { Drawer, DrawerContent } from "@/components/ui/drawer"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export default function FilterDrawer({ open, onOpenChange, inline }: any) {
  const content = (
    <div className="space-y-4">
      <Accordion type="multiple">

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <label><input type="checkbox" /> Under $25</label>
              <label><input type="checkbox" /> $25-50</label>
              <label><input type="checkbox" /> $50+</label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <label><input type="checkbox" /> Apple</label>
              <label><input type="checkbox" /> Sony</label>
              <label><input type="checkbox" /> Samsung</label>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )

  if (inline) return content

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4">{content}</DrawerContent>
    </Drawer>
  )
}
