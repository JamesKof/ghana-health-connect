import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'tw' | 'ee' | 'ga';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.membership': 'Membership',
    'nav.services': 'Services',
    'nav.faqs': 'FAQs',
    'nav.downloads': 'Downloads',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',
    'nav.memberPortal': 'Member Portal',
    
    // Hero
    'hero.title': 'Quality Healthcare Made Accessible to Every Ghanaian',
    'hero.subtitle': 'The National Health Insurance Scheme ensures all Ghanaians have access to basic healthcare services.',
    'hero.cta': 'Get Started',
    'hero.learnMore': 'Learn More',
    
    // About
    'about.title': 'About NHIS',
    'about.purpose': 'Our Purpose',
    'about.mission': 'Our Mission',
    
    // Services
    'services.title': 'Our Services',
    'services.registration': 'Registration & Renewal',
    'services.benefits': 'Benefit Package',
    'services.claims': 'Claims Processing',
    
    // Member Portal
    'portal.title': 'Member Portal',
    'portal.login': 'Login',
    'portal.logout': 'Logout',
    'portal.welcome': 'Welcome',
    'portal.membershipStatus': 'Membership Status',
    'portal.claimsHistory': 'Claims History',
    'portal.paymentRecords': 'Payment Records',
    'portal.memberId': 'Member ID',
    'portal.expiryDate': 'Expiry Date',
    'portal.status': 'Status',
    'portal.active': 'Active',
    'portal.expired': 'Expired',
    'portal.pending': 'Pending',
    'portal.amount': 'Amount',
    'portal.date': 'Date',
    'portal.facility': 'Facility',
    'portal.service': 'Service',
    'portal.demoNote': 'Demo Mode: Use any email and password to login',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Common
    'common.search': 'Search',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
  },
  tw: {
    // Navigation
    'nav.home': 'Fie',
    'nav.membership': 'Membashɛp',
    'nav.services': 'Dwumadie',
    'nav.faqs': 'Nsɛmmisa',
    'nav.downloads': 'Download',
    'nav.contact': 'Frɛ Yɛn',
    'nav.getStarted': 'Fi Ase',
    'nav.memberPortal': 'Member Portal',
    
    // Hero
    'hero.title': 'Apɔmuden Pa Ma Ghanafoɔ Nyinaa',
    'hero.subtitle': 'National Health Insurance Scheme de ma Ghanafoɔ nyinaa nya apɔmuden dwumadie.',
    'hero.cta': 'Fi Ase',
    'hero.learnMore': 'Sua Pii',
    
    // About
    'about.title': 'Fa NHIS Ho',
    'about.purpose': 'Yɛn Botaeɛ',
    'about.mission': 'Yɛn Dwumadie',
    
    // Services
    'services.title': 'Yɛn Dwumadie',
    'services.registration': 'Kyerɛwtomu & Foforo Yɛ',
    'services.benefits': 'Mfasoɔ',
    'services.claims': 'Claim Processing',
    
    // Member Portal
    'portal.title': 'Member Portal',
    'portal.login': 'Kɔ Mu',
    'portal.logout': 'Pue',
    'portal.welcome': 'Akwaaba',
    'portal.membershipStatus': 'Membashɛp Tebea',
    'portal.claimsHistory': 'Claim Abakɔsɛm',
    'portal.paymentRecords': 'Tua Ka Abakɔsɛm',
    'portal.memberId': 'Member ID',
    'portal.expiryDate': 'Awiei Da',
    'portal.status': 'Tebea',
    'portal.active': 'Edi Dwuma',
    'portal.expired': 'Atwam',
    'portal.pending': 'Ɛretwɛn',
    'portal.amount': 'Sika Dodoɔ',
    'portal.date': 'Da',
    'portal.facility': 'Ayaresabea',
    'portal.service': 'Dwumadie',
    'portal.demoNote': 'Demo Mode: Fa email ne password biara kɔ mu',
    
    // Footer
    'footer.quickLinks': 'Link Ntɛmntɛm',
    'footer.contact': 'Frɛ Yɛn',
    'footer.followUs': 'Di Yɛn Akyi',
    'footer.rights': 'Hokwan nyinaa yɛ yɛn dea',
    
    // Common
    'common.search': 'Hwehwɛ',
    'common.submit': 'Fa Kɔ',
    'common.cancel': 'Gyae',
    'common.loading': 'Ɛrekɔ so...',
  },
  ee: {
    // Navigation - Ewe
    'nav.home': 'Aƒe',
    'nav.membership': 'Membership',
    'nav.services': 'Dɔwɔwɔ',
    'nav.faqs': 'Biabiawɔ',
    'nav.downloads': 'Download',
    'nav.contact': 'Ƒoƒo Mi',
    'nav.getStarted': 'Dze Egɔme',
    'nav.memberPortal': 'Member Portal',
    
    // Hero
    'hero.title': 'Lãme Nyuie Na Ghana Ame Siaa',
    'hero.subtitle': 'National Health Insurance Scheme na Ghana ame siaa le lãme dɔwɔwɔ nyui.',
    'hero.cta': 'Dze Egɔme',
    'hero.learnMore': 'Srɔ̃ Nu Geɖe',
    
    // About
    'about.title': 'Tso NHIS Ŋu',
    'about.purpose': 'Míaƒe Dɔ',
    'about.mission': 'Míaƒe Dɔwɔwɔ',
    
    // Services
    'services.title': 'Míaƒe Dɔwɔwɔ',
    'services.registration': 'Ŋkɔŋlɔ̃ɔ̃ & Yeyeye',
    'services.benefits': 'Viɖe',
    'services.claims': 'Claims Processing',
    
    // Member Portal
    'portal.title': 'Member Portal',
    'portal.login': 'Ge Eme',
    'portal.logout': 'Do Go',
    'portal.welcome': 'Woezo',
    'portal.membershipStatus': 'Membership Nɔnɔme',
    'portal.claimsHistory': 'Claims Xoxo',
    'portal.paymentRecords': 'Fexexe Xoxo',
    'portal.memberId': 'Member ID',
    'portal.expiryDate': 'Nuwuwu Ŋkeke',
    'portal.status': 'Nɔnɔme',
    'portal.active': 'Le Dɔ Wɔm',
    'portal.expired': 'Ewu',
    'portal.pending': 'Le Ncɔm',
    'portal.amount': 'Ga',
    'portal.date': 'Ŋkeke',
    'portal.facility': 'Atikewɔƒe',
    'portal.service': 'Dɔwɔwɔ',
    'portal.demoNote': 'Demo Mode: Zã email kple password ɖesiaɖe ge eme',
    
    // Footer
    'footer.quickLinks': 'Links Kabakaba',
    'footer.contact': 'Ƒoƒo Mi',
    'footer.followUs': 'Dze Míaƒe Yome',
    'footer.rights': 'Mɔɖeɖe katã nye míatɔ',
    
    // Common
    'common.search': 'Dii',
    'common.submit': 'Ɖo Ɖa',
    'common.cancel': 'Dzudzɔ',
    'common.loading': 'Ele Dzɔm...',
  },
  ga: {
    // Navigation
    'nav.home': 'Awe',
    'nav.membership': 'Membership',
    'nav.services': 'Dadebi',
    'nav.faqs': 'Biabia',
    'nav.downloads': 'Download',
    'nav.contact': 'Frɛ Wi',
    'nav.getStarted': 'Dze Ase',
    'nav.memberPortal': 'Member Portal',
    
    // Hero
    'hero.title': 'Hewale Pa Ni Ghana Bii Yɛ',
    'hero.subtitle': 'National Health Insurance Scheme de ma Ghana bii yɛ nya hewale dadebi.',
    'hero.cta': 'Dze Ase',
    'hero.learnMore': 'Sraa Pii',
    
    // About
    'about.title': 'NHIS Ho',
    'about.purpose': 'Yɛ Botae',
    'about.mission': 'Yɛ Dadebi',
    
    // Services
    'services.title': 'Yɛ Dadebi',
    'services.registration': 'Registration & Renewal',
    'services.benefits': 'Mfasodeɛ',
    'services.claims': 'Claims Processing',
    
    // Member Portal
    'portal.title': 'Member Portal',
    'portal.login': 'Kɔ Mu',
    'portal.logout': 'Pue',
    'portal.welcome': 'Ojekoo',
    'portal.membershipStatus': 'Membership Status',
    'portal.claimsHistory': 'Claims History',
    'portal.paymentRecords': 'Payment Records',
    'portal.memberId': 'Member ID',
    'portal.expiryDate': 'Awiei Da',
    'portal.status': 'Status',
    'portal.active': 'Active',
    'portal.expired': 'Expired',
    'portal.pending': 'Pending',
    'portal.amount': 'Sika',
    'portal.date': 'Da',
    'portal.facility': 'Hewale Fie',
    'portal.service': 'Dadebi',
    'portal.demoNote': 'Demo Mode: Fa email kɛ password biara kɔ mu',
    
    // Footer
    'footer.quickLinks': 'Links',
    'footer.contact': 'Frɛ Wi',
    'footer.followUs': 'Follow Wi',
    'footer.rights': 'Rights nyinaa yɛ yɛ dea',
    
    // Common
    'common.search': 'Hwehwɛ',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
