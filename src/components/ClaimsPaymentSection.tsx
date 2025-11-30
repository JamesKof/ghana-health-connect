import { motion } from 'framer-motion';
import { CreditCard, Search, Building2, Calendar, DollarSign, FileText, Filter } from 'lucide-react';
import { useState } from 'react';

const sampleClaims = [
  { facility: '37 Military Hospital', district: 'Accra', amount: 943187.68, claimMonth: 'Mar 2025', paymentDate: '27 Aug 2025' },
  { facility: 'Korle Bu Teaching Hospital', district: 'Accra', amount: 1250340.50, claimMonth: 'Apr 2025', paymentDate: '27 Aug 2025' },
  { facility: 'Komfo Anokye Teaching Hospital', district: 'Kumasi', amount: 892450.30, claimMonth: 'Mar 2025', paymentDate: '27 Aug 2025' },
  { facility: 'Cape Coast Teaching Hospital', district: 'Cape Coast', amount: 456780.25, claimMonth: 'Apr 2025', paymentDate: '27 Aug 2025' },
  { facility: 'Tamale Teaching Hospital', district: 'Tamale', amount: 324560.80, claimMonth: 'May 2025', paymentDate: '27 Aug 2025' },
  { facility: 'Ho Municipal Hospital', district: 'Ho', amount: 187650.45, claimMonth: 'Apr 2025', paymentDate: '27 Aug 2025' },
];

const categories = [
  { name: 'Public/Quasi-Public/Mission', count: 4200, icon: Building2 },
  { name: 'Private Facilities', count: 3500, icon: FileText },
];

export const ClaimsPaymentSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredClaims = sampleClaims.filter(claim =>
    claim.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="claims-payment" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            Claims Payment
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Provider Claims Payment Status
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track and view claims payment information for NHIS-accredited healthcare providers across Ghana.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedCategory === category.name 
                  ? 'bg-primary/10 border-primary' 
                  : 'bg-card border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} facilities</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search facility or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Claims Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Facility Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">District</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Amount Paid (GH₵)</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Claim Month</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClaims.map((claim, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{claim.facility}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{claim.district}</td>
                    <td className="px-6 py-4 text-sm text-foreground text-right font-mono">
                      {claim.amount.toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{claim.claimMonth}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{claim.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredClaims.length} of 93,136 results
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-border bg-card text-sm hover:bg-muted transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg border border-border bg-card text-sm hover:bg-muted transition-colors">
                Next
              </button>
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-4 rounded-xl bg-nhis-yellow/10 border border-nhis-yellow/30"
        >
          <p className="text-sm text-foreground">
            <strong>Note:</strong> For complete claims payment data and real-time updates, please visit the official{' '}
            <a href="https://www.nhis.gov.gh/payments" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              NHIS Claims Payment Portal
            </a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
