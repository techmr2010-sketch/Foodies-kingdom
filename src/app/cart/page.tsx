
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { ShoppingCart, Phone, IndianRupee, Trash2, Send, ChevronLeft, MapPin, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import { useUser } from '@/context/user-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart, getCartItemDetails } = useCart();
    const { user } = useUser();
    const { toast } = useToast();
    const [customerName, setCustomerName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('phone');

    useEffect(() => {
        if (user) {
            setCustomerName(user.name);
        }
    }, [user]);

    const {subtotal, deliveryFee, total} = getCartItemDetails(user?.orderCount ?? 0);
    
    const handlePlaceOrder = () => {
        if (!user) {
            toast({
                variant: "destructive",
                title: "Not Signed In",
                description: "Please sign in or sign up to place an order.",
            });
            return;
        }
        if (cartItems.length === 0) {
             toast({
                variant: "destructive",
                title: "Cart is Empty",
                description: "Please add items to your cart before placing an order.",
            });
            return;
        }

        const orderDetails = cartItems.map(item => `${item.quantity} x ${item.name} (${item.option})`).join('\n');
        let message;
        
        const upiLink = `upi://pay?pa=9310364770@paytm&pn=Foodie%20Kingdom&am=${total.toFixed(2)}&cu=INR`;
        
        let locationString = "Customer did not provide location.";
        if (user.location) {
            locationString = `https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`;
        }
        
        message = `New Order from Foodie Kingdom:\n\nOrdering as: ${user.name}\nOrder Details:\n${orderDetails}\n\nSubtotal: ₹${subtotal.toFixed(2)}\nDelivery Fee: ₹${deliveryFee.toFixed(2)}\nTotal: ₹${total.toFixed(2)}\nContact: ${user.phone}\nLocation: ${locationString}\nPayment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid (UPI)'}`;
        
        const encodedMessage = encodeURIComponent(message);
        const ownerWhatsappUrl = `https://wa.me/919310364770?text=${encodedMessage}`;
       
        window.open(ownerWhatsappUrl, '_blank');
                
        if (paymentMethod === 'phone') {
            toast({
                title: "Redirecting to UPI",
                description: "Opening payment app and sending order to seller.",
            });
            window.location.href = upiLink;
        } else {
            toast({
                title: "Order Placed!",
                description: "Your COD order details have been sent via WhatsApp.",
            });
        }
        
        clearCart();
    };

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
             <div className="flex items-center mb-8">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/">
                        <ChevronLeft />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline ml-4">Your Shopping Cart</h1>
            </div>

            {cartItems.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <Card>
                             <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Review the items in your cart.</CardDescription>
                            </CardHeader>
                            <CardContent className="divide-y">
                                {cartItems.map((item) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.imageId);
                                    return (
                                        <div key={item.id} className="flex items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                {image && <Image 
                                                    src={image.imageUrl}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md object-cover"
                                                />}
                                                <div>
                                                    <p className="font-medium text-lg">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.option}</p>
                                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <p className="font-semibold text-lg flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{item.price * item.quantity}</p>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </div>
                    <div className='space-y-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Checkout</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <p className="text-muted-foreground">Subtotal</p>
                                        <p className="flex items-center"><IndianRupee className="h-4 w-4 mr-1" />{subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-muted-foreground">Delivery</p>
                                        {deliveryFee > 0 ? (
                                            <p className="flex items-center"><IndianRupee className="h-4 w-4 mr-1" />{deliveryFee.toFixed(2)}</p>
                                        ) : (
                                            <p className="text-primary font-semibold">FREE</p>
                                        )}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-xl">
                                        <p>Total</p>
                                        <p className="flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                 <CardTitle>Payment</CardTitle>
                                 <CardDescription>Select your payment method and provide delivery details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
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
                                    <Label htmlFor="cod" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-accent has-[input-checked]:text-accent-foreground">
                                        <RadioGroupItem value="cod" id="cod" />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                                        <span>Cash on Delivery</span>
                                    </Label>
                                </RadioGroup>

                                
                                <div className="space-y-4">
                                    <Alert variant="default" className="bg-accent/50 border-primary/50">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle className='font-semibold text-primary'>Important Information</AlertTitle>
                                        <AlertDescription className="text-accent-foreground">
                                            By clicking on the button Procced to Pay you will directly go to the owener whatshapp no. Then you wiil enter your name ,Full address and product screenshot then, click on send Button
                                        </AlertDescription>
                                    </Alert>
                                     {user && (
                                        <div className="text-sm p-3 rounded-md bg-muted/50">
                                            <p>Ordering as: <span className="font-semibold">{user.name}</span></p>
                                            <p>Contact: <span className="font-semibold">{user.phone}</span></p>
                                            {user.location && <p className='text-green-600 font-semibold'>Location is active.</p>}
                                            <p>Total Delivered Orders: <span className="font-semibold">{user.orderCount}</span></p>
                                        </div>
                                    )}
                                </div>
                                
                                <Button 
                                    className="w-full text-lg" 
                                    size="lg" 
                                    onClick={handlePlaceOrder} 
                                    disabled={!user}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {paymentMethod === 'cod' ? 'Place COD Order' : 'Proceed to Pay'}
                                </Button>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto" />
                    <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
                    <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild className="mt-6">
                        <Link href="/">Start Shopping</Link>
                    </Button>
                </div>
            )}
        </main>
        <Footer />
    </div>
  );
}
