import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-accent font-headline">
          Welcome to Foodies Kingdom
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground italic">
          "We don't need your money, we need your help... to eat all this delicious food!"
        </p>
      </div>
    </section>
  );
}
