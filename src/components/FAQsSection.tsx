import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqCategories = [
  { id: 'registration', label: 'Registration & Renewal' },
  { id: 'benefits', label: 'Benefits & Coverage' },
  { id: 'claims', label: 'Claims & Payments' },
  { id: 'general', label: 'General' },
];

const faqs = [
  {
    category: 'registration',
    question: 'Do I have to register my newborn baby before he/she can be treated under NHIS?',
    answer: 'No, the baby can be treated using the mother\'s NHIS membership card until the child is three months old. However, your child should be registered by the time he/she is three months old.',
  },
  {
    category: 'registration',
    question: 'I registered last year but I have not gone to the hospital the whole year. Will I have to pay anything to get my membership renewed?',
    answer: 'Yes. You must pay your premium and processing fee if applicable annually.',
  },
  {
    category: 'registration',
    question: 'How long do I have to wait to access health care after renewal?',
    answer: 'Renewal of membership is instant, and you can access health care immediately. However, if membership expires for more than Ninety (90) days the member serves a one-month waiting period before he/she can access health care on the NHIS.',
  },
  {
    category: 'registration',
    question: 'Is there any member exempted from the one-month waiting period?',
    answer: 'Yes, the following members are exempted from the waiting period: Above 70 years, Pregnant Women, and Children under 5 years.',
  },
  {
    category: 'registration',
    question: 'Can I renew my membership without going to the district office?',
    answer: 'Yes, you can use the NHIA USSD (*929#) or "MyNHIS" app digital platform if you are a fee-paying member. You may contact the NHIS Call Center for assistance.',
  },
  {
    category: 'benefits',
    question: 'If I must undergo a surgical operation, do I have to pay any fees to the hospital?',
    answer: 'Most surgeries are covered under the NHIS. Where you are not sure, please contact the NHIS customer service desk, the NHIS Call Centre or the District office.',
  },
  {
    category: 'benefits',
    question: 'If I use the amenity ward (VIP ward), will the NHIS pay?',
    answer: 'No. VIP ward accommodation is in the Exclusions List.',
  },
  {
    category: 'benefits',
    question: 'My cousin has been referred for treatment abroad. Would NHIS cover the cost of treatment?',
    answer: 'The NHIS does not cover treatment abroad.',
  },
  {
    category: 'claims',
    question: 'How long does it take to obtain the NHIS membership card after registration?',
    answer: 'Instantly.',
  },
  {
    category: 'general',
    question: 'How long after enrolment can I access health care under the Scheme?',
    answer: 'A new member serves a waiting period of one month before accessing healthcare under the Scheme. However, pregnant women, persons above 70 years and children under five years do not serve any waiting period.',
  },
  {
    category: 'general',
    question: 'I have misplaced my NHIS membership card. How do I get another one?',
    answer: 'Contact the nearest District office with your Ghana card (if any) for a replacement of your card. You will be required to fill a replacement form and pay the requisite processing fee, if applicable.',
  },
  {
    category: 'general',
    question: 'My membership has been linked to my Ghana Card, but I have misplaced my Ghana Card. What should I do?',
    answer: 'Kindly visit the National Identification Authority (NIA) office for a replacement of the Card. However, the linkage to the Ghana Card is still valid.',
  },
];

export const FAQsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('registration');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && (searchTerm === '' || matchesSearch);
  });

  return (
    <section id="faqs" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nhis-green/10 text-nhis-green text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about NHIS membership, benefits, and services.
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
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform',
                    openItems.includes(index) && 'rotate-180'
                  )}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openItems.includes(index) ? 'auto' : 0,
                  opacity: openItems.includes(index) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-muted-foreground">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-br from-primary/10 to-nhis-green/10 rounded-2xl p-8 border border-primary/20 inline-block">
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contact our support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+233302223399"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Center
              </a>
              <a
                href="#contact"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
