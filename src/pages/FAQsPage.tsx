import { PageLayout } from '@/components/PageLayout';
import { FAQsSection } from '@/components/FAQsSection';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQsPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-nhis-green via-nhis-green-light to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">FAQs</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                Frequently Asked Questions
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Find answers to common questions about NHIS.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      
      <FAQsSection />
    </PageLayout>
  );
};

export default FAQsPage;
