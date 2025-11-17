import Header from '@/components/header';
import Hero from '@/components/hero';
import Recommendations from '@/components/recommendations';
import MenuDisplay from '@/components/menu-display';
import Footer from '@/components/footer';
import Partners from '@/components/partners';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Recommendations />
        <MenuDisplay />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
