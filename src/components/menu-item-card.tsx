
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { MenuItem } from '@/lib/data';
import { Leaf, Drumstick, PlusCircle, MapPin, Building, IndianRupee } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { useCart } from '@/context/cart-context';

type MenuItemCardProps = {
  item: MenuItem;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const image = PlaceHolderImages.find(img => img.id === item.imageId);
  const isLocal = item.location === 'Moolchand, New Delhi';
  const [selectedOption, setSelectedOption] = useState(item.options[0]);

  const handleAddToCart = () => {
    const cartItem = {
        menuItemId: item.id,
        name: item.name,
        price: selectedOption.price,
        imageId: item.imageId,
        option: selectedOption.name
    }
    addToCart(cartItem);
    toast({
      title: "Added to cart!",
      description: `${item.name} (${selectedOption.name}) has been added to your order.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
      <CardHeader className="p-0 relative">
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.name}
            width={600}
            height={400}
            className="object-cover aspect-[3/2] w-full"
            data-ai-hint={image.imageHint}
          />
        )}
        <Badge
          variant={item.type === 'veg' ? 'secondary' : 'destructive'}
          className="absolute top-2 right-2 border-none"
        >
          {item.type === 'veg' ? <Leaf className="h-4 w-4 mr-1" /> : <Drumstick className="h-4 w-4 mr-1" />}
          {item.type}
        </Badge>
         {isLocal && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-none">
            <MapPin className="h-4 w-4 mr-1" />
            Free Delivery
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-2 font-headline">{item.name}</CardTitle>
        {item.restaurant && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Building className="h-4 w-4 mr-2" />
            <span>{item.restaurant}</span>
          </div>
        )}
         <div className="flex justify-between items-center mt-4">
          <Select defaultValue={selectedOption.name} onValueChange={(value) => {
            const newOption = item.options.find(o => o.name === value);
            if (newOption) setSelectedOption(newOption);
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {item.options.map(option => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg text-foreground flex items-center">
              <IndianRupee className="h-5 w-5 mr-1" />{selectedOption.price}
            </span>
            {selectedOption.originalPrice && (
              <span className="text-sm text-muted-foreground line-through flex items-center">
                <IndianRupee className="h-4 w-4 mr-0.5" />{selectedOption.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
