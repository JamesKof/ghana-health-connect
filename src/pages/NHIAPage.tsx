import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Building2, Target, Eye, CheckCircle2, Scale, Shield, Users, FileText } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const functions = [
  'Implement, operate and manage the National Health Insurance Scheme',
  'Determine in consultation with the Minister contributions that should be made by members of the National Health Insurance Scheme',
  'Register members of the National Health Insurance Scheme',
  'Register and supervise private health insurance schemes',
  'Issue identity cards to members of the National Health Insurance Scheme',
  'Ensure equity in health care coverage',
  'Ensure access by the poor to healthcare services',
  'Ensure protection of the poor and vulnerable against financial risk',
  'Grant credentials to healthcare providers and facilities that provide healthcare services to members',
  'Manage the National Health Insurance Fund',
  'Provide a decentralised system to receive and resolve complaints by members and healthcare providers',
  'Receive, process and pay claims for services rendered by healthcare providers',
  'Undertake public education on health insurance on its own or in collaboration with other bodies',
  'Make proposals to the Minister for the formulation of policies on health insurance',
  'Undertake programmes that further the sustainability of the National Health Insurance Scheme',
  'Develop guidelines, processes and manuals for the effective implementation and management of the Scheme',
  'Ensure the efficiency and quality of services under the national and private health insurance schemes',
  'Protect the interest of members of private health insurance schemes',
  'Identify and enrol persons exempt from payment of contribution into the National Health Insurance Scheme',
  'Monitor and ensure compliance with this Act and any Regulations, guidelines, policies, processes and manuals made under this Act',
];

const objectives = [
  { icon: Users, text: 'Persons resident in the country' },
  { icon: Users, text: 'Persons not resident in the country but who are on a visit to this country' },
  { icon: Shield, text: 'Provide access to healthcare services to the persons covered by the Scheme' },
];

const NHIAPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-nhis-green via-nhis-green-light to-primary relative overflow-hidden">
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
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                National Health Insurance Authority
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Established under the National Health Insurance Act 2003, Act 650.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Authority's Mandate */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Scale className="w-4 h-4" />
                Authority's Mandate
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                Legal Framework
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The National Health Insurance Authority (NHIA) was established under the National Health Insurance Act 2003, Act 650, as a body corporate, with perpetual succession, an Official Seal, that may sue and be sued in its own name.
                </p>
                <p>
                  As a body corporate, the Authority in the performance of its functions may acquire and hold movable and immovable property and may enter into a contract or any other transaction.
                </p>
                <div className="p-4 rounded-xl bg-nhis-yellow/10 border border-nhis-yellow/30">
                  <p className="text-foreground font-medium">
                    A new law, Act 852 has replaced Act 650 in October 2012 to consolidate the NHIS, remove administrative bottlenecks, introduce transparency, reduce opportunities for corruption and gaming of the system, and make for more effective governance of the schemes.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Object of the Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The object of the Authority is to attain universal health insurance coverage in relation to:
                  </p>
                  <div className="space-y-3">
                    {objectives.map((obj, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <obj.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{obj.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground leading-relaxed">
                    To be a model of a sustainable, progressive and equitable national health insurance scheme in Africa and beyond.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-nhis-green/20 bg-gradient-to-br from-nhis-green/5 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-nhis-green/10 flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-nhis-green" />
                  </div>
                  <CardTitle className="text-xl text-nhis-green">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    To provide financial risk protection against the cost of quality health care for all residents in Ghana and to delight our members and other stakeholders with an enthusiastic, motivated and empathetic professional staff who share the values of honesty and accountability in partnership with all stakeholders.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Functions of the Authority */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-green/10 text-nhis-green text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Regulatory Functions
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Functions of the Authority
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              The object of the Authority is to secure the implementation of a national health insurance policy that ensures access to basic healthcare services to all residents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {functions.map((func, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-nhis-green shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{func}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NHIAPage;
