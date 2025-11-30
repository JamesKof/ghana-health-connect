import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface OrgMember {
  name: string;
  title: string;
  image?: string;
}

interface OrgChartProps {
  className?: string;
}

const chiefExecutive: OrgMember = {
  name: 'Dr. Victor Asare Bampoe',
  title: 'Ag. Chief Executive',
  image: 'https://www.nhis.gov.gh/cms/Management/Picture103.jpg',
};

const deputyExecutives: OrgMember[] = [
  {
    name: 'Mr. Raphael Segkpeb',
    title: 'DCE, Admin & HR',
    image: 'https://www.nhis.gov.gh/cms/Management/Mr.-Raphael-Yelfoglo-Segkpeb-.jpg',
  },
  {
    name: 'Dr. Senanu Kwesi Djokoto',
    title: 'DCE, Operations',
    image: 'https://www.nhis.gov.gh/cms/Management/Dr.-Senanu-Kwesi-Djokoto.jpg',
  },
  {
    name: 'Ms. Anatu Anne Seidu Bogobiri',
    title: 'DCE, Finance & Investment',
    image: 'https://www.nhis.gov.gh/cms/Management/3E3A5209_03.jpg',
  },
];

const directorates = {
  adminHR: [
    'Human Resource',
    'Administration',
    'Legal',
    'Corporate Affairs',
    'Infrastructure',
  ],
  operations: [
    'Claims',
    'MIS',
    'Quality Assurance',
    'Strategic Health Purchasing',
    'MRO',
    'Operations',
  ],
  finance: [
    'Financial Accounting',
    'Budget & Management Accounting',
    'Actuarial',
    'Internal Audit',
    'Co-Payment',
  ],
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const OrgCard = ({ member, variant = 'default' }: { member: OrgMember; variant?: 'chief' | 'deputy' | 'default' }) => {
  const sizeClasses = {
    chief: 'p-6',
    deputy: 'p-4',
    default: 'p-3',
  };

  const avatarSizes = {
    chief: 'h-20 w-20',
    deputy: 'h-14 w-14',
    default: 'h-10 w-10',
  };

  return (
    <Card className={`${sizeClasses[variant]} bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300`}>
      <div className="flex flex-col items-center text-center gap-3">
        <Avatar className={avatarSizes[variant]}>
          <AvatarImage src={member.image} alt={member.name} className="object-cover" />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className={`font-semibold text-foreground ${variant === 'chief' ? 'text-lg' : 'text-sm'}`}>
            {member.name}
          </h4>
          <p className={`text-primary ${variant === 'chief' ? 'text-sm' : 'text-xs'} mt-1`}>
            {member.title}
          </p>
        </div>
      </div>
    </Card>
  );
};

const DirectorateList = ({ title, items, color }: { title: string; items: string[]; color: string }) => (
  <div className="space-y-2">
    <h5 className={`text-xs font-semibold ${color} uppercase tracking-wider`}>{title}</h5>
    <div className="space-y-1">
      {items.map((item, index) => (
        <div
          key={index}
          className="text-xs px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
        >
          {item}
        </div>
      ))}
    </div>
  </div>
);

export const OrgChart = ({ className = '' }: OrgChartProps) => {
  return (
    <div className={`${className}`}>
      {/* Board Level */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center mb-4"
      >
        <div className="px-6 py-3 rounded-xl bg-nhis-yellow/20 border border-nhis-yellow/30 text-center">
          <p className="text-sm font-semibold text-foreground">NHIA Governing Board</p>
          <p className="text-xs text-muted-foreground">Policy Direction & Oversight</p>
        </div>
      </motion.div>

      {/* Connector Line */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-border" />
      </div>

      {/* Chief Executive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-4"
      >
        <div className="max-w-xs w-full">
          <OrgCard member={chiefExecutive} variant="chief" />
        </div>
      </motion.div>

      {/* Connector Lines to Deputies */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-3xl">
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border" />
          <div className="absolute top-8 left-1/6 right-1/6 h-0.5 bg-border" />
          <div className="absolute top-8 left-1/6 w-0.5 h-4 bg-border" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-border" />
          <div className="absolute top-8 right-1/6 w-0.5 h-4 bg-border" />
          <div className="h-12" />
        </div>
      </div>

      {/* Deputy Chief Executives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {deputyExecutives.map((deputy, index) => (
          <div key={index} className="flex flex-col items-center">
            <OrgCard member={deputy} variant="deputy" />
          </div>
        ))}
      </motion.div>

      {/* Directorates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/50"
      >
        <DirectorateList
          title="Admin & HR Directorates"
          items={directorates.adminHR}
          color="text-primary"
        />
        <DirectorateList
          title="Operations Directorates"
          items={directorates.operations}
          color="text-nhis-green"
        />
        <DirectorateList
          title="Finance Directorates"
          items={directorates.finance}
          color="text-nhis-yellow"
        />
      </motion.div>
    </div>
  );
};
