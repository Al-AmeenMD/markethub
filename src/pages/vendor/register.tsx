import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function VendorRegistrationPage() {
  const [error, setError] = useState('');
  const { user, updateUserRole } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      // In a real app, you would make an API call here
      const vendorData = {
        businessName: formData.get('businessName') as string,
        description: formData.get('description') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        taxId: formData.get('taxId') as string,
      };

      // Update user role to vendor
      await updateUserRole('vendor');
      
      // Navigate to vendor dashboard
      navigate('/vendor/dashboard');
    } catch (error) {
      setError('Failed to register as vendor');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to register as a vendor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth/login')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Register as a Vendor</CardTitle>
          <CardDescription>
            Fill in your business details to start selling on MarketHub
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your business"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Business Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter business phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter business address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / Business Registration Number</Label>
              <Input
                id="taxId"
                name="taxId"
                placeholder="Enter your tax ID"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Register as Vendor
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already a vendor?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/vendor/dashboard')}>
              Go to Dashboard
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
