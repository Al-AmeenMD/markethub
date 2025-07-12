import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useCurrencyStore } from '@/store/currency';
import { Badge } from './ui/badge';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';

export function CartSheet() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsOpen(false);
    if (!user) {
      navigate('/auth/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <Badge variant="secondary" className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0">
              {items.length}
            </Badge>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <SheetClose asChild>
              <Button variant="outline" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4 pr-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const newQuantity = Math.max(0, item.quantity - 1);
                            if (newQuantity === 0) {
                              removeItem(item.id);
                            } else {
                              updateQuantity(item.id, newQuantity);
                            }
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4">
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">{formatPrice(total)}</span>
              </div>
              <Button className="mt-4 w-full" onClick={handleCheckout}>
                {user ? 'Proceed to Checkout' : 'Sign in to Checkout'}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
