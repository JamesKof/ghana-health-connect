import { motion } from 'framer-motion';
import { Users, Smartphone, Building2, FileText, CheckCircle2, AlertCircle, UserPlus, RefreshCw } from 'lucide-react';

const enrollmentMethods = [
  {
    title: 'Manual Enrolment',
    subtitle: 'District Office',
    icon: Building2,
    description: 'Visit any NHIS District office for in-person registration and biometric capture.',
    steps: [
      'Visit nearest NHIS District office',
      'Interview to determine category',
      'Provide personal details and Ghana Card',
      'Biometric capture and photograph',
      'Receive membership card instantly',
    ],
  },
  {
    title: 'Digital Enrolment',
    subtitle: 'MyNHIS App',
    icon: Smartphone,
    description: 'Download the MyNHIS app from Google Play or App Store for convenient registration.',
    steps: [
      'Download MyNHIS app',
      'Create account with details',
      'Select membership category',
      'Make payment (if applicable)',
      'Receive digital membership',
    ],
  },
];

const exemptCategories = [
  { category: 'Pregnant Women', proof: 'Antenatal card, doctor\'s note, pregnancy test, or ultrasound report' },
  { category: 'Persons above 70 years', proof: 'Ghana Card showing age' },
  { category: 'Indigents', proof: 'Social welfare assessment' },
  { category: 'Differently-abled persons', proof: 'As determined by Minister responsible for Social Welfare' },
  { category: 'Persons with mental disorders', proof: 'Medical certification' },
  { category: 'SSNIT Contributors', proof: 'Active SSNIT membership proof' },
  { category: 'SSNIT Pensioners (under 70)', proof: 'SSNIT number for verification' },
];

const requiredDocuments = [
  'Full name',
  'Date of birth',
  'Age',
  'Marital status',
  'Mobile phone number(s)',
  'Residential address',
  'Ghana Card details',
];

const renewalInfo = [
  { title: 'Validity', description: 'Membership is valid for 12 months' },
  { title: 'Renewal Methods', description: 'District office, USSD (*929#), or MyNHIS App' },
  { title: 'Grace Period', description: '3 months after expiry to renew without penalty' },
  { title: 'Waiting Period', description: '1 month for defaulters (except exempt categories)' },
];

export const MembershipDetailSection = () => {
  return (
    <section id="membership-detail" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Membership
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            NHIS Membership Guide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about registering, renewing, and managing your NHIS membership.
          </p>
        </motion.div>

        {/* Enrollment Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {enrollmentMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <method.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{method.description}</p>
              <div className="space-y-3">
                {method.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-nhis-green/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-nhis-green">{stepIndex + 1}</span>
                    </div>
                    <span className="text-sm text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Required Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Required Personal Details
          </h3>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Exempt Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Exempt Categories (No Premium Payment)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exemptCategories.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 border border-border hover:border-nhis-green/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-nhis-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">{item.category}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Proof: {item.proof}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Renewal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            <RefreshCw className="w-6 h-6 inline mr-2" />
            Membership Renewal
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {renewalInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/5 to-nhis-green/5 rounded-2xl p-6 border border-primary/20 text-center"
              >
                <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="mt-8 p-4 rounded-xl bg-nhis-yellow/10 border border-nhis-yellow/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-nhis-yellow-dark flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong>Note:</strong> Pregnant women and indigents are exempted from using NHIA digital platforms as payment would be required. Please visit a District office for registration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
