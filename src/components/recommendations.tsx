
'use client';

import { useEffect, useState } from 'react';
import { getRecommendations } from '@/app/actions';
import { menuData } from '@/lib/data';
import MenuItemCard from './menu-item-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import { useUser } from '@/context/user-context';

export default function Recommendations() {
  const [recommendedItems, setRecommendedItems] = useState<typeof menuData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      // Mock order history for recommendations for now
      const mockHistory = ['Biryani Non Veg', 'Momos Non Veg Steam'];
      const mockPrefs = 'non-vegetarian';
      
      const recommendations = await getRecommendations(user?.phone, mockHistory, mockPrefs);
      const dishNames = recommendations.map(r => r.dishName);


      if (dishNames.length > 0) {
        const items = menuData.filter(item => dishNames.includes(item.name));
        setRecommendedItems(items);
      } else {
        // Fallback to some popular items if AI fails or returns nothing
        setRecommendedItems(menuData.filter(item => ['1', '4', '5', '11'].includes(item.id)));
      }
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [user]);

  return (
    <section id="recommendations" className="bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold font-headline tracking-tight">Recommended For You</h2>
        </div>
        
        {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
             <Carousel opts={{ align: "start", loop: recommendedItems.length > 3 }} className="w-full">
                <CarouselContent>
                    {recommendedItems.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="p-1">
                            <MenuItemCard item={item} />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
            </Carousel>
        )}
      </div>
    </section>
  );
}
