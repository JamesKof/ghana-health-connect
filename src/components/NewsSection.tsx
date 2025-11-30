import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const newsItems = [
  {
    title: 'Stakeholders Commend NHIA on New Tariff Review',
    excerpt: 'Healthcare stakeholders have expressed satisfaction with the new tariff review by NHIA...',
    date: '2024',
    image: 'https://www.nhis.gov.gh/cms/News/website%20pictures%20-stake%20tariff.jpg',
    link: 'https://www.nhis.gov.gh/News/stakeholders-commend-nhia-on-new-tariff-review--6031',
  },
  {
    title: 'It is possible to attain UHC by 2026 - Director MRO',
    excerpt: 'The Director of Membership and Regional Operations believes Ghana can achieve Universal Health Coverage...',
    date: '2024',
    image: 'https://www.nhis.gov.gh/cms/News/website%20pictures%20-%20mro%20wn.jpg',
    link: 'https://www.nhis.gov.gh/News/it-is-possible-to-attain-uhc-by-2026-director-mro-6030',
  },
  {
    title: 'NHIA Team Visits Central Region',
    excerpt: 'NHIA Membership and Regional Operations Team conducts official visit to Central Region...',
    date: '2024',
    image: 'https://www.nhis.gov.gh/cms/News/website%20pictures%20-%20mro%20central.jpg',
    link: 'https://www.nhis.gov.gh/News/nhia-membership-and-regional-operations-team-visits-central-region--6029',
  },
];

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Latest News
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              NHIS Updates & Announcements
            </h2>
          </div>
          <a
            href="https://www.nhis.gov.gh/news"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View All News
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.a
              key={news.title}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-sm">
                  <Calendar className="w-4 h-4" />
                  {news.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {news.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
