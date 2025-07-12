import { User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth';

export function ProfilePage() {
  const { user } = useAuthStore();

  // Mock user data - replace with actual user data from API
  const userData = {
    name: 'Al-Ameen Muhammad',
    email: user?.email || 'alamin@example.com',
    phone: '+234 801 234 5678',
    address: '123 Market Street, FCT, Abuja 94105',
    paymentMethods: [
      {
        id: '1',
        type: 'Visa',
        last4: '4242',
        expiry: '12/246',
      },
    ],
    orders: [
      {
        id: '1',
        date: '2024-01-15',
        total: 299.99,
        status: 'Delivered',
      },
      {
        id: '2',
        date: '2024-01-10',
        total: 199.99,
        status: 'Processing',
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{user?.role}</p>
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{userData.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{userData.address}</span>
          </div>
          <Button>Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {userData.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>
                  {method.type} ending in {method.last4}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Expires {method.expiry}
              </span>
            </div>
          ))}
          <Button variant="outline">Add Payment Method</Button>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
