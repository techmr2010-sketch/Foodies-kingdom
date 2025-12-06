
'use client';

import { UserProvider } from '@/context/user-context';
import { CartProvider } from '@/context/cart-context';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from '@/components/bottom-nav';
import HelplineFab from '@/components/helpline-fab';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>
        {children}
        <Toaster />
        <BottomNav />
        <HelplineFab />
      </CartProvider>
    </UserProvider>
  );
}
