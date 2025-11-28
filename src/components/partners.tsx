
'use client';

import { restaurantPartners, deliveryPartners } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Building, MapPin, Utensils, User, Phone, Bike, Crown, Award, Briefcase, DollarSign } from 'lucide-react';

export default function Partners() {
  return (
    <section id="partners" className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-bold font-headline tracking-tight">Our Team & Partners</h2>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                    <Crown className="h-6 w-6" />
                    Parikshit Pathak
                  </CardTitle>
                  <CardDescription className="text-primary/80">C.E.O of Foodie Kingdom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-foreground">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>+91 9821073025</span>
                  </div>
                </CardContent>
              </Card>
            <Card className="border-secondary bg-secondary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-secondary-foreground flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                     Mokhs
                  </CardTitle>
                  <CardDescription>Investor Partner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>E-33 Aali vihar ,Bhim colony near sarita vihar (110076)</span>
                    </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 97173 79656</span>
                  </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-secondary bg-secondary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-secondary-foreground flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Mohit
                  </CardTitle>
                  <CardDescription>Account Manager</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>H-175, Molorband, Tajpur near Badarpur</span>
                    </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 9971874905</span>
                  </div>
                </CardContent>
            </Card>
            <Card className="border-secondary bg-secondary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-secondary-foreground flex items-center gap-2">
                    <Briefcase className="h-6 w-6" />
                    Samrat
                  </CardTitle>
                  <CardDescription>Restaurant Manager</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>saurabh vihar,jaitpur near Badarpur(110044)</span>
                    </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 99714 04565</span>
                  </div>
                </CardContent>
            </Card>
            <Card className="border-secondary bg-secondary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-secondary-foreground flex items-center gap-2">
                    <Briefcase className="h-6 w-6" />
                    Prince
                  </CardTitle>
                  <CardDescription>Restaurant Manager</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>K 169/3 Saurabh vihar,jaitpur near Badarpur(110044)</span>
                    </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+91 95402 36387</span>
                  </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantPartners.map((partner) => (
            <Card key={partner.name} className="flex flex-col">
                <CardHeader>
                <CardTitle className="font-headline text-xl">{partner.name}</CardTitle>
                {partner.owner !== 'N/A' && <CardDescription>Owner: {partner.owner}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{partner.location}</span>
                </div>
                <div className="flex items-center">
                    <Utensils className="h-4 w-4 mr-2" />
                    <span>Specialty: {partner.specialty}</span>
                </div>
                </CardContent>
            </Card>
            ))}
            {deliveryPartners.map((partner) => (
            <Card key={partner.name} className="flex flex-col bg-secondary/50">
                <CardHeader>
                <CardTitle className="font-headline text-xl">Delivery Partner</CardTitle>
                <CardDescription>Our trusted delivery professional.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{partner.name}</span>
                </div>
                <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{partner.phone}</span>
                </div>
                <div className="flex items-center">
                    <Bike className="h-4 w-4 mr-2" />
                    <span className='capitalize'>{partner.vehicle}</span>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
