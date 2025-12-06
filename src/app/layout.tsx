
import type {Metadata} from 'next';
import './globals.css';
import { Inter, Lobster } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppProviders } from '@/components/app-providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const lobster = Lobster({ weight: '400', subsets: ['latin'], variable: '--font-headline' });

export const metadata: Metadata = {
  title: 'Foodies Kingdom',
  description: 'A fast, seamless food ordering experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased pb-16 md:pb-0", inter.variable, lobster.variable)}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
