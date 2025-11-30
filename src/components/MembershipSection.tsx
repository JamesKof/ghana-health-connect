import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

const membershipCategories = [
  {
    title: 'Formal Sector',
    subtitle: 'SSNIT Contributors',
    premium: 'No Premium',
    processingFee: 'Yes',
    waitingPeriod: 'None',
    color: 'from-primary to-nhis-blue-light',
    features: [
      'Employed in formal sector',
      'Self-employed SSNIT contributors',
      'Automatic deduction from SSNIT',
      'No annual premium payment',
    ],
  },
  {
    title: 'Informal Sector',
    subtitle: 'Premium Paying Members',
    premium: 'Annual Premium',
    processingFee: 'Yes',
    waitingPeriod: '3 Months',
    color: 'from-secondary to-nhis-green-light',
    features: [
      'Self-employed individuals',
      'Traders and artisans',
      'Annual premium required',
      'Processing fee applies',
    ],
    popular: true,
  },
  {
    title: 'Exempt Groups',
    subtitle: 'No Payments Required',
    premium: 'Free',
    processingFee: 'No',
    waitingPeriod: 'None',
    color: 'from-accent to-nhis-yellow-light',
    features: [
      'Children under 18',
      'Pregnant women',
      'Persons above 70 years',
      'Indigents & persons with disabilities',
    ],
  },
];

export const MembershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="membership" className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Membership
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Membership Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            NHIS subscribers fall into different categories based on their employment status and eligibility. 
            Find out which category applies to you.
          </p>
        </motion.div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {membershipCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative bg-card rounded-3xl overflow-hidden shadow-card card-hover border border-border/50 ${
                category.popular ? 'ring-2 ring-secondary' : ''
              }`}
            >
              {category.popular && (
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Common
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                <h3 className="font-display text-xl font-semibold mb-1">{category.title}</h3>
                <p className="text-white/80 text-sm">{category.subtitle}</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-3xl font-bold">{category.premium}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-medium text-foreground">{category.processingFee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Waiting Period</span>
                    <span className="font-medium text-foreground">{category.waitingPeriod}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm font-medium text-foreground mb-4">Includes:</p>
                  <ul className="space-y-3">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#registration"
                  className={`mt-6 w-full block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    category.popular
                      ? 'bg-secondary text-secondary-foreground hover:shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Register Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-card rounded-2xl p-6 border border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Note:</strong> All members must visit their primary healthcare provider first when ill. 
            If necessary, they will be referred to a higher-level facility to ensure quality care at all levels.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
