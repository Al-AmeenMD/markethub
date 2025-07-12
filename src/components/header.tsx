import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Store, Package, Star, Moon, Sun, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/providers/theme-provider';
import { useAuthStore } from '@/store/auth';
import { useSearchStore } from '@/store/search';
import { CurrencySelector } from '@/components/currency-selector';
import { CartSheet } from '@/components/cart-sheet';
import { SearchSuggestions } from '@/components/search-suggestions';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const { setTheme, theme } = useTheme();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { setSearchQuery } = useSearchStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setMobileSearchVisible(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>

          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">MarketHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 lg:flex lg:justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="grid gap-2">
                      <h3 className="font-semibold">Popular Categories</h3>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/categories/electronics">Electronics</Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/categories/fashion">Fashion</Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/categories/home">Home & Garden</Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/categories/sports">Sports</Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="h-auto px-4" asChild>
                  <Link to="/deals">Deals</Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="ghost" className="h-auto px-4" asChild>
                  <Link to="/vendors">Vendors</Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden items-center space-x-2 lg:flex"
          >
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products & vendors..."
                className="w-[300px]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <SearchSuggestions
                query={searchInput}
                onSelect={() => setSearchInput('')}
                className="w-[300px]"
              />
            </div>
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </form>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <CurrencySelector />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <CartSheet />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {user ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {user.role === 'vendor' && (
                    <DropdownMenuItem asChild>
                      <Link to="/vendor/dashboard">Vendor Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sign Out</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/auth/login">Sign In</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchVisible && (
        <div className="border-t p-4 lg:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search products & vendors..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
              />
              <SearchSuggestions
                query={searchInput}
                onSelect={() => {
                  setSearchInput('');
                  setMobileSearchVisible(false);
                }}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchVisible(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <Button type="submit" variant="default">
              Search
            </Button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
                <Package className="mr-2 h-4 w-4" />
                Categories
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/deals" onClick={() => setIsMobileMenuOpen(false)}>
                <Star className="mr-2 h-4 w-4" />
                Deals
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/vendors" onClick={() => setIsMobileMenuOpen(false)}>
                <Store className="mr-2 h-4 w-4" />
                Vendors
              </Link>
            </Button>
            {user?.role === 'vendor' && (
              <Button variant="ghost" className="justify-start" asChild>
                <Link to="/vendor/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Store className="mr-2 h-4 w-4" />
                  Vendor Dashboard
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
