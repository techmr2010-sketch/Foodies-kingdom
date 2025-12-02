
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
import { FoodieKingdomLogo } from './logo';

export default function Header() {
  const { user, signOut, openSignInModal, openSignUpModal } = useUser();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-orange-200 to-amber-200">
      <div className="container mx-auto flex h-auto flex-col items-start justify-between px-4 py-2 md:h-16 md:flex-row md:items-center md:py-0">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <FoodieKingdomLogo className="h-10 w-10" />
            <span className="text-lg font-bold font-headline hidden md:inline bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Foodies Kingdom
            </span>
             <span className="text-lg font-bold font-headline md:hidden bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Foodies Kingdom
            </span>
          </Link>
          <div className="flex items-center gap-2 md:hidden">
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
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <Button onClick={openSignUpModal} size="sm">Sign Up</Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="mt-2 flex w-full items-center gap-4 md:hidden">
          <Button variant="link" asChild className="px-0">
            <Link href="/#menu">Menu</Link>
          </Button>
          <Button variant="link" asChild className="px-0">
            <Link href="/#recommendations">For You</Link>
          </Button>
          <Button variant="link" asChild className="px-0">
            <Link href="/#partners">Partners</Link>
          </Button>
        </nav>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
           <nav className="flex items-center gap-4">
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
                  <Link href="/payments">
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
            <div className='hidden items-center gap-2 md:flex'>
              <Button variant="ghost" onClick={openSignInModal}>Sign In</Button>
              <Button onClick={openSignUpModal}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
