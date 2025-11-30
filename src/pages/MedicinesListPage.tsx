import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Pill, Download, Search, Filter, Info, ChevronLeft, ChevronRight, FileSpreadsheet, BarChart3 } from 'lucide-react';
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
  category: string;
}

const medicinesList: Medicine[] = [
  // Analgesics & Antipyretics
  { code: 'PARACETA1', genericName: 'Paracetamol Tablet, 500 mg', unitOfPricing: 'Tablet', price: 0.15, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'PARACESY1', genericName: 'Paracetamol Syrup, 120 mg/5 mL', unitOfPricing: '60 mL', price: 3.50, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'PARACEIN1', genericName: 'Paracetamol Injection, 1 g/100 mL', unitOfPricing: 'Vial', price: 18.00, levelOfPrescribing: 'B1', category: 'Analgesics' },
  { code: 'IBUPROFE1', genericName: 'Ibuprofen Tablet, 200 mg', unitOfPricing: 'Tablet', price: 0.20, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'IBUPROFE2', genericName: 'Ibuprofen Tablet, 400 mg', unitOfPricing: 'Tablet', price: 0.30, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'IBUPROFSY', genericName: 'Ibuprofen Suspension, 100 mg/5 mL', unitOfPricing: '100 mL', price: 8.50, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'DICLOFTA1', genericName: 'Diclofenac Tablet, 50 mg', unitOfPricing: 'Tablet', price: 0.25, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'DICLOFIN1', genericName: 'Diclofenac Injection, 75 mg/3 mL', unitOfPricing: 'Ampoule', price: 2.80, levelOfPrescribing: 'B1', category: 'Analgesics' },
  { code: 'TRAMADTA1', genericName: 'Tramadol Tablet, 50 mg', unitOfPricing: 'Tablet', price: 0.45, levelOfPrescribing: 'B1', category: 'Analgesics' },
  { code: 'TRAMADIN1', genericName: 'Tramadol Injection, 100 mg/2 mL', unitOfPricing: 'Ampoule', price: 4.50, levelOfPrescribing: 'B1', category: 'Analgesics' },
  { code: 'MORPHINS1', genericName: 'Morphine Sulphate Injection, 10 mg/mL', unitOfPricing: 'Ampoule', price: 8.50, levelOfPrescribing: 'C', category: 'Analgesics' },
  { code: 'ACETYLTA1', genericName: 'Acetylsalicylic Acid Tablet, 300 mg', unitOfPricing: 'Tablet', price: 0.55, levelOfPrescribing: 'A', category: 'Analgesics' },
  { code: 'ACETYLDT1', genericName: 'Acetylsalicylic Acid Tablet, 75 mg (Dispersible)', unitOfPricing: 'Tablet', price: 0.33, levelOfPrescribing: 'B2', category: 'Analgesics' },
  
  // Antibiotics
  { code: 'AMOXICCA1', genericName: 'Amoxicillin Capsule, 250 mg', unitOfPricing: 'Capsule', price: 0.35, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'AMOXICCA2', genericName: 'Amoxicillin Capsule, 500 mg', unitOfPricing: 'Capsule', price: 0.50, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'AMOXICSY1', genericName: 'Amoxicillin Suspension, 125 mg/5 mL', unitOfPricing: '100 mL', price: 6.50, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'AMOXICSY2', genericName: 'Amoxicillin Suspension, 250 mg/5 mL', unitOfPricing: '100 mL', price: 8.00, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'AMOXCLAV1', genericName: 'Amoxicillin + Clavulanic Acid Tablet, 625 mg', unitOfPricing: 'Tablet', price: 2.50, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'AMOXCLSY1', genericName: 'Amoxicillin + Clavulanic Acid Suspension, 457 mg/5 mL', unitOfPricing: '70 mL', price: 35.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'METRONITA', genericName: 'Metronidazole Tablet, 200 mg', unitOfPricing: 'Tablet', price: 0.18, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'METRONIT2', genericName: 'Metronidazole Tablet, 400 mg', unitOfPricing: 'Tablet', price: 0.28, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'METROINF1', genericName: 'Metronidazole Infusion, 500 mg/100 mL', unitOfPricing: 'Bottle', price: 12.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'CIPROFTA1', genericName: 'Ciprofloxacin Tablet, 500 mg', unitOfPricing: 'Tablet', price: 0.65, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'CIPROFIN1', genericName: 'Ciprofloxacin Infusion, 200 mg/100 mL', unitOfPricing: 'Bottle', price: 18.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'AZITHROM1', genericName: 'Azithromycin Capsule, 250 mg', unitOfPricing: 'Capsule', price: 2.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'AZITHROM2', genericName: 'Azithromycin Tablet, 500 mg', unitOfPricing: 'Tablet', price: 3.50, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'AZITHSUS1', genericName: 'Azithromycin Suspension, 200 mg/5 mL', unitOfPricing: '15 mL', price: 15.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'ERYTHROM1', genericName: 'Erythromycin Tablet, 250 mg', unitOfPricing: 'Tablet', price: 0.45, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'DOXYCYCH1', genericName: 'Doxycycline Capsule, 100 mg', unitOfPricing: 'Capsule', price: 0.35, levelOfPrescribing: 'A', category: 'Antibiotics' },
  { code: 'CEFTRIAX1', genericName: 'Ceftriaxone Injection, 1 g', unitOfPricing: 'Vial', price: 12.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'CEFUROXI1', genericName: 'Cefuroxime Tablet, 500 mg', unitOfPricing: 'Tablet', price: 2.80, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  { code: 'GENTAMIN1', genericName: 'Gentamicin Injection, 80 mg/2 mL', unitOfPricing: 'Ampoule', price: 3.00, levelOfPrescribing: 'B1', category: 'Antibiotics' },
  
  // Antimalarials
  { code: 'ARTLUMEF1', genericName: 'Artemether + Lumefantrine Tablet, 20/120 mg', unitOfPricing: 'Tablet', price: 0.85, levelOfPrescribing: 'A', category: 'Antimalarials' },
  { code: 'ARTLUMEF2', genericName: 'Artemether + Lumefantrine Tablet, 80/480 mg', unitOfPricing: 'Tablet', price: 2.20, levelOfPrescribing: 'A', category: 'Antimalarials' },
  { code: 'ARTESUNA1', genericName: 'Artesunate Injection, 60 mg', unitOfPricing: 'Vial', price: 8.50, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  { code: 'ARTESUNA2', genericName: 'Artesunate Injection, 120 mg', unitOfPricing: 'Vial', price: 15.00, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  { code: 'ARTEMETH1', genericName: 'Artemether Injection, 80 mg/mL', unitOfPricing: 'Ampoule', price: 6.50, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  { code: 'QUININET1', genericName: 'Quinine Sulphate Tablet, 300 mg', unitOfPricing: 'Tablet', price: 0.75, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  { code: 'QUININEI1', genericName: 'Quinine Dihydrochloride Injection, 300 mg/mL', unitOfPricing: '2 mL', price: 4.50, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  { code: 'DIHYDART1', genericName: 'Dihydroartemisinin + Piperaquine Tablet, 40/320 mg', unitOfPricing: 'Tablet', price: 3.20, levelOfPrescribing: 'B1', category: 'Antimalarials' },
  
  // Antihypertensives
  { code: 'AMLODIP1', genericName: 'Amlodipine Tablet, 5 mg', unitOfPricing: 'Tablet', price: 0.25, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'AMLODIP2', genericName: 'Amlodipine Tablet, 10 mg', unitOfPricing: 'Tablet', price: 0.35, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'LISINOP1', genericName: 'Lisinopril Tablet, 5 mg', unitOfPricing: 'Tablet', price: 0.30, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'LISINOP2', genericName: 'Lisinopril Tablet, 10 mg', unitOfPricing: 'Tablet', price: 0.40, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'LOSARTA1', genericName: 'Losartan Tablet, 50 mg', unitOfPricing: 'Tablet', price: 0.45, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'LOSARTA2', genericName: 'Losartan Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.65, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'ATENOLO1', genericName: 'Atenolol Tablet, 50 mg', unitOfPricing: 'Tablet', price: 0.20, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'ATENOLO2', genericName: 'Atenolol Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.30, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'NIFEDIP1', genericName: 'Nifedipine Tablet, 20 mg (Retard)', unitOfPricing: 'Tablet', price: 0.35, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'HYDRCHL1', genericName: 'Hydrochlorothiazide Tablet, 25 mg', unitOfPricing: 'Tablet', price: 0.15, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'FUROSMID1', genericName: 'Furosemide Tablet, 40 mg', unitOfPricing: 'Tablet', price: 0.18, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'FUROSMID2', genericName: 'Furosemide Injection, 20 mg/2 mL', unitOfPricing: 'Ampoule', price: 2.50, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  { code: 'METHYLDO1', genericName: 'Methyldopa Tablet, 250 mg', unitOfPricing: 'Tablet', price: 0.55, levelOfPrescribing: 'B1', category: 'Antihypertensives' },
  
  // Antidiabetics
  { code: 'METFORM1', genericName: 'Metformin Tablet, 500 mg', unitOfPricing: 'Tablet', price: 0.15, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'METFORM2', genericName: 'Metformin Tablet, 850 mg', unitOfPricing: 'Tablet', price: 0.22, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'METFORM3', genericName: 'Metformin Tablet, 1000 mg', unitOfPricing: 'Tablet', price: 0.28, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'GLIBENC1', genericName: 'Glibenclamide Tablet, 5 mg', unitOfPricing: 'Tablet', price: 0.12, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'GLICLAZ1', genericName: 'Gliclazide Tablet, 80 mg', unitOfPricing: 'Tablet', price: 0.35, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'GLIMEPIR1', genericName: 'Glimepiride Tablet, 2 mg', unitOfPricing: 'Tablet', price: 0.40, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'INSULINS1', genericName: 'Insulin Soluble (Regular), 100 IU/mL', unitOfPricing: '10 mL', price: 45.00, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'INSULINI1', genericName: 'Insulin Isophane (NPH), 100 IU/mL', unitOfPricing: '10 mL', price: 45.00, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  { code: 'INSULINM1', genericName: 'Insulin Mixed 30/70, 100 IU/mL', unitOfPricing: '10 mL', price: 48.00, levelOfPrescribing: 'B1', category: 'Antidiabetics' },
  
  // Gastrointestinal
  { code: 'OMEPRAZ1', genericName: 'Omeprazole Capsule, 20 mg', unitOfPricing: 'Capsule', price: 0.45, levelOfPrescribing: 'B1', category: 'Gastrointestinal' },
  { code: 'OMEPRAZ2', genericName: 'Omeprazole Injection, 40 mg', unitOfPricing: 'Vial', price: 15.00, levelOfPrescribing: 'B1', category: 'Gastrointestinal' },
  { code: 'RANITID1', genericName: 'Ranitidine Tablet, 150 mg', unitOfPricing: 'Tablet', price: 0.25, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  { code: 'RANITID2', genericName: 'Ranitidine Injection, 50 mg/2 mL', unitOfPricing: 'Ampoule', price: 3.50, levelOfPrescribing: 'B1', category: 'Gastrointestinal' },
  { code: 'LOPERAMI1', genericName: 'Loperamide Capsule, 2 mg', unitOfPricing: 'Capsule', price: 0.30, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  { code: 'ORALSALT1', genericName: 'Oral Rehydration Salts (ORS)', unitOfPricing: 'Sachet', price: 0.80, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  { code: 'HYOSCINE1', genericName: 'Hyoscine Butylbromide Tablet, 10 mg', unitOfPricing: 'Tablet', price: 0.35, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  { code: 'HYOSCINE2', genericName: 'Hyoscine Butylbromide Injection, 20 mg/mL', unitOfPricing: 'Ampoule', price: 4.00, levelOfPrescribing: 'B1', category: 'Gastrointestinal' },
  { code: 'MAGNESIA1', genericName: 'Magnesium Trisilicate Compound Tablet', unitOfPricing: 'Tablet', price: 0.10, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  { code: 'ALUMHYDR1', genericName: 'Aluminium Hydroxide + Magnesium Hydroxide Suspension', unitOfPricing: '200 mL', price: 8.00, levelOfPrescribing: 'A', category: 'Gastrointestinal' },
  
  // Respiratory
  { code: 'SALBUTA1', genericName: 'Salbutamol Tablet, 4 mg', unitOfPricing: 'Tablet', price: 0.15, levelOfPrescribing: 'A', category: 'Respiratory' },
  { code: 'SALBUTA2', genericName: 'Salbutamol Syrup, 2 mg/5 mL', unitOfPricing: '100 mL', price: 5.50, levelOfPrescribing: 'A', category: 'Respiratory' },
  { code: 'SALBUTA3', genericName: 'Salbutamol Inhaler, 100 mcg/dose', unitOfPricing: '200 doses', price: 12.00, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'SALBUTA4', genericName: 'Salbutamol Nebulising Solution, 5 mg/mL', unitOfPricing: '20 mL', price: 8.00, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'AMINOPHY1', genericName: 'Aminophylline Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.20, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'AMINOPHY2', genericName: 'Aminophylline Injection, 250 mg/10 mL', unitOfPricing: 'Ampoule', price: 5.50, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'PREDNISO1', genericName: 'Prednisolone Tablet, 5 mg', unitOfPricing: 'Tablet', price: 0.18, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'HYDRCORT1', genericName: 'Hydrocortisone Injection, 100 mg', unitOfPricing: 'Vial', price: 8.00, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'BECLOMTH1', genericName: 'Beclomethasone Inhaler, 250 mcg/dose', unitOfPricing: '200 doses', price: 25.00, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'CHLORPHE1', genericName: 'Chlorpheniramine Tablet, 4 mg', unitOfPricing: 'Tablet', price: 0.10, levelOfPrescribing: 'A', category: 'Respiratory' },
  { code: 'CETIRIZI1', genericName: 'Cetirizine Tablet, 10 mg', unitOfPricing: 'Tablet', price: 0.25, levelOfPrescribing: 'A', category: 'Respiratory' },
  
  // Vitamins & Supplements
  { code: 'VITAMINB1', genericName: 'Vitamin B Complex Tablet', unitOfPricing: 'Tablet', price: 0.08, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'VITAMINB2', genericName: 'Vitamin B Complex Injection', unitOfPricing: 'Ampoule', price: 2.50, levelOfPrescribing: 'B1', category: 'Vitamins' },
  { code: 'FOLICAC1', genericName: 'Folic Acid Tablet, 5 mg', unitOfPricing: 'Tablet', price: 0.05, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'FERROSU1', genericName: 'Ferrous Sulphate Tablet, 200 mg', unitOfPricing: 'Tablet', price: 0.08, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'FERROFOL1', genericName: 'Ferrous Sulphate + Folic Acid Tablet', unitOfPricing: 'Tablet', price: 0.10, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'VITAMINA1', genericName: 'Vitamin A Capsule, 200,000 IU', unitOfPricing: 'Capsule', price: 0.50, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'VITAMINC1', genericName: 'Vitamin C Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.08, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'VITAMIND1', genericName: 'Vitamin D3 Tablet, 1000 IU', unitOfPricing: 'Tablet', price: 0.35, levelOfPrescribing: 'B1', category: 'Vitamins' },
  { code: 'MULTIVIT1', genericName: 'Multivitamin Tablet', unitOfPricing: 'Tablet', price: 0.15, levelOfPrescribing: 'A', category: 'Vitamins' },
  { code: 'CALCIUM1', genericName: 'Calcium + Vitamin D Tablet', unitOfPricing: 'Tablet', price: 0.25, levelOfPrescribing: 'A', category: 'Vitamins' },
  
  // Antiretrovirals
  { code: 'TENOLAM1', genericName: 'Tenofovir + Lamivudine Tablet, 300/300 mg', unitOfPricing: 'Tablet', price: 1.20, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'TENOLEF1', genericName: 'Tenofovir + Lamivudine + Efavirenz Tablet, 300/300/600 mg', unitOfPricing: 'Tablet', price: 2.50, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'TENOLDOL1', genericName: 'Tenofovir + Lamivudine + Dolutegravir Tablet, 300/300/50 mg', unitOfPricing: 'Tablet', price: 3.00, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'ZIDOLAM1', genericName: 'Zidovudine + Lamivudine Tablet, 300/150 mg', unitOfPricing: 'Tablet', price: 0.85, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'EFAVIREN1', genericName: 'Efavirenz Tablet, 600 mg', unitOfPricing: 'Tablet', price: 0.95, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'NEVIRAPT1', genericName: 'Nevirapine Tablet, 200 mg', unitOfPricing: 'Tablet', price: 0.45, levelOfPrescribing: 'B1', category: 'Antiretrovirals' },
  { code: 'ATAZANAV1', genericName: 'Atazanavir Capsule, 300 mg', unitOfPricing: 'Capsule', price: 4.50, levelOfPrescribing: 'C', category: 'Antiretrovirals' },
  { code: 'LOPINAVR1', genericName: 'Lopinavir + Ritonavir Tablet, 200/50 mg', unitOfPricing: 'Tablet', price: 2.80, levelOfPrescribing: 'C', category: 'Antiretrovirals' },
  
  // Dermatological
  { code: 'HYDRCRCR1', genericName: 'Hydrocortisone Cream, 1%', unitOfPricing: '15 g', price: 5.50, levelOfPrescribing: 'A', category: 'Dermatological' },
  { code: 'CLOTRIMC1', genericName: 'Clotrimazole Cream, 1%', unitOfPricing: '20 g', price: 4.50, levelOfPrescribing: 'A', category: 'Dermatological' },
  { code: 'MICONAZC1', genericName: 'Miconazole Cream, 2%', unitOfPricing: '15 g', price: 5.00, levelOfPrescribing: 'A', category: 'Dermatological' },
  { code: 'BETAMETH1', genericName: 'Betamethasone Cream, 0.1%', unitOfPricing: '15 g', price: 4.00, levelOfPrescribing: 'B1', category: 'Dermatological' },
  { code: 'WHITFIEL1', genericName: 'Whitfield Ointment (Benzoic Acid + Salicylic Acid)', unitOfPricing: '20 g', price: 3.50, levelOfPrescribing: 'A', category: 'Dermatological' },
  { code: 'CALAMINE1', genericName: 'Calamine Lotion', unitOfPricing: '100 mL', price: 6.00, levelOfPrescribing: 'A', category: 'Dermatological' },
  { code: 'SILVSULF1', genericName: 'Silver Sulphadiazine Cream, 1%', unitOfPricing: '50 g', price: 18.00, levelOfPrescribing: 'B1', category: 'Dermatological' },
  { code: 'PERMETH1', genericName: 'Permethrin Cream, 5%', unitOfPricing: '30 g', price: 8.00, levelOfPrescribing: 'A', category: 'Dermatological' },
  
  // Ophthalmics
  { code: 'CHLORAMP1', genericName: 'Chloramphenicol Eye Drops, 0.5%', unitOfPricing: '10 mL', price: 4.50, levelOfPrescribing: 'A', category: 'Ophthalmics' },
  { code: 'CHLORAMP2', genericName: 'Chloramphenicol Eye Ointment, 1%', unitOfPricing: '4 g', price: 5.00, levelOfPrescribing: 'A', category: 'Ophthalmics' },
  { code: 'GENTAMED1', genericName: 'Gentamicin Eye Drops, 0.3%', unitOfPricing: '5 mL', price: 6.00, levelOfPrescribing: 'B1', category: 'Ophthalmics' },
  { code: 'CIPROEYE1', genericName: 'Ciprofloxacin Eye Drops, 0.3%', unitOfPricing: '5 mL', price: 8.00, levelOfPrescribing: 'B1', category: 'Ophthalmics' },
  { code: 'TETRACYE1', genericName: 'Tetracycline Eye Ointment, 1%', unitOfPricing: '5 g', price: 3.50, levelOfPrescribing: 'A', category: 'Ophthalmics' },
  { code: 'ACICLOEO1', genericName: 'Acyclovir Eye Ointment, 3%', unitOfPricing: '2G', price: 52.03, levelOfPrescribing: 'C', category: 'Ophthalmics' },
  { code: 'TIMOLOL1', genericName: 'Timolol Eye Drops, 0.5%', unitOfPricing: '5 mL', price: 12.00, levelOfPrescribing: 'C', category: 'Ophthalmics' },
  
  // Emergency & Critical Care
  { code: 'ADRENAIN1', genericName: 'Adrenaline Injection, 1 mg/1mL (1:1000)', unitOfPricing: '1 mL', price: 7.70, levelOfPrescribing: 'M', category: 'Emergency' },
  { code: 'ADRENAIN2', genericName: 'Adrenaline Injection, 1:10,000', unitOfPricing: 'Vial', price: 6.55, levelOfPrescribing: 'M', category: 'Emergency' },
  { code: 'ATROPINE1', genericName: 'Atropine Injection, 0.6 mg/mL', unitOfPricing: 'Ampoule', price: 3.50, levelOfPrescribing: 'M', category: 'Emergency' },
  { code: 'DIAZEPAM1', genericName: 'Diazepam Injection, 10 mg/2 mL', unitOfPricing: 'Ampoule', price: 2.80, levelOfPrescribing: 'B1', category: 'Emergency' },
  { code: 'DEXTROSE1', genericName: 'Dextrose 50% Injection, 50 mL', unitOfPricing: 'Vial', price: 8.00, levelOfPrescribing: 'B1', category: 'Emergency' },
  { code: 'MAGNESSI1', genericName: 'Magnesium Sulphate Injection, 50%', unitOfPricing: '10 mL', price: 4.50, levelOfPrescribing: 'B1', category: 'Emergency' },
  { code: 'OXYTOCIN1', genericName: 'Oxytocin Injection, 10 IU/mL', unitOfPricing: 'Ampoule', price: 3.00, levelOfPrescribing: 'M', category: 'Emergency' },
  { code: 'MISOPROS1', genericName: 'Misoprostol Tablet, 200 mcg', unitOfPricing: 'Tablet', price: 1.50, levelOfPrescribing: 'M', category: 'Emergency' },
  
  // Original medicines from list
  { code: 'ACETAZIN1', genericName: 'Acetazolamide Injection, 500 mg', unitOfPricing: 'Ampoule', price: 17.16, levelOfPrescribing: 'C', category: 'Ophthalmics' },
  { code: 'ACETAZTA1', genericName: 'Acetazolamide Tablet, 250 mg', unitOfPricing: 'Tablet', price: 0.88, levelOfPrescribing: 'C', category: 'Ophthalmics' },
  { code: 'ACETYLIN1', genericName: 'Acetylcysteine Injection, 200 mg/mL', unitOfPricing: '1 mL', price: 62.98, levelOfPrescribing: 'B1', category: 'Respiratory' },
  { code: 'ACTINOIN1', genericName: 'Actinomycin D Injection 0.5 mg Intravenous', unitOfPricing: 'Vial', price: 205.57, levelOfPrescribing: 'D', category: 'Oncology' },
  { code: 'ACTCHAPO1', genericName: 'Activated Charcoal Powder, 50 g', unitOfPricing: '50 G', price: 38.55, levelOfPrescribing: 'A', category: 'Emergency' },
  { code: 'ACICLOCR1', genericName: 'Acyclovir Cream, 5%', unitOfPricing: '5G', price: 38.50, levelOfPrescribing: 'C', category: 'Dermatological' },
  { code: 'ACICLOIN1', genericName: 'Acyclovir Injection, 250 mg vial', unitOfPricing: 'Vial', price: 136.13, levelOfPrescribing: 'C', category: 'Antivirals' },
  { code: 'ACICLOSU2', genericName: 'Acyclovir Suspension, 200 mg/5 mL', unitOfPricing: '20 mL', price: 276.91, levelOfPrescribing: 'B2', category: 'Antivirals' },
  { code: 'ACICLOTA1', genericName: 'Acyclovir Tablet, 200 mg', unitOfPricing: 'Tablet', price: 1.98, levelOfPrescribing: 'B2', category: 'Antivirals' },
  { code: 'ADRIAMIN1', genericName: 'Adriamycin Injection, 50 mg', unitOfPricing: 'Vial', price: 172.59, levelOfPrescribing: 'D', category: 'Oncology' },
  { code: 'ALBENDSY1', genericName: 'Albendazole Syrup, 100 mg/5 mL', unitOfPricing: '20 mL', price: 4.10, levelOfPrescribing: 'A', category: 'Anthelmintics' },
  { code: 'ALBENDTA1', genericName: 'Albendazole Tablet, 200 mg', unitOfPricing: 'Tablet', price: 4.68, levelOfPrescribing: 'A', category: 'Anthelmintics' },
  { code: 'ALBENDTA2', genericName: 'Albendazole Tablet, 400 mg', unitOfPricing: 'Tablet', price: 1.17, levelOfPrescribing: 'A', category: 'Anthelmintics' },
  { code: 'ALLOPUTA1', genericName: 'Allopurinol Tablet, 100 mg', unitOfPricing: 'Tablet', price: 0.94, levelOfPrescribing: 'B1', category: 'Musculoskeletal' },
  { code: 'ALLOPUTA2', genericName: 'Allopurinol Tablet, 300 mg', unitOfPricing: 'Tablet', price: 1.10, levelOfPrescribing: 'B1', category: 'Musculoskeletal' },
];

const categories = [
  'All Categories',
  'Analgesics',
  'Antibiotics',
  'Antimalarials',
  'Antihypertensives',
  'Antidiabetics',
  'Gastrointestinal',
  'Respiratory',
  'Vitamins',
  'Antiretrovirals',
  'Dermatological',
  'Ophthalmics',
  'Emergency',
  'Antivirals',
  'Oncology',
  'Anthelmintics',
  'Musculoskeletal',
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

const ITEMS_PER_PAGE = 20;

const MedicinesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMedicines = useMemo(() => {
    return medicinesList.filter(med => {
      const matchesSearch = med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           med.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === 'all' || med.levelOfPrescribing === levelFilter;
      const matchesCategory = categoryFilter === 'All Categories' || med.category === categoryFilter;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, levelFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);
  const paginatedMedicines = filteredMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const stats = useMemo(() => {
    const byLevel = prescribingLevels.map(level => ({
      ...level,
      count: medicinesList.filter(m => m.levelOfPrescribing === level.code).length
    }));
    const avgPrice = medicinesList.reduce((sum, m) => sum + m.price, 0) / medicinesList.length;
    return { byLevel, avgPrice, total: medicinesList.length };
  }, []);

  const exportToCSV = () => {
    const headers = ['Code', 'Generic Name', 'Unit of Pricing', 'Price (GH₵)', 'Level', 'Category'];
    const rows = filteredMedicines.map(m => [
      m.code,
      m.genericName,
      m.unitOfPricing,
      m.price.toFixed(2),
      m.levelOfPrescribing,
      m.category
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nhis-medicines-list.csv';
    a.click();
  };

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

      {/* Quick Stats */}
      <section className="py-8 bg-muted/30 border-b border-border/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Medicines</div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-nhis-green">{categories.length - 1}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-nhis-yellow">GH₵{stats.avgPrice.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Average Price</div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{prescribingLevels.length}</div>
                <div className="text-sm text-muted-foreground">Prescribing Levels</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download & Export Section */}
      <section className="py-6 bg-background border-b border-border/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">551</span> medicines in <span className="font-semibold text-foreground">28</span> pages (official PDF)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <a
                href="https://www.nhis.gov.gh/files/2025%20NHIS%20ML.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Official PDF
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prescribing Levels Legend */}
      <section className="py-6 bg-muted/30">
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
                  {level.label} ({stats.byLevel.find(l => l.code === level.code)?.count || 0})
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-background sticky top-16 z-10 border-b border-border/50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by medicine name or code..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={handleFilterChange(setCategoryFilter)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={handleFilterChange(setLevelFilter)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Level" />
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
                      <TableHead className="font-semibold hidden md:table-cell">Category</TableHead>
                      <TableHead className="font-semibold">Unit</TableHead>
                      <TableHead className="font-semibold text-right">Price (GH₵)</TableHead>
                      <TableHead className="font-semibold text-center">Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMedicines.length > 0 ? (
                      paginatedMedicines.map((medicine) => (
                        <TableRow key={medicine.code} className="hover:bg-muted/30">
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {medicine.code}
                          </TableCell>
                          <TableCell className="font-medium text-foreground">
                            {medicine.genericName}
                          </TableCell>
                          <TableCell className="text-muted-foreground hidden md:table-cell">
                            <Badge variant="outline" className="text-xs">{medicine.category}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
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
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No medicines found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredMedicines.length)} of {filteredMedicines.length} medicines
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Complete Medicines List</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    This page displays {medicinesList.length} medicines from the NHIS Medicines List. For the complete and up-to-date list of 551 medicines covered under the scheme, please download the official PDF document.
                  </p>
                  <a
                    href="https://www.nhis.gov.gh/files/2025%20NHIS%20ML.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Download 2025 Medicines List
                    </Button>
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
