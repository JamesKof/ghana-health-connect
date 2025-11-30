import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { MembershipDetailSection } from '@/components/MembershipDetailSection';
import { ServicesSection } from '@/components/ServicesSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { VideoSection } from '@/components/VideoSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { ClaimsPaymentSection } from '@/components/ClaimsPaymentSection';
import { ProvidersSection } from '@/components/ProvidersSection';
import { CredentialingSection } from '@/components/CredentialingSection';
import { PrivateHealthInsuranceSection } from '@/components/PrivateHealthInsuranceSection';
import { FAQsSection } from '@/components/FAQsSection';
import { DownloadsSection } from '@/components/DownloadsSection';
import { FacilitiesSection } from '@/components/FacilitiesSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { CampaignHero } from '@/components/CampaignHero';
import { NewsSection } from '@/components/NewsSection';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MembershipDetailSection />
        <ServicesSection />
        <BenefitsSection />
        <VideoSection />
        <RegistrationSection />
        <ClaimsPaymentSection />
        <ProvidersSection />
        <CredentialingSection />
        <PrivateHealthInsuranceSection />
        <FAQsSection />
        <DownloadsSection />
        <FacilitiesSection />
        <NewsSection />
        <ResourcesSection />
        <CampaignHero />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
