import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  date: string;
  link: string;
  featured?: boolean;
}

// Latest news sourced from https://www.nhis.gov.gh/news
const newsItems: NewsItem[] = [
  {
    title: 'NHIA participates in UNDP health walk',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/nhia-participates-in-undp-health-walk--6240',
    featured: true,
  },
  {
    title: 'NHIS Campus Connect Targets Health Trainees, Records 380 Registrations on Day One at Kokofu Nursing College',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/nhis-campus-connect-targets-health-trainees%2c-records-380-registrations-on-day-one-at-kokofu-nursing-college-6239',
  },
  {
    title: 'NHIA Greater Accra Holds First Quarter Performance Review, Rallies Staff to Close Coverage Gap',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/nhia-greater-accra-holds-first-quarter-performance-review%2c-rallies-staff-to-close-coverage-gap-6238',
  },
  {
    title: 'Prez Mahama launches Free Primary Healthcare Policy',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/prez-mahama-launches-free-primary-healthcare-policy-6237',
    featured: true,
  },
  {
    title: 'Free Primary Healthcare officially launched',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/free-primary-healthcare-officially-launched-6236',
  },
  {
    title: 'Health Posts and Equipment Rollout to Boost Free Primary Health Care Access',
    date: '4/17/2026',
    link: 'https://www.nhis.gov.gh/News/health-posts-and-equipment-rollout-to-boost-free-primary-health-care-access-6235',
  },
  {
    title: 'NHIA collaborates with Opportunity International to launch a special registration exercise',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/nhia-collaborates-with-opportunity-international-to-launch-a-special-registration-exercise-6234',
  },
  {
    title: 'NHIA PCR4UHC market durbar registers over ten thousand people in Volta Region',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/nhia-pcr4uhc-market-durbar-registers-over-ten-thousand-people-in-volta-region-6233',
  },
  {
    title: 'NHIA Internal Auditors Wrap Up Annual Retreat with Renewed Commitment to Enhance Efficiency',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/nhia-internal-auditors-wrap-up-annual-retreat-with-renewed-commitment-to-enhance-efficiency-6232',
  },
  {
    title: 'Haruna Iddrisu approves upcoming inter regional NHIS quiz competition',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/haruna-iddrisu-approves-upcoming-inter-regional-nhis-quiz-competition--6231',
  },
  {
    title: 'NHIS Campus Connect Engages Nursing and Midwifery Students at Korle Bu',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/nhis-campus-connect-engages-nursing-and-midwifery-students-at-korle-bu-6230',
  },
  {
    title: 'Second Cohort of NHIA Drivers Undergo Training on Defensive Driving',
    date: '4/14/2026',
    link: 'https://www.nhis.gov.gh/News/second-cohort-of-nhia-drivers-undergo-training-on-defensive-driving-6229',
  },
];

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [hero, ...rest] = newsItems;

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-nhis-green animate-pulse" />
              Latest News & Updates
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              NHIS News & Announcements
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Stay informed with the latest updates straight from nhis.gov.gh
            </p>
          </div>
          <a
            href="https://www.nhis.gov.gh/news"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            View All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Hero News */}
          <motion.a
            href={hero.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-nhis-green to-nhis-blue p-8 md:p-10 min-h-[320px] flex flex-col justify-end shadow-card card-hover"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,179,43,0.25),transparent_60%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Newspaper className="w-3.5 h-3.5" />
                Featured Story
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:translate-x-1 transition-transform">
                {hero.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Calendar className="w-4 h-4" />
                  {hero.date}
                </div>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/15 backdrop-blur px-4 py-2 rounded-full group-hover:bg-white/25 transition-colors">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.a>

          {/* Side news cards */}
          {rest.slice(0, 2).map((news, index) => (
            <motion.a
              key={news.link}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group bg-card rounded-2xl p-5 shadow-card card-hover border border-border/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {news.date}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mt-2">
                Read More
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* More news list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {rest.slice(2).map((news, index) => (
            <a
              key={news.link}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Newspaper className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <Calendar className="w-3 h-3" />
                  {news.date}
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
