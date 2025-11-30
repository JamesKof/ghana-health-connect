import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Download, BookOpen, HelpCircle, FileCheck, ScrollText } from 'lucide-react';

const resources = [
  {
    icon: FileText,
    title: 'NHIS Policy Documents',
    description: 'Official policy guidelines and regulatory framework',
    type: 'PDF',
    link: 'https://www.nhis.gov.gh/downloads',
  },
  {
    icon: FileCheck,
    title: 'Registration Forms',
    description: 'Download registration and renewal application forms',
    type: 'PDF',
    link: 'https://www.nhis.gov.gh/downloads',
  },
  {
    icon: ScrollText,
    title: 'Medicines List',
    description: 'Complete list of medications covered under NHIS',
    type: 'PDF',
    link: 'https://www.nhis.gov.gh/medlist',
  },
  {
    icon: BookOpen,
    title: 'Educational Materials',
    description: 'Guides and brochures about NHIS services',
    type: 'PDF',
    link: 'https://www.nhis.gov.gh/downloads',
  },
  {
    icon: HelpCircle,
    title: 'FAQs & Guidelines',
    description: 'Frequently asked questions and user guides',
    type: 'WEB',
    link: 'https://www.nhis.gov.gh/faqs',
  },
  {
    icon: FileText,
    title: 'Claims Guidelines',
    description: 'Provider claims submission guidelines',
    type: 'PDF',
    link: 'https://www.nhis.gov.gh/downloads',
  },
];

export const ResourcesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resources" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Resources
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Policies, Forms & Educational Resources
          </h2>
          <p className="text-muted-foreground text-lg">
            Access official NHIS documents, forms, and educational materials to help you understand and utilize your health insurance benefits.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 shadow-card card-hover border border-border/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <resource.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  resource.type === 'PDF' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {resource.type}
                </span>
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {resource.description}
              </p>
              
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <Download className="w-4 h-4" />
                <span>Download / View</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Visit Downloads Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.nhis.gov.gh/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Resources
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
