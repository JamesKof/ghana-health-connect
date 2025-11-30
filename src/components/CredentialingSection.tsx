import { motion } from 'framer-motion';
import { Award, CheckCircle2, FileCheck, Globe, UserCheck, Building2, ArrowRight, ExternalLink } from 'lucide-react';

const credentialingSteps = [
  {
    step: 1,
    title: 'Visit the Portal',
    description: 'Go to credentialing.nhia.gov.gh and click on "Request Account" on the login page.',
    icon: Globe,
  },
  {
    step: 2,
    title: 'Provide Information',
    description: 'Enter officer details, official email, and select insurance type (NHIS or PHIS or both).',
    icon: UserCheck,
  },
  {
    step: 3,
    title: 'Facility Details',
    description: 'Indicate if credentialed or non-credentialed. Provide Health Provider Code if existing facility.',
    icon: Building2,
  },
  {
    step: 4,
    title: 'Submit Application',
    description: 'Complete all required fields and submit for review by NHIA Management.',
    icon: FileCheck,
  },
  {
    step: 5,
    title: 'Receive Credential',
    description: 'Upon approval, receive your facility credential and begin serving NHIS members.',
    icon: Award,
  },
];

const requirements = [
  'Valid facility license from appropriate regulatory body',
  'Proof of facility ownership or lease agreement',
  'List of qualified medical personnel',
  'Evidence of functional medical equipment',
  'Valid tax identification number (TIN)',
  'Bank account details for claims payment',
];

const insuranceTypes = [
  {
    name: 'National Health Insurance Scheme (NHIS)',
    description: 'Government-backed health insurance covering all residents of Ghana.',
    color: 'primary',
  },
  {
    name: 'Private Health Insurance Schemes (PHIS)',
    description: 'Licensed private insurance schemes regulated by NHIA.',
    color: 'nhis-green',
  },
];

export const CredentialingSection = () => {
  return (
    <section id="credentialing" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-yellow/10 text-nhis-yellow-dark text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Provider Credentialing
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Become an NHIS Accredited Provider
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The NHIA has streamlined the credentialing process through an online platform for healthcare providers seeking to join the scheme.
          </p>
        </motion.div>

        {/* Insurance Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {insuranceTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border border-border bg-card hover:shadow-card transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl bg-${type.color}/10 flex items-center justify-center mb-4`}>
                <Award className={`w-6 h-6 text-${type.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{type.name}</h3>
              <p className="text-muted-foreground">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Credentialing Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-10">
            Online Credentialing Process
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {credentialingSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 border border-border h-full hover:shadow-card transition-all">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < credentialingSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-muted-foreground/50 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Basic Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-green flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{req}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-nhis-green/10 rounded-2xl p-8 border border-primary/20"
          >
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Ready to Get Credentialed?
            </h3>
            <p className="text-muted-foreground mb-6">
              Start your online credentialing application today. The process is streamlined and can be completed entirely online.
            </p>
            <a
              href="https://www.credentialing.nhia.gov.gh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start Application
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
