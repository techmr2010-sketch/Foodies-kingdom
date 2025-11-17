import Header from '@/components/header';
import Hero from '@/components/hero';
import Recommendations from '@/components/recommendations';
import MenuDisplay from '@/components/menu-display';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Recommendations />
        <MenuDisplay />
      </main>
      <Footer />
    </div>
  );
}
