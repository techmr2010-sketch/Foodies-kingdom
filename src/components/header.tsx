import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from '@/components/cart';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
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
             <Button variant="link" asChild>
              <Link href="#">Track Order</Link>
            </Button>
          </nav>
          <Cart />
        </div>
      </div>
    </header>
  );
}
