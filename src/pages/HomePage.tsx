import { PageLayout } from '@/components/PageLayout';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { VideoSection } from '@/components/VideoSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { NewsSection } from '@/components/NewsSection';
import { CampaignHero } from '@/components/CampaignHero';
import { SectionNav } from '@/components/SectionNav';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About NHIS' },
  { id: 'services', label: 'Services' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'videos', label: 'Videos' },
  { id: 'registration', label: 'Registration' },
  { id: 'news', label: 'News' },
  { id: 'campaign', label: 'Campaign' },
];

const HomePage = () => {
  return (
    <PageLayout>
      <SectionNav sections={sections} />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="benefits">
        <BenefitsSection />
      </section>
      <section id="videos">
        <VideoSection />
      </section>
      <section id="registration">
        <RegistrationSection />
      </section>
      <section id="news">
        <NewsSection />
      </section>
      <section id="campaign">
        <CampaignHero />
      </section>
    </PageLayout>
  );
};

export default HomePage;
