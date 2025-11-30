
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
  orderCount: number;
  profilePicture: string | null;
};

type UserContextType = {
  user: User | null;
  signIn: (phone: string) => boolean;
  signUp: (name: string, phone: string, location: { latitude: number, longitude: number } | null) => void;
  signOut: () => void;
  incrementOrderCount: () => void;
  updateProfilePicture: (picture: string) => void;
  openSignInModal: () => void;
  openSignUpModal: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// In a real app, this would be a database.
// For this demo, we'll store multiple users in a single localStorage item.
const getUsers = (): { [phone: string]: User } => {
    try {
        if (typeof window === 'undefined') return {};
        const users = localStorage.getItem('foodie-users');
        return users ? JSON.parse(users) : {};
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return {};
    }
}

const saveUsers = (users: { [phone: string]: User }) => {
    try {
        if (typeof window === 'undefined') return;
        localStorage.setItem('foodie-users', JSON.stringify(users));
    } catch (error) {
        console.error("Failed to save users to localStorage", error);
    }
}


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
        if (typeof window === 'undefined') return;
        const storedUserPhone = localStorage.getItem('foodie-active-user');
        if (storedUserPhone) {
            const users = getUsers();
            const activeUser = users[storedUserPhone];
            if (activeUser) {
                setUser(activeUser);
            }
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('foodie-users');
            localStorage.removeItem('foodie-active-user');
        }
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
          if (user) {
                const users = getUsers();
                const updatedUser = { ...users[user.phone], location: newLocation };
                users[user.phone] = updatedUser;
                saveUsers(users);
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
        const users = getUsers();
        const existingUser = users[phone];

        if (existingUser) {
            setUser(existingUser);
            if (typeof window !== 'undefined') {
              localStorage.setItem('foodie-active-user', phone);
            }
            toast({ title: "Sign In Successful!", description: `Welcome back, ${existingUser.name}!` });
            setIsSignInModalOpen(false);
            setSignInPhone('');
            return true;
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

    const users = getUsers();
    if(users[phone]) {
        toast({ variant: "destructive", title: "Account Exists", description: "An account with this phone number already exists. Please sign in." });
        setIsSignUpModalOpen(false);
        setIsSignInModalOpen(true);
        setSignInPhone(phone);
        return;
    }

    const newUser: User = { name, phone, location, orderCount: 0, profilePicture: null };
    
    users[phone] = newUser;
    saveUsers(users);
    
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodie-active-user', phone);
    }

    toast({ title: "Sign Up Successful!", description: `Welcome, ${name}!` });
    setIsSignUpModalOpen(false);
    setSignUpName('');
    setSignUpPhone('');
  };

  const signOut = () => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('foodie-active-user');
        }
        setUser(null);
        toast({ title: "Signed Out", description: "You have been successfully signed out." });
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Could not sign out." });
    }
  };
  
  const updateProfilePicture = (picture: string) => {
    setUser(currentUser => {
        if (currentUser) {
            const users = getUsers();
            const updatedUser = { ...currentUser, profilePicture: picture };
            users[currentUser.phone] = updatedUser;
            saveUsers(users);
            toast({ title: "Profile Picture Updated", description: "Your new picture has been saved." });
            return updatedUser;
        }
        return null;
    });
  };

  const incrementOrderCount = () => {
    setUser(currentUser => {
        if (currentUser) {
            const users = getUsers();
            const updatedUser = { ...currentUser, orderCount: currentUser.orderCount + 1 };
            users[currentUser.phone] = updatedUser;
            saveUsers(users);
            return updatedUser;
        }
        return null;
    });
  };

  const handleSignUpSubmit = () => {
    signUp(signUpName, signUpPhone, signUpLocation);
  }
  
  const handleSignInSubmit = () => {
    signIn(signInPhone);
  }

  return (
    <UserContext.Provider value={{ user, signIn, signUp, signOut, incrementOrderCount, updateProfilePicture, openSignInModal: () => setIsSignInModalOpen(true), openSignUpModal: () => setIsSignUpModalOpen(true) }}>
      {children}
      <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to Delhi Foodie Kingdom!</DialogTitle>
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
