import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/home';
import { DealsPage } from './pages/deals';
import { VendorsPage } from './pages/vendors';
import { VendorPage } from './pages/vendors/[id]';
import { LoginPage } from './pages/auth/login';
import { RegisterPage } from './pages/auth/register';
import { SearchPage } from './pages/search';
import { ProfilePage } from './pages/profile';
import { OrdersPage } from './pages/orders';
import { SettingsPage } from './pages/settings';
import { VendorDashboardPage } from './pages/vendor/dashboard';
import { VendorRegistrationPage } from './pages/vendor/register';
import { CheckoutPage } from './pages/checkout';
import { ProtectedRoute } from './components/protected-route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'auth/login',
        element: <LoginPage />,
      },
      {
        path: 'auth/register',
        element: <RegisterPage />,
      },
      {
        path: 'deals',
        element: <DealsPage />,
      },
      {
        path: 'vendors',
        element: <VendorsPage />,
      },
      {
        path: 'vendors/:id',
        element: <VendorPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'vendor/register',
        element: (
          <ProtectedRoute>
            <VendorRegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'vendor/dashboard',
        element: (
          <ProtectedRoute requiredRole="vendor">
            <VendorDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
