import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProblemsSection } from '@/components/ProblemsSection';
import { FundSection } from '@/components/FundSection';
import { JoinSection } from '@/components/JoinSection';
import { Footer } from '@/components/Footer';
import { GPTSystemProvider } from '@/components/gpt/GPTSystemProvider';

const Index = () => {
  return (
    <GPTSystemProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProblemsSection />
          <FundSection />
          <JoinSection />
        </main>
        <Footer />
      </div>
    </GPTSystemProvider>
  );
};

export default Index;
