import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  category: string;
  published_date: string | null;
  published_text: string | null;
  summary: string | null;
  image_url: string | null;
  source: string;
  fetched_at: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  count: number;
  cached: boolean;
  fetched_at: string;
}

async function fetchNews(): Promise<NewsArticle[]> {
  const { data, error } = await supabase.functions.invoke<NewsResponse>(
    'fetch-nhis-news',
    { method: 'GET' as never },
  );
  if (error) throw error;
  return data?.articles ?? [];
}

export const useNews = () => {
  return useQuery({
    queryKey: ['nhis-news'],
    queryFn: fetchNews,
    staleTime: 30 * 60 * 1000, // 30 min — server also caches 1h
    refetchOnWindowFocus: false,
  });
};
