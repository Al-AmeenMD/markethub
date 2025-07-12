import { Link } from 'react-router-dom';
import { Store, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrencyStore } from '@/store/currency';

const vendors = [
  {
    id: '1',
    name: 'AudioTech Pro',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&q=80',
    rating: 4.8,
    products: 156,
    followers: '12.5k',
    description: 'Premium audio equipment and accessories.',
  },
  {
    id: '2',
    name: 'TechGear',
    image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=500&q=80',
    rating: 4.9,
    products: 243,
    followers: '28.3k',
    description: 'Latest tech gadgets and smart devices.',
  },
  {
    id: '3',
    name: 'LeatherCraft',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
    rating: 4.7,
    products: 89,
    followers: '8.9k',
    description: 'Handcrafted leather goods and accessories.',
  },
  {
    id: '4',
    name: 'SmartHome',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    rating: 4.6,
    products: 178,
    followers: '15.2k',
    description: 'Smart home devices and automation solutions.',
  },
];

export function VendorsPage() {
  const { formatPrice } = useCurrencyStore();

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <Store className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Featured Vendors</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader className="relative h-48 p-0">
              <img
                src={vendor.image}
                alt={vendor.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Avatar className="absolute -bottom-6 left-4 h-16 w-16 border-4 border-background">
                <AvatarImage src={vendor.image} />
                <AvatarFallback>{vendor.name[0]}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {vendor.description}
                </p>
              </div>
              <div className="mb-4 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold">{vendor.products}</p>
                  <p className="text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="font-semibold">{vendor.followers}</p>
                  <p className="text-muted-foreground">Followers</p>
                </div>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span>{vendor.rating}</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link to={`/vendors/${vendor.id}`}>Visit Store</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
