
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, ChevronLeft, Send, Home, CheckCircle, User as UserIcon, Camera } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type OrderItem = {
    name: string;
    quantity: number;
};

type Order = {
    id: string;
    date: string;
    total: number;
    items: OrderItem[];
    status: 'Pending' | 'Delivered';
};


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
}

export default function AccountPage() {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();
  const [codOrder, setCodOrder] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user, openSignUpModal, incrementOrderCount, updateProfilePicture } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setIsClient(true);
    if (!user) {
        openSignUpModal();
    } else {
        // Load orders from localStorage for the specific user
        try {
            const storedOrders = localStorage.getItem(`orders-${user.phone}`);
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Failed to load orders from localStorage", error);
            setOrders([]);
        }
    }
  }, [user, openSignUpModal]);
  
  // Effect to save orders to localStorage whenever they change
  useEffect(() => {
      if (user && isClient) {
          try {
              localStorage.setItem(`orders-${user.phone}`, JSON.stringify(orders));
          } catch (error) {
              console.error("Failed to save orders to localStorage", error);
          }
      }
  }, [orders, user, isClient]);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleQuickPay = () => {
    const paymentAmount = parseFloat(amount);
    if (!paymentAmount || paymentAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to pay.',
      });
      return;
    }
    const upiLink = `upi://pay?pa=9310364770@paytm&pn=Foodie%20Kingdom&am=${paymentAmount.toFixed(2)}&cu=INR`;
    window.location.href = upiLink;
    toast({
      title: 'Redirecting to UPI',
      description: `Opening payment app to pay ₹${paymentAmount.toFixed(2)}.`,
    });
  };

  const handleCodSubmit = () => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Not Signed In', description: 'Please sign in to place an order.'});
        return;
    }
    if (!codOrder) {
      toast({
        variant: "destructive",
        title: "Information Missing",
        description: "Please fill in all the details for the COD order.",
      });
      return;
    }
    let message = `New COD Order from Foodie Kingdom:\n\nCustomer Name: ${user.name}\nAddress: Manual entry required\nPhone: ${user.phone}\n\nOrder Details:\n${codOrder}`;
    
    if (user.location) {
        message += `\n\nLocation: https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`;
    } else {
        message += `\n\nLocation Error: Not provided.`;
    }

    const encodedMessage = encodeURIComponent(message);
    const ownerWhatsappUrl = `https://wa.me/919310364770?text=${encodedMessage}`;

    window.open(ownerWhatsappUrl, '_blank');
    
    // Create and save the new order
    const newOrder: Order = {
        id: `FK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        date: new Date().toISOString(),
        total: 0, // Manual orders have unknown total
        items: [{ name: codOrder, quantity: 1 }],
        status: 'Pending',
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    toast({
        title: "COD Order Placed!",
        description: "Your order details have been sent.",
    });

    // Close the dialog and clear fields
    document.getElementById('close-cod-dialog')?.click();
    setCodOrder('');
  }

  const markAsDelivered = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: 'Delivered' } : order
      )
    );
    incrementOrderCount();
    toast({
        title: "Order Delivered!",
        description: `Order ${orderId} marked as delivered. Customer order count updated.`,
    });
  };

  const pendingOrders = orders.filter(o => o.status !== 'Delivered');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');

  if (!isClient) {
      return null; // Or a loading spinner
  }
  
  if (!user) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
                <UserIcon className="h-24 w-24 text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold mb-2">Please Sign In</h1>
                <p className="text-muted-foreground mb-6">You need to be signed in to view your account details.</p>
                <Button onClick={openSignUpModal}>Sign Up / Sign In</Button>
            </main>
            <Footer />
        </div>
    )
  }

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
            <h1 className="text-3xl font-bold font-headline ml-4">My Account</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-1 space-y-8">
                <Card>
                    <CardHeader className="items-center text-center">
                        <div className="relative">
                            <Avatar className="w-24 h-24 text-lg">
                                <AvatarImage src={user.profilePicture || ''} alt={user.name} />
                                <AvatarFallback>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                             <Button 
                                size="icon" 
                                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="h-4 w-4" />
                                <span className="sr-only">Change profile picture</span>
                            </Button>
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleProfilePictureChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        <CardTitle className="mt-4">{user.name}</CardTitle>
                        <CardDescription>{user.phone}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Separator />
                         <div className="text-sm text-muted-foreground mt-4 space-y-2">
                             <div className="flex justify-between">
                                 <span>Total Orders</span>
                                 <span className="font-semibold text-foreground">{user.orderCount}</span>
                             </div>
                             <div className="flex justify-between">
                                 <span>Member Since</span>
                                 <span className="font-semibold text-foreground">{'Today'}</span>
                             </div>
                         </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Make a UPI Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    id="amount"
                                    type="number" 
                                    placeholder="Enter amount" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                           Pay to <span className="font-semibold text-foreground">9310364770@paytm</span>
                        </p>
                    </CardContent>
                     <CardFooter className="flex-col gap-4">
                         <div className="flex items-center justify-center gap-4">
                            <Icons.paytm className="h-6" />
                            <Icons.gpay className="h-6" />
                            <Icons.phonepe className="h-6" />
                        </div>
                        <Button onClick={handleQuickPay} className="w-full">
                           <Send className="mr-2 h-4 w-4" /> Proceed to Pay
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cash on Delivery</CardTitle>
                         <CardDescription>
                            Place an order by describing what you want.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    <Home className="mr-2 h-4 w-4" /> Place Manual COD Order
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Manual COD Order</DialogTitle>
                                <DialogDescription>
                                    Enter your order details below. This will be sent to us via WhatsApp with your saved information.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cod-order" className="text-right">
                                        Order
                                    </Label>
                                    <Textarea id="cod-order" value={codOrder} onChange={(e) => setCodOrder(e.target.value)} className="col-span-3" placeholder="e.g., 1x Full Biryani, 2x Half Momos" />
                                </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="ghost" id="close-cod-dialog">Cancel</Button>
                                  </DialogClose>
                                <Button type="button" onClick={handleCodSubmit}>Submit Order</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                 <h2 className="text-2xl font-bold font-headline mb-4">Pending Orders</h2>
                {pendingOrders.length > 0 ? (
                    <div className="space-y-6">
                    {pendingOrders.map((order) => (
                        <Card key={order.id}>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                            <CardTitle>Order {order.id}</CardTitle>
                            <CardDescription>Date: {formatDate(order.date)}</CardDescription>
                            </div>
                            <div className="text-right">
                                {order.total > 0 && (
                                    <p className="font-bold text-lg flex items-center justify-end"><IndianRupee className="h-5 w-5 mr-1" />{order.total.toFixed(2)}</p>
                                )}
                                <p className="text-sm text-yellow-600 font-semibold">{order.status}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-muted-foreground">
                                <span>{item.quantity} x {item.name}</span>
                                </li>
                            ))}
                            </ul>
                            <Separator className="my-4" />
                            <Button onClick={() => markAsDelivered(order.id)} className="w-full mt-4">
                                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Delivered
                            </Button>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No pending orders.</p>
                )}

                <h2 className="text-2xl font-bold font-headline mt-12 mb-4">Order History</h2>
                {deliveredOrders.length > 0 ? (
                    <div className="space-y-6">
                    {deliveredOrders.map((order) => (
                        <Card key={order.id}>
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                            <CardTitle>Order {order.id}</CardTitle>
                            <CardDescription>Date: {formatDate(order.date)}</CardDescription>
                            </div>
                            <div className="text-right">
                                {order.total > 0 && (
                                    <p className="font-bold text-lg flex items-center justify-end"><IndianRupee className="h-5 w-5 mr-1" />{order.total.toFixed(2)}</p>
                                )}
                                <p className="text-sm text-green-600 font-semibold">{order.status}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                            {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-muted-foreground">
                                <span>{item.quantity} x {item.name}</span>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No delivered orders yet.</p>
                )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
    
