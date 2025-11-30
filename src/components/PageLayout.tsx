import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { FloatingBackToTop } from './FloatingBackToTop';
import { USSDWidget } from './USSDWidget';
import { MobileBottomNav } from './MobileBottomNav';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="pb-20 lg:pb-0"
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingWhatsApp phoneNumber="+233544446447" message="Hello! I have a question about NHIS." />
      <FloatingBackToTop />
      <USSDWidget />
      <MobileBottomNav />
    </div>
  );
};
