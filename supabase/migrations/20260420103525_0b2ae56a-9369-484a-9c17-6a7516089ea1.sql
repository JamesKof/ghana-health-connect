-- Subscribers table for news email opt-in
CREATE TABLE public.news_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','unsubscribed')),
  confirm_token UUID NOT NULL DEFAULT gen_random_uuid(),
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.news_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up (insert) — but no one can read/list the subscriber base
CREATE POLICY "Anyone can subscribe"
ON public.news_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Updated_at trigger
CREATE TRIGGER trg_news_subscribers_updated_at
BEFORE UPDATE ON public.news_subscribers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_news_subscribers_status ON public.news_subscribers(status);
CREATE INDEX idx_news_subscribers_confirm_token ON public.news_subscribers(confirm_token);
CREATE INDEX idx_news_subscribers_unsubscribe_token ON public.news_subscribers(unsubscribe_token);

-- Track which articles have been emailed already so re-runs don't double-send
ALTER TABLE public.news_articles
ADD COLUMN IF NOT EXISTS emailed_at TIMESTAMPTZ;