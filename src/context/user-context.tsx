
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

type User = {
  name: string;
  phone: string;
  location: { latitude: number; longitude: number } | null;
};

type UserContextType = {
  user: User | null;
  signIn: (phone: string) => boolean;
  signUp: (name: string, phone: string, location: { latitude: number, longitude: number } | null) => void;
  signOut: () => void;
  openSignInModal: () => void;
  openSignUpModal: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { toast } = useToast();

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpLocation, setSignUpLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [signUpLocationError, setSignUpLocationError] = useState<string | null>(null);
  
  // Sign In state
  const [signInPhone, setSignInPhone] = useState('');

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('foodie-user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // If user has no location, ask again
            if (!parsedUser.location) {
                requestLocation(setSignUpLocation, setSignUpLocationError, true);
            }
        } else {
            // If no user, prompt for sign-up after a short delay
            setTimeout(() => {
                setIsSignUpModalOpen(true);
            }, 2000);
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('foodie-user');
    }
  }, []);

  const requestLocation = (setLocation: Function, setLocationError: Function, silent = false) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          setLocationError(null);
          if (!silent) {
            toast({
              title: 'Location Captured',
              description: 'Your location has been successfully captured.',
            });
          }
          // If user already exists, update their location in localStorage
          const storedUser = localStorage.getItem('foodie-user');
          if(storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const updatedUser = { ...parsedUser, location: newLocation };
            localStorage.setItem('foodie-user', JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        },
        (error) => {
          setLocationError(error.message);
          if (!silent) {
            toast({
              variant: 'destructive',
              title: 'Location Error',
              description: 'Could not get your location. Please enable location services.',
            });
          }
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      if(!silent) {
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: 'Geolocation is not supported by this browser.',
        });
      }
    }
  };


  const signIn = (phone: string): boolean => {
    try {
        const storedUser = localStorage.getItem('foodie-user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.phone === phone) {
                setUser(parsedUser);
                toast({ title: "Sign In Successful!", description: `Welcome back, ${parsedUser.name}!` });
                setIsSignInModalOpen(false);
                setSignInPhone('');
                return true;
            }
        }
        toast({ variant: "destructive", title: "Sign In Failed", description: "No account found with this phone number. Please sign up." });
        return false;
    } catch(error) {
        toast({ variant: "destructive", title: "Sign In Error", description: "An unexpected error occurred." });
        return false;
    }
  };

  const signUp = (name: string, phone: string, location: { latitude: number, longitude: number } | null) => {
    if(!name || !phone) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please enter your name and phone number.' });
        return;
    }
     if(!location) {
        toast({ variant: 'destructive', title: 'Location Required', description: 'Please allow location access to sign up.' });
        return;
    }
    const newUser: User = { name, phone, location };
    try {
        localStorage.setItem('foodie-user', JSON.stringify(newUser));
        setUser(newUser);
        toast({ title: "Sign Up Successful!", description: `Welcome, ${name}!` });
        setIsSignUpModalOpen(false);
        setSignUpName('');
        setSignUpPhone('');
    } catch (error) {
        toast({ variant: 'destructive', title: 'Sign Up Failed', description: 'Could not save your details.' });
    }
  };

  const signOut = () => {
    try {
        localStorage.removeItem('foodie-user');
        setUser(null);
        toast({ title: "Signed Out", description: "You have been successfully signed out." });
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Could not sign out." });
    }
  };

  const handleSignUpSubmit = () => {
    signUp(signUpName, signUpPhone, signUpLocation);
  }
  
  const handleSignInSubmit = () => {
    signIn(signInPhone);
  }

  return (
    <UserContext.Provider value={{ user, signIn, signUp, signOut, openSignInModal: () => setIsSignInModalOpen(true), openSignUpModal: () => setIsSignUpModalOpen(true) }}>
      {children}
      <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to Foodie Kingdom!</DialogTitle>
            <DialogDescription>
              Create an account to get started. It only takes a minute.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Name</Label>
              <Input id="signup-name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-phone">Phone Number</Label>
              <Input id="signup-phone" type="tel" value={signUpPhone} onChange={(e) => setSignUpPhone(e.target.value)} placeholder="Your 10-digit number" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Button variant="outline" className='w-full' onClick={() => requestLocation(setSignUpLocation, setSignUpLocationError)}>
                <MapPin className="mr-2 h-4 w-4" />
                {signUpLocation ? 'Location Captured!' : 'Allow Location Access'}
              </Button>
              {signUpLocation && <p className="text-sm text-green-600 text-center">Location access granted.</p>}
              {signUpLocationError && <p className="text-sm text-destructive text-center">{signUpLocationError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => { setIsSignInModalOpen(true); setIsSignUpModalOpen(false); }} variant="link">Already have an account?</Button>
            <Button type="button" onClick={handleSignUpSubmit}>Sign Up</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isSignInModalOpen} onOpenChange={setIsSignInModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Enter your phone number to sign in to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="signin-phone">Phone Number</Label>
              <Input id="signin-phone" type="tel" value={signInPhone} onChange={(e) => setSignInPhone(e.target.value)} placeholder="Your 10-digit number" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => { setIsSignUpModalOpen(true); setIsSignInModalOpen(false); }} variant="link">Create an account</Button>
            <Button type="button" onClick={handleSignInSubmit}>Sign In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
