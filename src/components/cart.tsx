'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { CreditCard, ShoppingCart, Wallet } from "lucide-react";

const cartItems = [
    { name: 'Biryani Non Veg (Full)', price: 200, quantity: 1, imageId: 'biryani-non-veg' },
    { name: 'Momos Veg Fry (Half)', price: 60, quantity: 2, imageId: 'momos-veg-fry' },
];

export default function Cart() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 0; // Free delivery!
    const total = subtotal + deliveryFee;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Open Cart</span>
          <div className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {cartItems.length}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto pr-4">
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <Image 
                                src={`https://picsum.photos/seed/${item.imageId}/100/100`}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover"
                            />
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
        <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p>₹{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Delivery</p>
                        <p className="text-primary font-semibold">FREE</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>₹{total.toFixed(2)}</p>
                    </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-4">Payment Method</h4>
                   <RadioGroup defaultValue="cod" className="grid grid-cols-1 gap-4">
                    <Label htmlFor="card" className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5" />
                      <span>Card Payment</span>
                    </Label>
                    <Label htmlFor="wallet" className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Wallet className="h-5 w-5" />
                      <span>Digital Wallets</span>
                    </Label>
                    <Label htmlFor="cod" className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                      <RadioGroupItem value="cod" id="cod" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                      <span>Cash on Delivery</span>
                    </Label>
                  </RadioGroup>
                </div>
                <Button className="w-full text-lg" size="lg">Place Order</Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}