import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCurrencyStore } from '@/store/currency';

const orders = [
  {
    id: '1',
    date: '2024-01-15',
    total: 299.99,
    status: 'Delivered',
    items: [
      {
        id: '101',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      },
    ],
    tracking: 'USP123456789',
    deliveryDate: '2024-01-18',
  },
  {
    id: '2',
    date: '2024-01-10',
    total: 199.99,
    status: 'Processing',
    items: [
      {
        id: '102',
        name: 'Smart Watch Series X',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      },
    ],
    tracking: 'USP987654321',
    deliveryDate: '2024-01-20',
  },
];

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'processing':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'shipped':
      return <Truck className="h-4 w-4 text-blue-500" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-500/10 text-green-500';
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'shipped':
      return 'bg-blue-500/10 text-blue-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
}

export function OrdersPage() {
  const { formatPrice } = useCurrencyStore();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                Order #{order.id}
              </CardTitle>
              <Badge className={getStatusColor(order.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Details */}
                <div className="flex justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Order Date</p>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-medium">{formatPrice(order.total)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Delivery Date</p>
                    <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tracking Number</p>
                    <p>{order.tracking}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
