
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, ShoppingCart, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account', label: 'Account', icon: User },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/help', label: 'Help', icon: MessageSquareQuote },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden">
      <div className="flex justify-around h-16 items-center">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={href}>
              <div
                className={cn(
                  'flex flex-col items-center gap-1 text-muted-foreground w-20 relative',
                  isClient && isActive && 'text-primary',
                  isClient && !isActive && 'text-purple-400',
                  isClient && isActive && 'text-purple-700'
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{label}</span>
                {href === '/cart' && totalQuantity > 0 && (
                  <div className="absolute -top-1 right-4 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {totalQuantity}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
