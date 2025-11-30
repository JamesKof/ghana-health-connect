import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ClipboardList, UserCheck, Fingerprint, CreditCard, RefreshCw, ArrowRight, Smartphone } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Registration',
    description: 'Visit a district office or download the MyNHIS App. Complete the registration form with your personal details and Ghana Card information.',
    color: 'from-primary to-nhis-blue-light',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Verification',
    description: 'Your information is verified against national records. Determine your category: paying member or exempt group (pregnant women, elderly, children, etc.).',
    color: 'from-nhis-blue-light to-secondary',
  },
  {
    number: '03',
    icon: Fingerprint,
    title: 'Biometric Capture',
    description: 'Your biometric data is captured and linked to the Ghana Card for secure identification at healthcare facilities.',
    color: 'from-secondary to-nhis-green-light',
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'Card Issuance',
    description: 'Upon successful registration and payment (if applicable), your NHIS membership is activated and linked to your Ghana Card.',
    color: 'from-nhis-green-light to-accent',
  },
  {
    number: '05',
    icon: RefreshCw,
    title: 'Annual Renewal',
    description: 'Renew your membership annually through the MyNHIS App, mobile money, or any NHIS office to maintain uninterrupted healthcare access.',
    color: 'from-accent to-nhis-yellow-light',
  },
];

export const RegistrationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="registration" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            How to Register
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Registration & Renewal Process
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow these simple steps to register or renew your NHIS membership and access quality healthcare across Ghana.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />
          
          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative md:flex md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border/50 ml-16 md:ml-0">
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-muted-foreground">STEP {step.number}</span>
                        <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                    </div>
                    <p className={`text-muted-foreground text-sm leading-relaxed ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
                  {step.number}
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Digital Registration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-primary via-nhis-blue-dark to-secondary rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Register Digitally with MyNHIS App
            </h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Download the MyNHIS mobile app for convenient registration, renewal, and membership management from your smartphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="btn-accent inline-flex items-center justify-center gap-2">
                Download MyNHIS App
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2">
                Find Nearest Office
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
