import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCartStore } from '@/store/cart';
import { useCurrencyStore } from '@/store/currency';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    vendor: 'AudioTech Pro',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    vendor: 'TechGear',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    vendor: 'EcoLife',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Minimalist Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    vendor: 'UrbanStyle',
    rating: 4.6,
  },
];

const topVendors = [
  {
    id: '1',
    name: 'AudioTech Pro',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80',
    rating: 4.8,
    products: 128,
  },
  {
    id: '2',
    name: 'TechGear',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 4.9,
    products: 95,
  },
  {
    id: '3',
    name: 'EcoLife',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
    rating: 4.7,
    products: 76,
  },
];

export default function HomePage() {
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-8 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-12 text-white sm:mb-16 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Welcome to MarketHub
          </h1>
          <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg">
            Discover amazing products from trusted vendors around the world
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/vendors">Browse Vendors</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full bg-white/10 sm:w-auto"
            >
              <Link to="/deals">View Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-8 px-4 sm:mb-16">
        <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
          Featured Products
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  {product.rating}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </span>
                  <Link
                    to={`/vendors/${product.vendor.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {product.vendor}
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => addItem({ ...product, quantity: 1 })}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Vendors */}
      <section className="mb-8 px-4 sm:mb-16">
        <h2 className="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
          Top Vendors
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {topVendors.map((vendor) => (
            <Card key={vendor.id} className="flex flex-col">
              <CardContent className="flex-grow pt-6">
                <div className="mb-4 flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={vendor.image} alt={vendor.name} />
                    <AvatarFallback>
                      {vendor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{vendor.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      {vendor.rating} · {vendor.products} products
                    </div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/vendors/${vendor.id}`}>View Store</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-8 px-4 sm:mb-16">
        <Card className="bg-muted">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Start Selling on MarketHub
            </h2>
            <p className="text-muted-foreground">
              Join our community of successful vendors and reach customers worldwide
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/vendor/register">Become a Vendor</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
