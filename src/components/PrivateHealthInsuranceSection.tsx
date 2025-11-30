import { motion } from 'framer-motion';
import { Shield, Building2, FileCheck, Users, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

const privateSchemesBenefits = [
  'Additional coverage beyond NHIS benefits',
  'Access to private wards and amenities',
  'Shorter waiting times at partner facilities',
  'Coverage for exclusions under NHIS',
  'International treatment coverage options',
  'Executive health screening packages',
];

const registrationRequirements = [
  {
    title: 'Company Registration',
    description: 'Valid certificate of incorporation or registration',
    icon: Building2,
  },
  {
    title: 'License Application',
    description: 'Submit application to NHIA for private health insurance license',
    icon: FileCheck,
  },
  {
    title: 'Capital Requirements',
    description: 'Meet minimum capital and solvency requirements',
    icon: Shield,
  },
  {
    title: 'Operational Setup',
    description: 'Establish claims processing and member management systems',
    icon: Users,
  },
];

const licensedSchemes = [
  'Nationwide Medical Insurance',
  'Premier Health Insurance',
  'Acacia Health Insurance',
  'Cosmopolitan Health Insurance',
  'Apex Health Insurance',
  'Ghana Union Assurance',
];

export const PrivateHealthInsuranceSection = () => {
  return (
    <section id="private-health-insurance" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Private Health Insurance
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Private Health Insurance Schemes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Licensed private health insurance schemes regulated by the National Health Insurance Authority, offering enhanced coverage options.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Benefits of Private Schemes
            </h3>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="space-y-4">
                {privateSchemesBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-nhis-green flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Licensed Schemes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Licensed Private Schemes
            </h3>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="grid grid-cols-1 gap-3">
                {licensedSchemes.map((scheme, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{scheme}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * This is a sample list. Contact NHIA for the complete list of licensed schemes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Registration Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-10">
            How to Register a Private Health Insurance Scheme
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {registrationRequirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 border border-border h-full hover:shadow-card transition-all text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <req.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-nhis-green text-white flex items-center justify-center font-bold mx-auto mb-3 text-sm">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{req.title}</h4>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                </div>
                {index < registrationRequirements.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-muted-foreground/50 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-primary/10 to-nhis-green/10 rounded-2xl p-8 border border-primary/20 inline-block">
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Interested in Private Health Insurance?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Contact the NHIA for more information on licensing requirements and application procedures.
            </p>
            <a
              href="https://www.nhis.gov.gh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Learn More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
