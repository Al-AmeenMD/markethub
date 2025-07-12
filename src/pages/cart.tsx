import { Minus, Plus, Trash2 } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { toast } = useToast()

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = '/auth/login'
      return
    }

    try {
      // TODO: Replace with actual payment processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      clearCart()
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      })
      
      window.location.href = '/orders'
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Start shopping to add items to your cart
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <a href="/">Continue Shopping</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-lg font-semibold">
              Total: ${getTotal().toFixed(2)}
            </div>
            <Button onClick={handleCheckout} className="w-[200px]">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
