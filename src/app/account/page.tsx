import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

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

export default function AccountPage() {
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
            <h1 className="text-3xl font-bold font-headline ml-4">Order History</h1>
        </div>
        
        <div className="space-y-6">
          {previousOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>Order {order.id}</CardTitle>
                  <CardDescription>Date: {new Date(order.date).toLocaleDateString()}</CardDescription>
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
      </main>
      <Footer />
    </div>
  );
}