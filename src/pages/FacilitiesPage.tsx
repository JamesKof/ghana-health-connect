import { PageLayout } from '@/components/PageLayout';
import { FacilitiesMap } from '@/components/FacilitiesMap';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';

const FacilitiesPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary via-nhis-blue-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <Breadcrumb />
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                Find Facilities
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Locate NHIS-accredited healthcare facilities near you across all regions in Ghana.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FacilitiesMap />
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4,000+ Facilities</h3>
              <p className="text-sm text-muted-foreground">
                Access healthcare at over 4,000 NHIS-accredited facilities across Ghana.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-nhis-green/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nhis-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                All facilities are credentialed and meet NHIS quality standards.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-nhis-yellow/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nhis-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-sm text-muted-foreground">
                Many facilities offer round-the-clock emergency services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FacilitiesPage;
