import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Users, Crown, Building2, Scale, Heart, Landmark, Briefcase, GraduationCap, Stethoscope } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface BoardMember {
  name: string;
  position: string;
}

const boardMembers: BoardMember[] = [
  { name: 'Lawrence Nii Okantey Adjetey', position: 'Chairperson' },
  { name: 'Dr. Victor Asare Bampoe', position: 'Member' },
  { name: 'Dr. Alhassan Iddrisu', position: 'Member' },
  { name: 'Francisca Atuluk', position: 'Member' },
  { name: 'Prof. Samuel Kaba Akoriyea', position: 'Member' },
  { name: 'Dr. Abiba Zakariah', position: 'Member' },
  { name: 'Dr. Koku Awoonor-Williams', position: 'Member' },
  { name: 'Dr. Sadat Bawa', position: 'Member' },
  { name: 'Dr. David Tetteh', position: 'Member' },
  { name: 'Mohammed Adamu Ramadan', position: 'Member' },
  { name: 'Dr. Divine Ndonbi Banyubala', position: 'Member' },
  { name: 'Dr. (Med) Ernest Yorke', position: 'Member' },
  { name: 'Dr. Zanetor Agyeman-Rawlings', position: 'Member' },
  { name: 'Dr. Ken Kwaku Tweneboah Koduah', position: 'Member' },
  { name: 'Pious Kwame Nkuah', position: 'Member' },
  { name: 'Daniella Mavis Abena Mathias', position: 'Member' },
  { name: 'Dr. Bernardette Naa Hoffman', position: 'Member' },
];

const representedBodies = [
  { icon: Heart, name: 'Ministry of Health' },
  { icon: Stethoscope, name: 'Ghana Health Service' },
  { icon: Shield, name: 'National Insurance Commission' },
  { icon: Landmark, name: 'Ministry of Finance' },
  { icon: Scale, name: "Attorney General's Department" },
  { icon: Building2, name: 'Social Security & National Insurance Trust' },
  { icon: Stethoscope, name: 'Medical & Dental Council' },
  { icon: GraduationCap, name: 'Pharmacy Council' },
  { icon: Users, name: 'Organised Labour' },
  { icon: Briefcase, name: 'Accountancy Profession' },
  { icon: Scale, name: 'Legal Profession' },
];

import { Shield } from 'lucide-react';

const BoardPage = () => {
  const chairman = boardMembers[0];
  const members = boardMembers.slice(1);

  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary via-nhis-blue-dark to-nhis-green relative overflow-hidden">
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
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                Governing Board
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                The governing body of the National Health Insurance Authority.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Board Overview */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Crown className="w-4 h-4" />
                Board Structure
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                About the Board
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Board is the governing body of the National Health Insurance Authority. The Board is currently made up of seventeen members, including the Chairman and the Chief Executive Officer of the Authority.
                </p>
                <p>
                  Membership to the Board is drawn from various bodies as set out in Section 3 of the National Health Insurance Act 2003, Act 650.
                </p>
                <div className="p-4 rounded-xl bg-nhis-yellow/10 border border-nhis-yellow/30">
                  <p className="text-foreground font-medium">
                    The President of Ghana appoints the Board Chair.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Chairman Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {chairman.name}
                  </h3>
                  <p className="text-primary font-medium mt-1">{chairman.position}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Appointed by the President of Ghana
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Representation */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-display font-bold text-foreground">
              Board Members Represent
            </h3>
            <p className="text-muted-foreground mt-2">
              Various sectors and institutions across Ghana
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {representedBodies.map((body, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <body.icon className="w-6 h-6 text-primary" />
                <span className="text-xs text-center text-muted-foreground leading-tight">{body.name}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground text-center mt-6"
          >
            Additionally: 2 Health Professionals with expertise in health insurance, 2 Members of National Health Insurance Scheme, and Chief Executive of the Authority.
          </motion.p>
        </div>
      </section>

      {/* Board Members Table */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-green/10 text-nhis-green text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Current Members
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Membership of the Board
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {boardMembers.map((member, index) => (
                    <TableRow 
                      key={index}
                      className={index === 0 ? 'bg-primary/5' : ''}
                    >
                      <TableCell className={`font-medium ${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                        {member.name}
                      </TableCell>
                      <TableCell className={index === 0 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                        {member.position}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BoardPage;
