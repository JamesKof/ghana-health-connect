-- News articles cache populated by the fetch-nhis-news edge function
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'General',
  published_date DATE,
  published_text TEXT,
  summary TEXT,
  image_url TEXT,
  source TEXT NOT NULL DEFAULT 'nhis.gov.gh',
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for sorting by latest
CREATE INDEX idx_news_articles_published_date ON public.news_articles (published_date DESC NULLS LAST, fetched_at DESC);
CREATE INDEX idx_news_articles_category ON public.news_articles (category);

-- Full-text search index
CREATE INDEX idx_news_articles_fts ON public.news_articles
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(summary, '')));

-- Updated-at trigger reuses a generic function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS: public read, no client writes (service role bypasses RLS)
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News articles are publicly readable"
ON public.news_articles
FOR SELECT
USING (true);
