import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Store, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProductStore } from '@/store/products';
import { useCurrencyStore } from '@/store/currency';

interface SearchSuggestionsProps {
  query: string;
  onSelect: () => void;
  className?: string;
}

export function SearchSuggestions({
  query,
  onSelect,
  className,
}: SearchSuggestionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { products } = useProductStore();
  const { formatPrice } = useCurrencyStore();

  // Filter products based on query
  const filteredProducts = query
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase()) ||
            product.category?.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Group products by vendor
  const vendorMap = new Map<string, { name: string; count: number }>();
  filteredProducts.forEach((product) => {
    if (!vendorMap.has(product.vendorId)) {
      vendorMap.set(product.vendorId, { name: product.vendor?.name || 'Unknown Vendor', count: 0 });
    }
    vendorMap.get(product.vendorId)!.count++;
  });

  const vendorSuggestions = Array.from(vendorMap.entries())
    .map(([id, { name, count }]) => ({ id, name, count }))
    .slice(0, 3);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onSelect();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSelect]);

  if (!query || (!filteredProducts.length && !vendorSuggestions.length)) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute left-0 top-full z-50 mt-2 w-full rounded-md border bg-background p-2 shadow-lg',
        className
      )}
    >
      <div className="space-y-4">
        {/* Product suggestions */}
        {filteredProducts.length > 0 && (
          <div>
            <h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
              Products
            </h3>
            <div className="space-y-1">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-accent"
                  onClick={onSelect}
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{product.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Vendor suggestions */}
        {vendorSuggestions.length > 0 && (
          <div>
            <h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
              Vendors
            </h3>
            <div className="space-y-1">
              {vendorSuggestions.map((vendor) => (
                <Link
                  key={vendor.id}
                  to={`/vendors/${vendor.id}`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-accent"
                  onClick={onSelect}
                >
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{vendor.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {vendor.count} products
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* View all results */}
        <Link
          to={`/search?q=${encodeURIComponent(query)}`}
          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent"
          onClick={onSelect}
        >
          View all results for "{query}"
        </Link>
      </div>
    </div>
  );
}
