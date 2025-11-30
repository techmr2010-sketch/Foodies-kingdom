import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/cart-context';
import { UserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: 'Foodie Kingdom',
  description: 'A fast, seamless food ordering experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <UserProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
