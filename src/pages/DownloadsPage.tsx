import { PageLayout } from '@/components/PageLayout';
import { DownloadsSection } from '@/components/DownloadsSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DownloadsPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-nhis-yellow via-nhis-yellow-light to-nhis-green relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <div className="flex items-center gap-2 text-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">Downloads</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-foreground/10 flex items-center justify-center">
              <Download className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                Downloads & Resources
              </h1>
              <p className="text-foreground/80 mt-2 max-w-xl">
                Access official forms, policies, tariffs, and educational materials.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      
      <DownloadsSection />
      <ResourcesSection />
    </PageLayout>
  );
};

export default DownloadsPage;
