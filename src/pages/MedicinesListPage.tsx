import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Pill, Download, Search, Filter, Info } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';

interface Medicine {
  code: string;
  genericName: string;
  unitOfPricing: string;
  price: number;
  levelOfPrescribing: string;
}

const medicinesList: Medicine[] = [
  { code: 'ACETAZIN1', genericName: 'Acetazolamide Injection, 500 mg', unitOfPricing: 'Ampoule', price: 17.16, levelOfPrescribing: 'C' },
  { code: 'ACETAZTA1', genericName: 'Acetazolamide Tablet, 250 mg', unitOfPricing: 'Tablet', price: 0.88, levelOfPrescribing: 'C' },
  { code: 'ACETYLIN1', genericName: 'Acetylcysteine Injection, 200 mg/mL', unitOfPricing: '1 mL', price: 62.98, levelOfPrescribing: 'B1' },
  { code: 'ACETYLTA1', genericName: 'Acetylsalicylic Acid Tablet, 300 mg', unitOfPricing: 'Tablet', price: 0.55, levelOfPrescribing: 'A' },
  { code: 'ACETYLDT1', genericName: 'Acetylsalicylic Acid Tablet, 75 mg (Dispersible)', unitOfPricing: 'Tablet', price: 0.33, levelOfPrescribing: 'B2' },
  { code: 'ACTINOIN1', genericName: 'Actinomycin D Injection 0.5 mg Intravenous', unitOfPricing: 'Vial', price: 205.57, levelOfPrescribing: 'D' },
  { code: 'ACTCHAPO1', genericName: 'Activated Charcoal Powder, 50 g', unitOfPricing: '50 G', price: 38.55, levelOfPrescribing: 'A' },
  { code: 'ACICLOCR1', genericName: 'Acyclovir Cream, 5%', unitOfPricing: '5G', price: 38.50, levelOfPrescribing: 'C' },
  { code: 'ACICLOEO1', genericName: 'Acyclovir Eye Ointment, 3%', unitOfPricing: '2G', price: 52.03, levelOfPrescribing: 'C' },
  { code: 'ACICLOIN1', genericName: 'Acyclovir Injection, 250 mg vial', unitOfPricing: 'Vial', price: 136.13, levelOfPrescribing: 'C' },
  { code: 'ACICLOSU2', genericName: 'Acyclovir Suspension, 200 mg/5 mL', unitOfPricing: '20 mL', price: 276.91, levelOfPrescribing: 'B2' },
  { code: 'ACICLOTA1', genericName: 'Acyclovir Tablet, 200 mg', unitOfPricing: 'Tablet', price: 1.98, levelOfPrescribing: 'B2' },
  { code: 'ADRENAIN1', genericName: 'Adrenaline Injection, 1 mg/1mL (1:1000)', unitOfPricing: '1 mL', price: 7.70, levelOfPrescribing: 'M' },
  { code: 'ADRENAIN2', genericName: 'Adrenaline Injection, 1:10,000', unitOfPricing: 'Vial', price: 6.55, levelOfPrescribing: 'M' },
  { code: 'ADRIAMIN1', genericName: 'Adriamycin Injection, 50 mg', unitOfPricing: 'Vial', price: 172.59, levelOfPrescribing: 'D' },
  { code: 'ALBENDSY1', genericName: 'Albendazole Syrup, 100 mg/5 mL', unitOfPricing: '20 mL', price: 4.10, levelOfPrescribing: 'A' },
  { code: 'ALBENDTA1', genericName: 'Albendazole Tablet, 200 mg', unitOfPricing: 'Tablet', price: 4.68, levelOfPrescribing: 'A' },
  { code: 'ALBENDTA2', genericName: 'Albendazole Tablet, 400 mg', unitOfPricing: 'Tablet', price: 1.17, levelOfPrescribing: 'A' },
  { code: 'ALLOPUTA1', genericName: 'Allopurinol Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.94, levelOfPrescribing: 'B1' },
  { code: 'ALLOPUTA2', genericName: 'Allopurinol Tablet, 300 mg', unitOfPricing: 'Tablet', price: 1.10, levelOfPrescribing: 'B1' },
];

const prescribingLevels = [
  { code: 'A', label: 'Level A - CHPS/Health Centres', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { code: 'B1', label: 'Level B1 - District Hospital', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { code: 'B2', label: 'Level B2 - Polyclinic', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { code: 'C', label: 'Level C - Regional Hospital', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  { code: 'D', label: 'Level D - Teaching Hospital', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  { code: 'M', label: 'Level M - Midwifery', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400' },
];

const getLevelColor = (level: string) => {
  const found = prescribingLevels.find(l => l.code === level);
  return found?.color || 'bg-muted text-muted-foreground';
};

const MedicinesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredMedicines = useMemo(() => {
    return medicinesList.filter(med => {
      const matchesSearch = med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           med.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === 'all' || med.levelOfPrescribing === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, levelFilter]);

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
              <Pill className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
                NHIS Medicines List
              </h1>
              <p className="text-white/80 mt-2 max-w-xl">
                Complete list of medicines covered under the National Health Insurance Scheme.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Download Section */}
      <section className="py-8 bg-muted/30 border-b border-border/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">551</span> medicines in <span className="font-semibold text-foreground">28</span> pages
              </p>
            </div>
            <a
              href="https://www.nhis.gov.gh/files/2025%20NHIS%20ML.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              Download Complete 2025 Medicines List (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Prescribing Levels Legend */}
      <section className="py-8 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Prescribing Level Legend</h3>
            <div className="flex flex-wrap gap-2">
              {prescribingLevels.map((level) => (
                <Badge key={level.code} className={`${level.color} border-0`}>
                  {level.label}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by medicine name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {prescribingLevels.map((level) => (
                  <SelectItem key={level.code} value={level.code}>
                    {level.code} - {level.label.split(' - ')[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Medicines Table */}
      <section className="py-8 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-border/50">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Code</TableHead>
                      <TableHead className="font-semibold">Generic Name</TableHead>
                      <TableHead className="font-semibold">Unit of Pricing</TableHead>
                      <TableHead className="font-semibold text-right">Price (GH₵)</TableHead>
                      <TableHead className="font-semibold text-center">Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicines.length > 0 ? (
                      filteredMedicines.map((medicine, index) => (
                        <TableRow key={medicine.code}>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {medicine.code}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {medicine.genericName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {medicine.unitOfPricing}
                          </TableCell>
                          <TableCell className="text-right font-medium text-foreground">
                            {medicine.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`${getLevelColor(medicine.levelOfPrescribing)} border-0`}>
                              {medicine.levelOfPrescribing}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No medicines found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing {filteredMedicines.length} of {medicinesList.length} medicines (sample data)
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Complete Medicines List</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    This page displays a sample of the NHIS Medicines List. For the complete and up-to-date list of 551 medicines covered under the scheme, please download the official PDF document.
                  </p>
                  <a
                    href="https://www.nhis.gov.gh/files/2025%20NHIS%20ML.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download 2025 Medicines List
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MedicinesListPage;
