import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Info, Banknote, Users, Building2, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const fundingSources = [
  { label: 'National Health Insurance Levy (NHIL)', description: '2.5% levy on goods and services collected under the Value Added Tax (VAT)' },
  { label: 'SSNIT Contributions', description: '2.5 percentage points of Social Security and National Insurance Trust (SSNIT) contributions per month' },
  { label: 'NHIF Investments', description: 'Return on National Health Insurance Fund (NHIF) investments' },
  { label: 'Premium Payments', description: 'Premium paid by informal sector subscribers' },
];

const exemptGroups = [
  'Formal sector employees and the self-employed who contribute to the Social Security and National Insurance Trust (SSNIT contributors)',
  'Children (persons under 18 years of age)',
  'Persons in need of ante-natal, delivery and post-natal health care services (pregnant women)',
  'Persons classified by the Minister for Social Welfare as indigents',
  'Categories of differently-abled persons determined by the Minister responsible for Social Welfare',
  'Persons with mental disorder',
  'Pensioners of the Social Security and National Insurance Trust (SSNIT pensioners)',
  'Persons above seventy years of age (the elderly)',
  'Other categories prescribed by the Minister',
];

const healthcareFacilities = [
  'Community-based Health Planning and Services (CHPS)',
  'Maternity homes',
  'Health centres',
  'Clinics',
  'Polyclinics',
  'Primary hospitals (district hospitals, CHAG primary hospitals, quasi-Government primary hospitals and private primary hospitals)',
  'Secondary hospitals',
  'Tertiary hospitals',
  'Pharmacies',
  'Licensed chemical shops',
  'Diagnostic centres',
];

const AboutPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-nhis-green via-nhis-green-light to-nhis-yellow relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative z-10"
        >
          <Breadcrumb />
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Info className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                About NHIS
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                A social intervention program providing financial access to quality healthcare.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Heart className="w-4 h-4" />
                Introduction
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                Brief Introduction to the NHIS
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The National Health Insurance Scheme (NHIS) is a social intervention program introduced by government to provide financial access to quality health care for residents in Ghana.
                </p>
                <p>
                  Government allocation complements the funding of the scheme.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-nhis-green/10 flex items-center justify-center mb-2">
                    <Banknote className="w-6 h-6 text-nhis-green" />
                  </div>
                  <CardTitle className="text-xl">Funding Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fundingSources.map((source, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <h4 className="font-medium text-foreground text-sm">{source.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscriber Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Subscriber Categories
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Who Pays Premium?
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              NHIS subscribers fall into two broad groups: the informal and exempt groups. It is only the informal group that pays premium.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-nhis-green/20 bg-gradient-to-br from-nhis-green/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-nhis-green" />
                    <CardTitle className="text-xl text-nhis-green">Exempt Groups (No Premium)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Members of the exempt group do not pay premium. They are:
                  </p>
                  <ul className="space-y-2">
                    {exemptGroups.map((group, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-nhis-green shrink-0 mt-0.5" />
                        <span>{group}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-nhis-yellow/20 bg-gradient-to-br from-nhis-yellow/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-nhis-yellow" />
                    <CardTitle className="text-xl text-nhis-yellow">Informal Sector (Pays Premium)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Members of the informal sector are required to pay premium to access NHIS benefits.
                  </p>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <p className="text-sm text-foreground">
                      In addition to the premium, subscribers are also required to pay a processing fee or renewal fee for their ID cards, except pregnant women and indigents.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link 
                      to="/membership" 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nhis-yellow/20 text-nhis-yellow hover:bg-nhis-yellow/30 transition-colors font-medium text-sm"
                    >
                      Learn about membership
                      <span>→</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentialed Facilities */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Healthcare Facilities
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Credentialed Healthcare Providers
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              Several categories of health care facilities have been credentialed by the National Health Insurance Authority (NHIA) to provide services to subscribers.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {healthcareFacilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <Building2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">{facility}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Important Referral Note</h4>
                <p className="text-muted-foreground text-sm">
                  You must visit your primary provider first when you fall ill. If necessary, he/she will refer you to a higher level facility. This ensures that regional and teaching hospitals are able to concentrate on more complicated diseases, to reduce overcrowding and ensure quality of care at all levels.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Find Facilities Near You
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
