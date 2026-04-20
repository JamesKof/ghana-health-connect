import { lazy, Suspense } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';

// Mapbox is huge (~250KB+ gzipped). Lazy-load so it never enters the
// initial bundle and only downloads when the user navigates to /facilities.
const FacilitiesMap = lazy(() =>
  import('@/components/FacilitiesMap').then((m) => ({ default: m.FacilitiesMap })),
);

const FacilitiesPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 bg-gradient-to-br from-primary via-nhis-blue-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <Breadcrumb />
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white">
                Find Facilities
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 max-w-xl">
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
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-[400px] sm:h-[600px] bg-muted/30 rounded-2xl">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading map…</p>
                  </div>
                </div>
              }
            >
              <FacilitiesMap />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-10 sm:py-12 bg-muted/30">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border/50"
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
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border/50"
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
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border/50 sm:col-span-2 lg:col-span-1"
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
