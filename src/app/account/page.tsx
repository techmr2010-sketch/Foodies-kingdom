
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, ChevronLeft, CheckCircle, User as UserIcon, Camera } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
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
    

    

    
