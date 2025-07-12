import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Store, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store/search';
import { useCartStore } from '@/store/cart';
import { useCurrencyStore } from '@/store/currency';
import { Badge } from '@/components/ui/badge';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, search } = useSearchStore();
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  if (!query) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Search Products & Vendors</h1>
        <p className="text-muted-foreground">
          Enter a search term to find products and vendors
        </p>
      </div>
    );
  }

  const hasResults = results.products.length > 0 || results.vendors.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
        <p className="text-sm text-muted-foreground">
          {results.products.length} products, {results.vendors.length} vendors found
        </p>
      </div>

      {!hasResults && (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            Try searching with different keywords or browse our categories
          </p>
        </div>
      )}

      {results.vendors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Vendors</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.vendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    <Link
                      to={`/vendors/${vendor.id}`}
                      className="hover:underline"
                    >
                      {vendor.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {vendor.rating && (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="h-3 w-3" />
                        {vendor.rating.toFixed(1)}
                      </Badge>
                    )}
                    {vendor.products && (
                      <Badge variant="secondary" className="gap-1">
                        <Package className="h-3 w-3" />
                        {vendor.products} products
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link to={`/vendors/${vendor.id}`}>View Store</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {results.products.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.products.map((product) => (
              <Card key={product.id}>
                {product.image && (
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    <Link
                      to={`/products/${product.id}`}
                      className="hover:underline"
                    >
                      {product.name}
                    </Link>
                  </CardTitle>
                  <Link
                    to={`/vendors/${product.vendorId}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {product.vendor?.name || 'Unknown Vendor'}
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </p>
                  {product.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={() => addItem(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to={`/products/${product.id}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
