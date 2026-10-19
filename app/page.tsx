import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Story } from '@/components/Story';
import { HowToBuy } from '@/components/HowToBuy';
import { Playground } from '@/components/Playground';
import { TokenPanel } from '@/components/TokenPanel';
import { Gallery } from '@/components/Gallery';
import { Community } from '@/components/Community';
import { Footer } from '@/components/Footer';

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <Hero />
      <Marquee />
      <Story />
      <HowToBuy />
      <Playground />
      <TokenPanel />
      <Gallery />
      <Community />
    </main>
    <Footer />
  </>;
}
