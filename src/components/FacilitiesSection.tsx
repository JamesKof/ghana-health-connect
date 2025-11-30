import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Building2, Hospital, Pill, Search } from 'lucide-react';

const facilityTypes = [
  { icon: Building2, name: 'District Offices', count: '260+', description: 'NHIS offices across all districts' },
  { icon: Hospital, name: 'Partner Hospitals', count: '4000+', description: 'Accredited healthcare facilities' },
  { icon: Pill, name: 'Pharmacies', count: '2500+', description: 'Licensed pharmacies & chemical shops' },
];

const regions = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern',
  'Volta', 'Northern', 'Upper East', 'Upper West', 'Brong Ahafo',
  'Oti', 'Bono East', 'Ahafo', 'Western North', 'Savannah', 'North East'
];

export const FacilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="facilities" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Service Points
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              NHIS Facilities & Service Points
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Access NHIS services at thousands of accredited facilities across all 16 regions of Ghana. 
              From district offices to tertiary hospitals, quality healthcare is always within reach.
            </p>

            {/* Facility Types */}
            <div className="space-y-4 mb-8">
              {facilityTypes.map((facility, index) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-2xl p-5 shadow-card border border-border/50 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-nhis-blue-light flex items-center justify-center flex-shrink-0">
                    <facility.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{facility.count}</span>
                      <span className="font-display font-semibold text-foreground">{facility.name}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{facility.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Search CTA */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">Find a Facility</h4>
                  <p className="text-muted-foreground text-sm">Search for accredited facilities near you</p>
                </div>
              </div>
              <a href="https://www.nhis.gov.gh/providers" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center block">
                Search Facilities
              </a>
            </div>
          </motion.div>

          {/* Right Column - Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border/50">
              {/* Map Visual */}
              <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Interactive Map</p>
                    <p className="text-muted-foreground text-sm">Coming Soon</p>
                  </div>
                </div>
                {/* Decorative pins */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Regions Grid */}
              <div className="p-6">
                <h4 className="font-display font-semibold text-foreground mb-4">All 16 Regions Covered</h4>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map((region, index) => (
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                      className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="text-foreground/80 text-xs font-medium">{region}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
