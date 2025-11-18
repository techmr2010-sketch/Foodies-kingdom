
'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { ShoppingCart, Phone, IndianRupee, Trash2, Send, Home } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from './ui/textarea';
import { Icons } from './icons';

export default function Cart({ children }: { children?: React.ReactNode }) {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { toast } = useToast();
    const [customerName, setCustomerName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [addressSubmitted, setAddressSubmitted] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('phone');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 0; // Free delivery!
    const total = subtotal + deliveryFee;
    const upiLink = `upi://pay?pa=9310364770@paytm&pn=Foodie%20Kingdom&am=${total.toFixed(2)}&cu=INR`;
    
    const handleAddressSubmit = () => {
        if (!deliveryAddress) {
            toast({
                variant: "destructive",
                title: "Address Missing",
                description: "Please enter your delivery address.",
            });
            return;
        }
        
        const message = `Delivery Address: ${deliveryAddress}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/918178480946?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setAddressSubmitted(true);
        toast({
            title: "Address Submitted",
            description: "Your delivery address has been sent to the delivery partner.",
        });
    }

    const handlePlaceOrder = () => {
        if (paymentMethod === 'cod' && (!customerName || !deliveryAddress)) {
             toast({
                variant: "destructive",
                title: "Information Missing",
                description: "Please enter your name and address for Cash on Delivery.",
            });
            return;
        }

        if (paymentMethod !== 'cod' && !addressSubmitted) {
             toast({
                variant: "destructive",
                title: "Address Not Submitted",
                description: "Please submit your delivery address first.",
            });
            return;
        }


        const orderDetails = cartItems.map(item => `${item.quantity} x ${item.name} (${item.option})`).join('\n');
        let message;

        if (paymentMethod === 'cod') {
             message = `New COD Order from Foodie Kingdom:\n\nCustomer Name: ${customerName}\nAddress: ${deliveryAddress}\n\nItems:\n${orderDetails}\n\nTotal: ₹${total.toFixed(2)}\n\nPayment Method: Cash on Delivery`;
        } else {
             message = `New Order from Foodie Kingdom:\n\nItems:\n${orderDetails}\n\nTotal: ₹${total.toFixed(2)}\n\nDelivery Address: ${deliveryAddress}\n\nPayment Method: Prepaid (UPI)`;
        }
       
        const encodedMessage = encodeURIComponent(message);
        const ownerWhatsappUrl = `https://wa.me/919310364770?text=${encodedMessage}`;

        if (paymentMethod === 'phone') {
            window.location.href = upiLink;
        }
        
        window.open(ownerWhatsappUrl, '_blank');
        
        toast({
            title: "Order Placed!",
            description: "Your order details have been sent. The delivery partner will coordinate with you.",
        });
        clearCart();
        setAddressSubmitted(false);
        setDeliveryAddress('');
        setCustomerName('');
    };
    
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Open Cart</span>
          {totalQuantity > 0 && (
            <div className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {totalQuantity}
            </div>
          )}
        </Button>
      </SheetTrigger>
      {children}
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto pr-4 -mr-4">
            {cartItems.length > 0 ? (
                <div className="space-y-4">
                    {cartItems.map((item) => {
                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                        return (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {image && <Image 
                                        src={image.imageUrl}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover"
                                    />}
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.option}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className="font-medium flex items-center"><IndianRupee className="h-4 w-4 mr-1" />{item.price * item.quantity}</p>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
                    <p className="text-muted-foreground">Add some items from the menu to get started.</p>
                </div>
            )}
        </div>
        {cartItems.length > 0 && (
            <SheetFooter className="mt-auto">
                <div className="w-full space-y-4">
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="flex items-center"><IndianRupee className="h-4 w-4 mr-1" />{subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Delivery</p>
                            <p className="text-primary font-semibold">FREE</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p className="flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{total.toFixed(2)}</p>
                        </div>
                    </div>
                    <Separator />
                    
                    <div>
                        <h4 className="font-medium mb-4">Payment Method</h4>
                         <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-4">
                            <Label htmlFor="phone" className="flex flex-col gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-accent has-[input:checked]:text-accent-foreground">
                                <div className="flex items-center gap-4">
                                    <RadioGroupItem value="phone" id="phone" />
                                    <Phone className="h-5 w-5" />
                                    <span>Pay by Phone (UPI)</span>
                                </div>
                                <div className="flex items-center justify-center gap-4 pl-8">
                                    <Icons.paytm className="h-6" />
                                    <Icons.gpay className="h-6" />
                                    <Icons.phonepe className="h-6" />
                                </div>
                            </Label>
                            <Label htmlFor="cod" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-accent has-[input:checked]:text-accent-foreground">
                                <RadioGroupItem value="cod" id="cod" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                                <span>Cash on Delivery</span>
                            </Label>
                        </RadioGroup>
                    </div>

                    {paymentMethod === 'cod' ? (
                        <div className="space-y-4">
                             <div>
                                <h4 className="font-medium mb-2">Your Name</h4>
                                <Input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Delivery Address</h4>
                                <Input
                                    type="text"
                                    placeholder="Enter your full address"
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            <div>
                                <h4 className="font-medium mb-2">Delivery Location</h4>
                                <div className="flex gap-2">
                                    <Input 
                                        type="text" 
                                        placeholder="Enter your full address" 
                                        className="flex-grow" 
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        required
                                        disabled={addressSubmitted}
                                    />
                                    <Button onClick={handleAddressSubmit} disabled={addressSubmitted}>
                                        {addressSubmitted ? 'Submitted' : 'Submit'}
                                    </Button>
                                </div>
                            </div>
                             <Alert>
                                <Phone className="h-4 w-4" />
                                <AlertTitle>Delivery Contact</AlertTitle>
                                <AlertDescription>
                                    To coordinate your delivery, please call Mohit at <strong>8178480946</strong>.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                    <Button 
                        className="w-full text-lg" 
                        size="lg" 
                        onClick={handlePlaceOrder} 
                        disabled={(paymentMethod === 'phone' && !addressSubmitted) && cartItems.length > 0}
                    >
                        <Send className="mr-2 h-4 w-4" />
                        {paymentMethod === 'cod' ? 'Place COD Order' : 'Proceed to Pay'}
                    </Button>
                </div>
            </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

    
