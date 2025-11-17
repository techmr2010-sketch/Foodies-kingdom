'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function HelpPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const orderId = (form.elements.namedItem('orderId') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const query = `Query from Foodie Kingdom:\nName: ${name}\nEmail: ${email}\nOrder ID: ${orderId || 'N/A'}\nMessage: ${message}`;
    const encodedQuery = encodeURIComponent(query);
    const whatsappUrl = `https://wa.me/919310364770?text=${encodedQuery}`;
    
    window.open(whatsappUrl, '_blank');
    form.reset();
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
            <h1 className="text-3xl font-bold font-headline ml-4">Help Centre</h1>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Have a question or need assistance? Fill out the form below and we'll get back to you via WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="orderId">Order ID (Optional)</Label>
                <Input id="orderId" placeholder="e.g., FK-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Query</Label>
                <Textarea id="message" placeholder="How can we help you?" required />
              </div>
              <Button type="submit" className="w-full">Send on WhatsApp</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
