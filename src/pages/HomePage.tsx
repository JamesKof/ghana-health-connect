import { PageLayout } from '@/components/PageLayout';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { VideoSection } from '@/components/VideoSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { NewsSection } from '@/components/NewsSection';
import { CampaignHero } from '@/components/CampaignHero';

const HomePage = () => {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <VideoSection />
      <RegistrationSection />
      <NewsSection />
      <CampaignHero />
    </PageLayout>
  );
};

export default HomePage;
