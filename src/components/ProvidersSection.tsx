import { motion } from 'framer-motion';
import { Hospital, MapPin, Search, Filter, Building, Stethoscope, Pill, Eye } from 'lucide-react';
import { useState } from 'react';

const regions = [
  'All Regions',
  'Greater Accra Region',
  'Ashanti Region',
  'Central Region',
  'Eastern Region',
  'Western Region',
  'Northern Region',
  'Volta Region',
  'Brong Ahafo Region',
  'Upper East Region',
  'Upper West Region',
];

const providerTypes = [
  { name: 'Hospitals', icon: Hospital, count: 1250 },
  { name: 'Clinics', icon: Building, count: 3400 },
  { name: 'Pharmacies', icon: Pill, count: 2100 },
  { name: 'Diagnostic Centers', icon: Stethoscope, count: 450 },
  { name: 'Eye Care Centers', icon: Eye, count: 180 },
];

const sampleProviders = [
  { name: 'Korle Bu Teaching Hospital', type: 'Hospital', region: 'Greater Accra Region', district: 'Accra', status: 'Active' },
  { name: 'Komfo Anokye Teaching Hospital', type: 'Hospital', region: 'Ashanti Region', district: 'Kumasi', status: 'Active' },
  { name: '37 Military Hospital', type: 'Hospital', region: 'Greater Accra Region', district: 'Accra', status: 'Active' },
  { name: 'Ridge Hospital', type: 'Hospital', region: 'Greater Accra Region', district: 'Accra', status: 'Active' },
  { name: 'Cape Coast Teaching Hospital', type: 'Hospital', region: 'Central Region', district: 'Cape Coast', status: 'Active' },
  { name: 'Tamale Teaching Hospital', type: 'Hospital', region: 'Northern Region', district: 'Tamale', status: 'Active' },
];

export const ProvidersSection = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section id="providers" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-green/10 text-nhis-green text-sm font-medium mb-4">
            <Hospital className="w-4 h-4" />
            Healthcare Providers
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            NHIS Accredited Providers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find NHIS-accredited healthcare facilities near you. Over 7,000 providers across Ghana ready to serve you.
          </p>
        </motion.div>

        {/* Provider Type Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {providerTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-card transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <type.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{type.name}</h3>
              <p className="text-2xl font-bold text-primary">{type.count.toLocaleString()}</p>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by facility name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full md:w-64 pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sampleProviders.map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Hospital className="w-6 h-6 text-primary" />
                </div>
                <span className="px-3 py-1 rounded-full bg-nhis-green/10 text-nhis-green text-xs font-medium">
                  {provider.status}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{provider.name}</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {provider.type}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {provider.district}, {provider.region}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://www.nhis.gov.gh/providers"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Providers
            <MapPin className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
