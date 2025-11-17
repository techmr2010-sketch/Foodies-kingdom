import Link from 'next/link';
import { ChefHat, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from '@/components/cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTrigger } from './ui/sheet';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">
            Foodie Kingdom
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex gap-4">
            <Button variant="link" asChild>
              <Link href="#menu">Menu</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#recommendations">For You</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#partners">Partners</Link>
            </Button>
          </nav>
          <Cart>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <SheetTrigger asChild>
                  <DropdownMenuItem>
                    Cart
                  </DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem asChild>
                  <Link href="/account">Order History</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/account">Payment</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">Help Centre</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Cart>
        </div>
      </div>
    </header>
  );
}
