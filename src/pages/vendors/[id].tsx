import { useParams } from 'react-router-dom';
import { Store, Star, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCartStore } from '@/store/cart';
import { useCurrencyStore } from '@/store/currency';

const vendorData = {
  '1': {
    id: '1',
    name: 'AudioTech Pro',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&q=80',
    rating: 4.8,
    products: 156,
    followers: '12.5k',
    description: 'Premium audio equipment and accessories.',
    location: 'Lagos State',
    email: 'contact@audiotech.pro',
    phone: '+234 803 123 4567',
    items: [
      {
        id: '101',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        rating: 4.8,
      },
      {
        id: '102',
        name: 'Professional Studio Microphone',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80',
        rating: 4.9,
      },
    ],
  },
  '2': {
    id: '2',
    name: 'TechGear',
    image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=500&q=80',
    rating: 4.9,
    products: 243,
    followers: '28.3k',
    description: 'Latest tech gadgets and smart devices.',
    location: 'Abuja FCT',
    email: 'support@techgear.com',
    phone: '+234 805 234 5678',
    items: [
      {
        id: '201',
        name: 'Smart Watch Series X',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        rating: 4.9,
      },
      {
        id: '202',
        name: 'Wireless Earbuds Pro',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
        rating: 4.8,
      },
    ],
  },
  '3': {
    id: '3',
    name: 'LeatherCraft',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
    rating: 4.7,
    products: 89,
    followers: '8.9k',
    description: 'Handcrafted leather goods and accessories.',
    location: 'Rivers State',
    email: 'hello@leathercraft.com',
    phone: '+234 814 345 6789',
    items: [
      {
        id: '301',
        name: 'Classic Leather Wallet',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
        rating: 4.7,
      },
      {
        id: '302',
        name: 'Leather Messenger Bag',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
        rating: 4.8,
      },
    ],
  },
  '4': {
    id: '4',
    name: 'SmartHome',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    rating: 4.6,
    products: 178,
    followers: '15.2k',
    description: 'Smart home devices and automation solutions.',
    location: 'Oyo State',
    email: 'support@smarthome.tech',
    phone: '+234 809 456 7890',
    items: [
      {
        id: '401',
        name: 'Smart LED Bulb Pack',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=500&q=80',
        rating: 4.6,
      },
      {
        id: '402',
        name: 'Smart Security Camera',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80',
        rating: 4.7,
      },
    ],
  },
};

export function VendorPage() {
  const { id } = useParams();
  const vendor = vendorData[id as string];
  const { formatPrice } = useCurrencyStore();
  const { addItem } = useCartStore();

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <div>
      {/* Vendor Header */}
      <div className="mb-8">
        <div className="relative h-64 overflow-hidden rounded-lg">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src={vendor.image} />
              <AvatarFallback>{vendor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{vendor.name}</h1>
              <p className="text-white/80">{vendor.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Stats & Contact */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.products} Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.location}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.phone}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {vendor.items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-0">
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1 text-lg">
                {item.name}
              </CardTitle>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-semibold">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">{item.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full"
                onClick={() => addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                  image: item.image,
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
