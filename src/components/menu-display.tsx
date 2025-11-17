'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { menuData, foodCategories } from '@/lib/data';
import MenuItemCard from './menu-item-card';

export default function MenuDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMenu = useMemo(() => {
    return menuData.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.category.includes(activeFilter) || item.type === activeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  return (
    <section id="menu" className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold font-headline tracking-tight">Our Menu</h2>
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a dish..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {foodCategories.map(category => (
          <Button
            key={category}
            variant={activeFilter === category ? 'default' : 'outline'}
            onClick={() => setActiveFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      {filteredMenu.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No dishes found. Try a different search or filter!</p>
        </div>
      )}
    </section>
  );
}
