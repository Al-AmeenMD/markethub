import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { useCurrencyStore } from '@/store/currency';
import { Badge } from '@/components/ui/badge';
import { useProductStore } from '@/store/products';
import { ProductFormDialog } from '@/components/product-form-dialog';

// Mock data - replace with real API calls
const salesData = [
  { date: '2025-01-01', sales: 2500 },
  { date: '2025-01-02', sales: 1800 },
  { date: '2025-01-03', sales: 3500 },
  { date: '2025-01-04', sales: 2800 },
  { date: '2025-01-05', sales: 3200 },
  { date: '2025-01-06', sales: 2900 },
  { date: '2025-01-07', sales: 3100 },
];

const recentOrders = [
  {
    id: '1',
    date: '2024-01-17',
    customer: 'John Doe',
    status: 'Delivered',
    total: 125.99,
  },
  {
    id: '2',
    date: '2024-01-16',
    customer: 'Jane Smith',
    status: 'Processing',
    total: 89.99,
  },
  {
    id: '3',
    date: '2024-01-15',
    customer: 'Ibrahim Satomi',
    status: 'Shipped',
    total: 599.99,
  },
  {
    id: '4',
    date: '2024-01-15',
    customer: 'Saif Ahmad',
    status: 'Shipped',
    total: 399.99,
  },
  {
    id: '5',
    date: '2024-01-14',
    customer: 'Bob Johnson',
    status: 'Shipped',
    total: 199.99,
  }
];

export function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { formatPrice } = useCurrencyStore();
  const { getVendorProducts } = useProductStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const vendorProducts = getVendorProducts(user.id);
      setProducts(vendorProducts);
    }
  }, [user, getVendorProducts]);

  if (!user || user.role !== 'vendor') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You must be registered as a vendor to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/vendor/register')}>
              Register as Vendor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSales = products.reduce((sum, product) => sum + (product.sales * product.price), 0);
  const totalOrders = products.reduce((sum, product) => sum + product.sales, 0);
  const totalProducts = products.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(averageOrderValue)}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    width={80}
                    tickFormatter={(value) => formatPrice(value)}
                  />
                  <Tooltip
                    formatter={(value) => formatPrice(Number(value))}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--popover-foreground))'
                    }}
                    labelStyle={{
                      color: 'hsl(var(--popover-foreground))',
                      fontWeight: 500,
                      marginBottom: '0.25rem'
                    }}
                    itemStyle={{
                      color: 'hsl(var(--popover-foreground))'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="currentColor"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                View and manage your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your product inventory
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddProductOpen(true)}>Add Product</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{formatPrice(product.price)}</TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <ProductFormDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      />
    </div>
  );
}
