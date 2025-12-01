'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChefHat, Search } from 'lucide-react';
import { getRecipe } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeFinderPage() {
  const [dishName, setDishName] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!dishName) return;
    setIsLoading(true);
    setRecipe('');
    const result = await getRecipe(dishName);
    setRecipe(result.recipe);
    setIsLoading(false);
  };

  // Basic markdown to HTML conversion
  const renderMarkdown = (text: string) => {
    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Headers: ## text
    text = text.replace(/^##\s*(.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>');
    // Headers: # text
    text = text.replace(/^#\s*(.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
     // Unordered lists: * item or - item
    text = text.replace(/^\s*[\*-]\s+(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    text = text.replace(/<\/li>\n<li/g, '</li><li'); // Handle consecutive list items
    // Wrap list items in <ul>
    text = text.replace(/(<li.*<\/li>)/gs, '<ul>$1</ul>');
    // Paragraphs
    return text.split('\n').map(p => `<p>${p}</p>`).join('');
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ChefHat className="h-16 w-16 mx-auto text-primary" />
            <h1 className="text-4xl font-bold font-headline mt-4">AI Recipe Finder</h1>
            <p className="text-muted-foreground mt-2">
              Enter any dish name and let our AI chef find the perfect recipe for you!
            </p>
          </div>

          <div className="flex w-full items-center space-x-2 mb-8">
            <Input
              type="text"
              placeholder="e.g., Butter Chicken, Pizza, etc."
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="text-lg h-12"
            />
            <Button type="submit" onClick={handleSearch} size="lg" className="h-12">
              <Search className="mr-2 h-5 w-5" />
              Find Recipe
            </Button>
          </div>

          {(isLoading || recipe) && (
             <Card>
                <CardHeader>
                    <CardTitle>Your Recipe</CardTitle>
                    <CardDescription>Here's how to make {dishName}.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-8 w-1/3 mt-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    ) : (
                       <div 
                          className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert" 
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(recipe) }}
                        />
                    )}
                </CardContent>
            </Card>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
