
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, ChevronLeft, Send, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
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


const previousOrders = [
  {
    id: 'FK-001',
    date: '2024-07-28',
    total: 260,
    items: [
      { name: 'Biryani Non Veg (Full)', quantity: 1 },
      { name: 'Momos Veg Fry (Half)', quantity: 1 },
    ],
    status: 'Delivered',
  },
  {
    id: 'FK-002',
    date: '2024-07-25',
    total: 150,
    items: [
      { name: 'Biryani Veg (Full)', quantity: 1 },
    ],
    status: 'Delivered',
  },
];

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function AccountPage() {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();
  const [codName, setCodName] = useState('');
  const [codAddress, setCodAddress] = useState('');
  const [codOrder, setCodOrder] = useState('');

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
    if (!codName || !codAddress || !codOrder) {
      toast({
        variant: "destructive",
        title: "Information Missing",
        description: "Please fill in all the details for the COD order.",
      });
      return;
    }
    const message = `New COD Order from Foodie Kingdom:\n\nCustomer Name: ${codName}\nAddress: ${codAddress}\n\nOrder Details:\n${codOrder}`;
    const encodedMessage = encodeURIComponent(message);
    const ownerWhatsappUrl = `https://wa.me/919310364770?text=${encodedMessage}`;

    window.open(ownerWhatsappUrl, '_blank');

    toast({
        title: "COD Order Placed!",
        description: "Your order details have been sent.",
    });

    // Close the dialog and clear fields
    document.getElementById('close-cod-dialog')?.click();
    setCodName('');
    setCodAddress('');
    setCodOrder('');
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
        
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Order History</h2>
                <div className="space-y-6">
                {previousOrders.map((order) => (
                    <Card key={order.id}>
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                        <CardTitle>Order {order.id}</CardTitle>
                        <CardDescription>Date: {formatDate(order.date)}</CardDescription>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg flex items-center justify-end"><IndianRupee className="h-5 w-5 mr-1" />{order.total.toFixed(2)}</p>
                            <p className="text-sm text-green-600 font-semibold">{order.status}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className="my-4" />
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
            </div>
            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Payments</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Make a UPI Payment</CardTitle>
                        <CardDescription>
                            Enter the amount you wish to pay. We'll redirect you to your UPI app.
                        </CardDescription>
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
                         <p className="text-sm text-muted-foreground">
                            You will be asked to pay to UPI ID: <span className="font-semibold text-foreground">9310364770@paytm</span>
                        </p>
                        <Button onClick={handleQuickPay} className="w-full">
                           <Send className="mr-2 h-4 w-4" /> Proceed to Pay
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Cash on Delivery</CardTitle>
                        <CardDescription>
                            Prefer to pay on delivery? Place your order here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Home className="mr-2 h-4 w-4" /> Place COD Order
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Cash on Delivery Order</DialogTitle>
                                <DialogDescription>
                                    Enter your details below. This will be sent to us via WhatsApp.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cod-name" className="text-right">
                                    Name
                                    </Label>
                                    <Input id="cod-name" value={codName} onChange={(e) => setCodName(e.target.value)} className="col-span-3" placeholder="Your full name" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cod-address" className="text-right">
                                    Address
                                    </Label>
                                    <Input id="cod-address" value={codAddress} onChange={(e) => setCodAddress(e.target.value)} className="col-span-3" placeholder="Your full delivery address"/>
                                </div>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
