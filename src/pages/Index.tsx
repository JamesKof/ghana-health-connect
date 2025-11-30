import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { MembershipSection } from '@/components/MembershipSection';
import { ServicesSection } from '@/components/ServicesSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { VideoSection } from '@/components/VideoSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { FacilitiesSection } from '@/components/FacilitiesSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { CampaignHero } from '@/components/CampaignHero';
import { NewsSection } from '@/components/NewsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MembershipSection />
        <ServicesSection />
        <BenefitsSection />
        <VideoSection />
        <RegistrationSection />
        <FacilitiesSection />
        <NewsSection />
        <ResourcesSection />
        <CampaignHero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
