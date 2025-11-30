
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChevronLeft, Send, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
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

type Order = {
    id: string;
    date: string;
    total: number;
    items: { name: string; quantity: number; }[];
    status: 'Pending' | 'Delivered';
};


export default function PaymentsPage() {
  const [amount, setAmount] = useState('');
  const { toast } = useToast();
  const [codOrder, setCodOrder] = useState('');
  const [isClient, setIsClient] = useState(false);
  const { user, openSignUpModal } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setIsClient(true);
    if (!user) {
        openSignUpModal();
    }
  }, [user, openSignUpModal]);


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
    const upiLink = `upi://pay?pa=9310364770@paytm&pn=Foodies%20Kingdom&am=${paymentAmount.toFixed(2)}&cu=INR`;
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
    let message = `New COD Order from Foodies Kingdom:\n\nCustomer Name: ${user.name}\nAddress: Manual entry required\nPhone: ${user.phone}\n\nOrder Details:\n${codOrder}`;
    
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

  if (!isClient) {
      return null; // Or a loading spinner
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
            <h1 className="text-3xl font-bold font-headline ml-4">Payments</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Pay (UPI)</CardTitle>
                    <CardDescription>Pay any amount directly using your UPI app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount to pay"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <Icons.paytm className="h-6" />
                        <Icons.gpay className="h-6" />
                        <Icons.phonepe className="h-6" />
                    </div>
                    <Button className="w-full" onClick={handleQuickPay}>
                        <Send className="mr-2 h-4 w-4" /> Pay via UPI
                    </Button>
                </CardFooter>
            </Card>

            <Dialog>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:bg-accent transition-colors">
                        <CardHeader>
                            <CardTitle>Manual Order (COD)</CardTitle>
                            <CardDescription>Place an order manually for Cash on Delivery.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <Home className="h-12 w-12 mb-2" />
                                <p>Click here to place a COD order</p>
                            </div>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Place a Manual COD Order</DialogTitle>
                        <DialogDescription>
                        Describe your order below. Your details will be sent to the owner via WhatsApp for confirmation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="cod-order">Order Details</Label>
                        <Textarea
                            id="cod-order"
                            placeholder="e.g., 2 Full Chicken Biryani, 1 Half Veg Momos..."
                            value={codOrder}
                            onChange={(e) => setCodOrder(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" id="close-cod-dialog">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleCodSubmit}>Send Order on WhatsApp</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}
