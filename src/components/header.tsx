
'use client';
import Link from 'next/link';
import { User, ShoppingCart, LogOut, LogIn, LayoutDashboard, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from '@/components/cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header() {
  const { user, signOut, openSignInModal, openSignUpModal } = useUser();
  const logoImage = PlaceHolderImages.find(img => img.id === 'logo');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {logoImage ? (
            <Image
              src={logoImage.imageUrl}
              alt="Foodie Kingdom Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
             <div className="h-10 w-10 bg-primary rounded-full" />
          )}
          <span className="text-2xl font-bold font-headline">
            Foodie Kingdom
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex gap-4">
            <Button variant="link" asChild>
              <Link href="/#menu">Menu</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/#recommendations">For You</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/#partners">Partners</Link>
            </Button>
          </nav>
          <Cart />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                       <AvatarImage src={user.profilePicture || ''} alt={user.name} />
                       <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.phone}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cart">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>My Cart</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <IndianRupee className="mr-2 h-4 w-4" />
                    <span>Payments</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">Help Centre</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-2'>
                <Button variant="ghost" onClick={openSignInModal}>Sign In</Button>
                <Button onClick={openSignUpModal}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

    