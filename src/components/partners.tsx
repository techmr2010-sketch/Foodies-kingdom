'use client';

import { restaurantPartners, deliveryPartners } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Building, MapPin, Utensils, User, Phone, Bike } from 'lucide-react';

export default function Partners() {
  return (
    <section id="partners" className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Building className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-bold font-headline tracking-tight">Our Partners</h2>
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
    </section>
  );
}
