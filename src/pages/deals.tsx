import { Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useCurrencyStore } from '@/store/currency';

const deals = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    originalPrice: 299.99,
    discountedPrice: 199.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    vendor: 'AudioTech Pro',
    rating: 4.8,
    endsIn: '2d 5h',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    originalPrice: 399.99,
    discountedPrice: 299.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    vendor: 'TechGear',
    rating: 4.9,
    endsIn: '1d 12h',
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    originalPrice: 29.99,
    discountedPrice: 19.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    vendor: 'EcoLife',
    rating: 4.7,
    endsIn: '3d 8h',
  },
];

export function DealsPage() {
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Tag className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Hot Deals</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <Card key={deal.id} className="relative overflow-hidden">
            <Badge 
              className="absolute right-4 top-4 z-10" 
              variant="destructive"
            >
              {deal.discount}% OFF
            </Badge>
            <CardHeader className="p-0">
              <img
                src={deal.image}
                alt={deal.name}
                className="aspect-square object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1 text-lg">
                {deal.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{deal.vendor}</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm line-through text-muted-foreground">
                    {formatPrice(deal.originalPrice)}
                  </p>
                  <p className="text-lg font-semibold text-primary">
                    {formatPrice(deal.discountedPrice)}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">{deal.rating}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Ends in: {deal.endsIn}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full"
                onClick={() => addItem({
                  id: deal.id,
                  name: deal.name,
                  price: deal.discountedPrice,
                  quantity: 1,
                  image: deal.image,
                })}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
