import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Stethoscope, TrendingUp, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Our Purpose',
    description: 'To provide financial access to quality healthcare for all residents in Ghana through a sustainable health insurance system.',
  },
  {
    icon: Users,
    title: 'Who We Serve',
    description: 'All Ghanaians including formal sector workers, informal sector, children, pregnant women, elderly, and persons with disabilities.',
  },
  {
    icon: Stethoscope,
    title: 'How It Works',
    description: 'Members register, pay premiums (exempt groups pay nothing), and access healthcare at accredited facilities across all 16 regions.',
  },
  {
    icon: TrendingUp,
    title: 'National Impact',
    description: 'Covering over 95% of disease conditions, reducing out-of-pocket health expenses, and improving health outcomes nationwide.',
  },
];

const exemptGroups = [
  'SSNIT contributors',
  'Children under 18 years',
  'Pregnant women',
  'Persons above 70 years',
  'SSNIT pensioners',
  'Persons with mental disorders',
  'Indigents',
  'Differently-abled persons',
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            About NHIS
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Brief Introduction to the{' '}
            <span className="text-gradient-blue">National Health Insurance Scheme</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The NHIS is a social intervention program introduced by the Government of Ghana 
            to ensure every resident has access to quality healthcare without financial hardship.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border/50"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Funding & Exempt Groups */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Funding Card */}
            <div className="bg-gradient-to-br from-primary to-nhis-blue-dark rounded-3xl p-8 text-white">
              <h3 className="font-display text-xl font-semibold mb-4">How NHIS is Funded</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">2.5% National Health Insurance Levy (NHIL) on VAT</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">2.5% of SSNIT contributions monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">Returns on NHIF investments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">Premiums from informal sector subscribers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">Government budget allocation</span>
                </li>
              </ul>
            </div>

            {/* Exempt Groups Card */}
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Premium-Exempt Groups
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                The following categories of subscribers do not pay any premium:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {exemptGroups.map((group, index) => (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-2 bg-secondary/10 rounded-lg px-3 py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-foreground/80 text-xs font-medium">{group}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
