import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, Newspaper, Filter, Loader2, AlertCircle, ExternalLink, Mail } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { NewsSubscribeForm } from '@/components/NewsSubscribeForm';
import { useNews, type NewsArticle } from '@/hooks/useNews';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 9;

const formatDate = (article: NewsArticle) => {
  if (article.published_text) return article.published_text;
  if (article.published_date) {
    return new Date(article.published_date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
  return 'Recent';
};

const NewsPage = () => {
  const { data: articles = [], isLoading, isError, refetch, isFetching } = useNews();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [page, setPage] = useState(1);

  // Set page title
  useEffect(() => {
    document.title = 'NHIS News & Updates | Latest from nhis.gov.gh';
    const meta = document.querySelector('meta[name="description"]');
    const desc = 'Browse the latest news, announcements, and updates from the National Health Insurance Scheme of Ghana, sourced live from nhis.gov.gh.';
    if (meta) meta.setAttribute('content', desc);
  }, []);

  // Build category list from articles
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category || 'General'));
    return ['All', ...Array.from(set).sort()];
  }, [articles]);

  // Filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeCategory !== 'All' && a.category !== activeCategory) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        (a.summary?.toLowerCase().includes(q) ?? false) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, query, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [query, activeCategory]);

  const categoryCount = (cat: string) => {
    if (cat === 'All') return articles.length;
    return articles.filter((a) => a.category === cat).length;
  };

  return (
    <PageLayout>
      {/* Hero with breadcrumb on top */}
      <section className="relative bg-gradient-to-br from-primary via-nhis-green to-nhis-blue text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,179,43,0.25),transparent_60%)]" />
        <div className="container-custom relative pt-8 pb-12 md:pb-16">
          <Breadcrumb />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Newspaper className="w-3.5 h-3.5" />
              Live from nhis.gov.gh
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 leading-tight">
              NHIS News & Updates
            </h1>
            <p className="text-white/90 text-base md:text-lg">
              The latest announcements, programmes, and stories from the
              National Health Insurance Scheme of Ghana, refreshed automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="container-custom pb-6">
        <div className="bg-card border border-border rounded-2xl p-4 md:p-5 shadow-card">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles by title, summary, or category…"
                aria-label="Search articles"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/40 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Category chips */}
            <div className="flex items-start gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1 mt-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span className="font-medium uppercase tracking-wider">Filter</span>
              </div>
              {categories.map((cat) => {
                const active = cat === activeCategory;
                const count = categoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                      active
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-muted/40 text-foreground/80 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30',
                    )}
                  >
                    {cat}
                    <span className={cn(
                      'inline-flex items-center justify-center min-w-[1.25rem] px-1 h-4 rounded-full text-[10px]',
                      active ? 'bg-white/20' : 'bg-foreground/10',
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Result summary */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
              <span>
                {isLoading ? 'Loading articles…' : `Showing ${filtered.length} article${filtered.length === 1 ? '' : 's'}`}
                {query && (
                  <> for "<span className="text-foreground font-medium">{query}</span>"</>
                )}
              </span>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 disabled:opacity-50 transition-colors font-medium"
              >
                {isFetching && <Loader2 className="w-3 h-3 animate-spin" />}
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-custom pb-16">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                <div className="h-4 w-20 bg-muted rounded mb-3" />
                <div className="h-5 w-full bg-muted rounded mb-2" />
                <div className="h-5 w-3/4 bg-muted rounded mb-4" />
                <div className="h-3 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-destructive/5 border border-destructive/30 rounded-2xl p-8 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Couldn't load news</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We had trouble fetching the latest articles. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : pageItems.length === 0 ? (
          <div className="bg-muted/30 border border-border rounded-2xl p-12 text-center">
            <Newspaper className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">No articles found</h3>
            <p className="text-sm text-muted-foreground">
              Try a different search term or clear your filters.
            </p>
            {(query || activeCategory !== 'All') && (
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageItems.map((article, idx) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
                  className="group bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-lg hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground line-clamp-3 mb-3 group-hover:text-primary transition-colors flex-1">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/5 hover:border-primary/30 transition-all"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  // Show first, last, current, neighbors
                  const show =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - safePage) <= 1;
                  if (!show) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum} className="px-2 text-muted-foreground">…</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={cn(
                        'min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-all border',
                        pageNum === safePage
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'bg-card border-border text-foreground hover:bg-primary/5 hover:border-primary/30',
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-card border border-border text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/5 hover:border-primary/30 transition-all"
                >
                  Next
                </button>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-6">
              Source: <a href="https://www.nhis.gov.gh/news" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nhis.gov.gh/news</a>
            </p>
          </>
        )}
      </section>
    </PageLayout>
  );
};

export default NewsPage;
