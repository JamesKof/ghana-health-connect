import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, Gift, FileCheck, RefreshCw, Building2, Pill } from 'lucide-react';

const services = [
  {
    icon: UserPlus,
    title: 'Registration & Renewal',
    description: 'Register as a new member at district offices or through the MyNHIS mobile app. Renewal can be done digitally or at any NHIS office across the country.',
    color: 'bg-primary',
    gradient: 'from-primary to-nhis-blue-light',
  },
  {
    icon: Gift,
    title: 'Benefit Package',
    description: 'Access comprehensive healthcare covering over 95% of disease conditions including outpatient services, inpatient care, maternity services, eye care, and medications.',
    color: 'bg-secondary',
    gradient: 'from-secondary to-nhis-green-light',
  },
  {
    icon: FileCheck,
    title: 'Claims Processing',
    description: 'Healthcare providers submit claims electronically for services rendered to members. NHIA processes and reimburses facilities promptly to ensure continuous care.',
    color: 'bg-accent',
    gradient: 'from-accent to-nhis-yellow-light',
  },
];

const additionalServices = [
  {
    icon: RefreshCw,
    title: 'Annual Renewal',
    description: 'Keep your membership active with easy annual renewals',
  },
  {
    icon: Building2,
    title: 'Facility Network',
    description: 'Access to 4000+ accredited healthcare facilities nationwide',
  },
  {
    icon: Pill,
    title: 'Medicine List',
    description: 'Comprehensive list of covered medications and treatments',
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Core NHIS Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive healthcare coverage designed to meet the needs of every Ghanaian citizen.
          </p>
        </motion.div>

        {/* Main Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              />
              <div className="relative bg-card rounded-3xl p-8 shadow-card card-hover border border-border/50 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    {service.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
