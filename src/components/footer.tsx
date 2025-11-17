import { CreditCard, Wallet } from 'lucide-react';
import { Icons } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-primary mb-2 font-headline">Foodie Kingdom</h3>
            <p className="text-muted-foreground">Fast, seamless food ordering from local restaurants.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Supported Payments</h4>
            <div className="flex justify-center md:justify-start gap-4 text-muted-foreground">
              <CreditCard />
              <Wallet />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Cards, Wallets & COD</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Connect With Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Icons.twitter className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Icons.facebook className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Icons.instagram className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-muted-foreground mt-8 pt-8 border-t">
          <p>&copy; {new Date().getFullYear()} Foodie Kingdom. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
