import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Stethoscope, Building, Baby, Eye, Pill, HeartPulse, Syringe, Brain } from 'lucide-react';

const benefits = [
  {
    icon: Stethoscope,
    title: 'Outpatient Services',
    items: [
      'General & specialist consultations',
      'Laboratory investigations & X-rays',
      'Ultrasound scans',
      'HIV/AIDS symptomatic treatment',
      'Day surgical operations',
      'Physiotherapy services',
    ],
  },
  {
    icon: Building,
    title: 'Inpatient Services',
    items: [
      'General & specialist in-patient care',
      'Surgical operations',
      'Cancer treatment (cervical & breast)',
      'Accommodation in general ward',
      'Feeding where available',
      'In-patient physiotherapy',
    ],
  },
  {
    icon: Baby,
    title: 'Maternity Care',
    items: [
      'Antenatal care visits',
      'Normal & assisted deliveries',
      'Caesarean sections',
      'Postnatal care',
      'Management of emergencies',
      'Newborn care services',
    ],
  },
  {
    icon: Eye,
    title: 'Eye Care Services',
    items: [
      'Refraction & visual acuity',
      'Eye infections treatment',
      'Cataract surgery',
      'Glaucoma treatment',
      'Foreign body removal',
      'Eye injury management',
    ],
  },
];

const additionalBenefits = [
  { icon: Pill, title: 'Medications', description: 'Prescription medicines on NHIS list' },
  { icon: HeartPulse, title: 'Emergency Care', description: 'Emergency medical services' },
  { icon: Syringe, title: 'Dental Care', description: 'Basic dental services' },
  { icon: Brain, title: 'Mental Health', description: 'Psychiatric services' },
];

export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="benefits" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Benefits Package
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Coverage for{' '}
            <span className="text-nhis-green">Your Health</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Over 95% of disease conditions that afflict Ghanaians are covered by the NHIS benefit package.
          </p>
        </motion.div>

        {/* Main Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-3xl p-8 shadow-card card-hover border border-border/50"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-nhis-blue-light flex items-center justify-center shadow-lg flex-shrink-0">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">Covered under NHIS</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-primary via-nhis-blue-dark to-secondary rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-display font-semibold text-white mb-1">{benefit.title}</h4>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a href="#registration" className="btn-accent inline-flex items-center gap-2">
            Get Your NHIS Card Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
