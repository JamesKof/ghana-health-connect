import { motion } from 'framer-motion';
import { Download, FileText, Book, FileSpreadsheet, Image, File, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

const downloadCategories = [
  { id: 'all', label: 'All' },
  { id: 'forms', label: 'Forms' },
  { id: 'tariffs', label: 'Tariffs' },
  { id: 'policies', label: 'Policies' },
  { id: 'brochures', label: 'Brochures' },
];

const downloads = [
  {
    title: 'Creation and Credentialing Applications',
    category: 'forms',
    type: 'PDF',
    size: '2.4 MB',
    url: 'https://www.nhis.gov.gh/Files/CREATION%20AND%20CREDENTIALING%20APPLICATIONS.pdf',
    icon: FileText,
  },
  {
    title: '20th Anniversary Brochure',
    category: 'brochures',
    type: 'PDF',
    size: '5.8 MB',
    url: 'https://www.nhis.gov.gh/Files/NHIA%2020%20Anniversary%20Brochure.pdf',
    icon: Image,
  },
  {
    title: 'Tariffs Operation Manual v22',
    category: 'tariffs',
    type: 'PDF',
    size: '1.2 MB',
    url: 'https://www.nhis.gov.gh/files/TARIFFS%20OPERATION%20MANUAL%20v22.pdf',
    icon: Book,
  },
  {
    title: 'CHAG Primary Hospital (Catering Exclusive)',
    category: 'tariffs',
    type: 'PDF',
    size: '890 KB',
    url: 'https://www.nhis.gov.gh/files/CHAG%20Primary%20Hospital%20(Catering%20Exclusive).pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'CHAG Primary Hospital (Catering Inclusive)',
    category: 'tariffs',
    type: 'PDF',
    size: '920 KB',
    url: 'https://www.nhis.gov.gh/files/CHAG%20Primary%20Hospital%20(Catering%20Inclusive).pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Tariff for CHAG Health Centre and Clinic',
    category: 'tariffs',
    type: 'PDF',
    size: '780 KB',
    url: 'https://www.nhis.gov.gh/files/Tariff%20for%20CHAG%20Health%20Centre%20and%20Clinic.pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Private Health Centre & Maternity Home',
    category: 'tariffs',
    type: 'PDF',
    size: '850 KB',
    url: 'https://www.nhis.gov.gh/files/Private%20Health%20Centre%20&%20Maternity%20Home.pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Private Primary Care (Catering Exclusive)',
    category: 'tariffs',
    type: 'PDF',
    size: '760 KB',
    url: 'https://www.nhis.gov.gh/files/Private%20Primary%20Care%20(Catering%20Exclusive).pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Private Primary Care (Catering Inclusive)',
    category: 'tariffs',
    type: 'PDF',
    size: '780 KB',
    url: 'https://www.nhis.gov.gh/files/Private%20Primary%20Care%20(Catering%20Inclusive).pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Tariff for Dental Centres',
    category: 'tariffs',
    type: 'PDF',
    size: '540 KB',
    url: 'https://www.nhis.gov.gh/files/Tariff%20for%20Dental%20Centres.pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Tariff for Diagnostic Centre',
    category: 'tariffs',
    type: 'PDF',
    size: '620 KB',
    url: 'https://www.nhis.gov.gh/files/Tariff%20for%20Diagnostic%20Centre.pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'Tariff for Eye Centres',
    category: 'tariffs',
    type: 'PDF',
    size: '480 KB',
    url: 'https://www.nhis.gov.gh/files/Tariff%20for%20Eye%20Centres.pdf',
    icon: FileSpreadsheet,
  },
  {
    title: 'NHIS Mobile Renewal Guide',
    category: 'brochures',
    type: 'PDF',
    size: '1.5 MB',
    url: 'https://www.nhis.gov.gh/files/NHIS%20Mobile_Renewal_Information_Pack_and_Guide.pdf',
    icon: Book,
  },
  {
    title: 'Non-Biometric Authentication Form',
    category: 'forms',
    type: 'PDF',
    size: '320 KB',
    url: 'https://www.nhis.gov.gh/files/non_biometric_authentication_form.pdf',
    icon: FileText,
  },
  {
    title: 'NHIS ACT 852',
    category: 'policies',
    type: 'PDF',
    size: '1.8 MB',
    url: 'https://www.nhis.gov.gh/files/NHIS_Act_852.pdf',
    icon: Book,
  },
  {
    title: 'NHIS Medicines List',
    category: 'policies',
    type: 'PDF',
    size: '2.1 MB',
    url: 'https://www.nhis.gov.gh/files/NHIS_MEDICINES_LIST.pdf',
    icon: File,
  },
];

export const DownloadsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDownloads = downloads.filter(download => {
    const matchesCategory = selectedCategory === 'all' || download.category === selectedCategory;
    const matchesSearch = download.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && (searchTerm === '' || matchesSearch);
  });

  return (
    <section id="downloads" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-yellow/10 text-nhis-yellow-dark text-sm font-medium mb-4">
            <Download className="w-4 h-4" />
            Downloads
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Forms, Policies & Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access official NHIS documents, tariff schedules, forms, and educational resources.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {downloadCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Downloads Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDownloads.map((download, index) => (
            <motion.a
              key={download.title}
              href={download.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-card transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <download.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {download.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-muted text-xs font-medium">
                      {download.type}
                    </span>
                    <span>{download.size}</span>
                  </div>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.nhis.gov.gh/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Downloads
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
