
'use client';

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from '@/context/cart-context';
import Link from "next/link";

export default function Cart() {
    const { cartItems } = useCart();
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">Open Cart</span>
        {totalQuantity > 0 && (
          <div className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {totalQuantity}
          </div>
        )}
      </Link>
    </Button>
  );
}
