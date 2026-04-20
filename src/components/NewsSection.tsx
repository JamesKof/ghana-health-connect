import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Newspaper, Loader2 } from 'lucide-react';
import { useNews, type NewsArticle } from '@/hooks/useNews';

const formatDate = (article: NewsArticle) => {
  if (article.published_text) return article.published_text;
  if (article.published_date) {
    return new Date(article.published_date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
  return 'Recent';
};

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data: articles = [], isLoading, isError } = useNews();

  // Pick top 9 articles for the homepage section
  const top = articles.slice(0, 9);
  const [hero, ...rest] = top;
  const sideCards = rest.slice(0, 2);
  const listItems = rest.slice(2);

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
              Live updates streamed automatically from nhis.gov.gh
            </p>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Browse All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 lg:row-span-2 bg-muted/50 rounded-2xl min-h-[320px] animate-pulse" />
            <div className="bg-muted/50 rounded-2xl min-h-[150px] animate-pulse" />
            <div className="bg-muted/50 rounded-2xl min-h-[150px] animate-pulse" />
            <div className="lg:col-span-3 flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              Fetching latest news from nhis.gov.gh…
            </div>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <Newspaper className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">
              We're having trouble loading the latest news.{' '}
              <a
                href="https://www.nhis.gov.gh/news"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Visit nhis.gov.gh/news
              </a>
            </p>
          </div>
        )}

        {/* Content */}
        {!isLoading && !isError && hero && (
          <>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Featured hero */}
              <motion.a
                href={hero.url}
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
                    {hero.category} · Featured
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:translate-x-1 transition-transform">
                    {hero.title}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(hero)}
                    </div>
                    <span className="inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/15 backdrop-blur px-4 py-2 rounded-full group-hover:bg-white/25 transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* Side cards */}
              {sideCards.map((news, index) => (
                <motion.a
                  key={news.id}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="group bg-card rounded-2xl p-5 shadow-card card-hover border border-border/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                        {news.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(news)}
                      </span>
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
            {listItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {listItems.map((news) => (
                  <a
                    key={news.id}
                    href={news.url}
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
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(news)}
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-primary/80 font-medium">{news.category}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
