import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/ui/card';

interface ExecutiveProps {
  name: string;
  title: string;
  image: string;
}

interface DirectorProps {
  name: string;
  title: string;
}

const executives: ExecutiveProps[] = [
  {
    name: 'Dr. Victor Asare Bampoe',
    title: 'Ag. Chief Executive',
    image: 'https://www.nhis.gov.gh/cms/Management/Picture103.jpg',
  },
  {
    name: 'Mr Raphael Segkpeb',
    title: 'Deputy Chief Executive, Admin & HR',
    image: 'https://www.nhis.gov.gh/cms/Management/Mr.-Raphael-Yelfoglo-Segkpeb-.jpg',
  },
  {
    name: 'Ms. Anatu Anne Seidu Bogobiri',
    title: 'Deputy Chief Executive, Finance & Investment',
    image: 'https://www.nhis.gov.gh/cms/Management/3E3A5209_03.jpg',
  },
  {
    name: 'Dr. Senanu Kwesi Djokoto',
    title: 'Deputy Chief Executive, Operations',
    image: 'https://www.nhis.gov.gh/cms/Management/Dr.-Senanu-Kwesi-Djokoto.jpg',
  },
];

const directors: DirectorProps[] = [
  { name: 'Dr. Gustav Cruickshank', title: 'Director, Financial Accounting' },
  { name: 'Dr. Francis Asenso-Boadi', title: 'Director, Special Project' },
  { name: 'Mr. Ahmed Imoro', title: 'Director, Special Project' },
  { name: 'Mr Hudu Issah', title: 'Director, Special Project' },
  { name: 'Mr. Prince Appiah Debrah', title: 'Ag. Director, Internal Audit' },
  { name: 'Mr. Francis Oti Frempong', title: 'Director, Special Project' },
  { name: 'Dr. Mrs. Ruby Aileen Mensah Annan', title: 'Director, Strategic Health Purchasing' },
  { name: 'Mr. Magnus Owusu-Agyemang', title: 'Director, Actuarial' },
  { name: 'Mr. Raymond Avinu', title: 'Director, Administration' },
  { name: 'Annette Obenewaa Adutwum', title: 'Director, Legal' },
  { name: 'Dr. Yaw Opoku-Boateng', title: 'Director, Co-Payment Taskforce' },
  { name: 'Mrs. Eva Okai', title: 'Director, Management Systems and Control' },
  { name: 'Mr. Gingong Anthony Bueteem', title: 'Senior Director, Operations (Mahama Care)' },
  { name: 'Mr. Richard Agyemang Badu', title: 'Ag. Director, Budget and Management Accounting' },
  { name: 'Mr. Daniel Blankson', title: 'Ag. Director, Co-Payment' },
  { name: 'Mr. Oswald Essuah-Mensah', title: 'Ag. Director, Corporate Affairs' },
  { name: 'Dr. Abigail Derkyi-Kwarteng', title: 'Ag. Director, Claims' },
  { name: 'Mr. Harold Boateng', title: 'Board Secretary' },
  { name: 'Mr. Akonde Isaac Gideon', title: 'Ag. Director, Co-Payment' },
  { name: 'Mr. Alagpulinsa Sebastian', title: 'Ag. Director, MRO' },
  { name: 'Mrs. Anaab-Bisi Lydia Abonopo', title: 'Ag. Director, Quality Assurance' },
  { name: 'Miss. Auch Angela Dedenamo', title: 'Ag. Human Resource' },
  { name: 'Mr. Kaleo-Bioh Vitus Gundona', title: 'Ag. Director, MIS' },
  { name: 'Mrs. Musah Mariam Alhassan', title: 'Ag. Director, Operations' },
  { name: 'Mr Odoi Victor Emmanuel', title: 'Ag. Director, Special Project' },
  { name: 'Mr. Omane-Adjekum William', title: 'Ag. Director, PHIS' },
  { name: 'Mr Suleymana Abass', title: 'Ag. Director, RPM & E' },
  { name: 'Mr. Zankawah Baba Sadique K', title: 'Ag. Director, Infrastructure' },
];

const ExecutiveCard = ({ name, title, image }: ExecutiveProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Card className="overflow-hidden group hover:shadow-card transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="font-display font-semibold text-foreground text-lg">{name}</h3>
        <p className="text-sm text-primary mt-1">{title}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const DirectorCard = ({ name, title }: DirectorProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
  >
    <h4 className="font-medium text-foreground">{name}</h4>
    <p className="text-sm text-muted-foreground mt-1">{title}</p>
  </motion.div>
);

const ManagementPage = () => {
  return (
    <PageLayout>
      {/* Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary via-nhis-blue-dark to-primary relative overflow-hidden">
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
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                Management Team
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                The Management is headed by a Chief Executive and three Deputy Chief Executives.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Executive Leadership */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Executive Leadership
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our executive team provides strategic direction and oversees the operations of the National Health Insurance Authority.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((exec, index) => (
              <ExecutiveCard key={index} {...exec} />
            ))}
          </div>
        </div>
      </section>

      {/* Deputy Chief Executives Structure */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: '1', title: 'Deputy Chief Executive – Admin. & HR' },
              { num: '2', title: 'Deputy Chief Executive – Operations' },
              { num: '3', title: 'Deputy Chief Executive – Finance & Investment' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {item.num}
                </div>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Directors & Department Heads
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Our Leadership Team
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Directors overseeing various departments and functions across the organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {directors.map((director, index) => (
              <DirectorCard key={index} {...director} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ManagementPage;
