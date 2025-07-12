import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart';

// Mock data - replace with API call
const categoryProducts = {
  electronics: [
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
  ],
  fashion: [
    {
      id: '3',
      name: 'Classic Leather Wallet',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
      vendor: 'LeatherCraft',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Designer Sunglasses',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      vendor: 'VisionStyle',
      rating: 4.6,
    },
  ],
  home: [
    {
      id: '5',
      name: 'Smart LED Lamp',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=500&q=80',
      vendor: 'SmartHome',
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Ceramic Vase Set',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80',
      vendor: 'ArtDecor',
      rating: 4.8,
    },
  ],
  sports: [
    {
      id: '7',
      name: 'Yoga Mat Premium',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500&q=80',
      vendor: 'FitLife',
      rating: 4.7,
    },
    {
      id: '8',
      name: 'Smart Fitness Tracker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&q=80',
      vendor: 'TechFit',
      rating: 4.9,
    },
  ],
};

export function CategoryPage() {
  const { category } = useParams();
  const { addItem } = useCartStore();
  
  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{categoryName}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1 text-lg">
                {product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{product.vendor}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-semibold">${product.price}</p>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full"
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.image,
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
