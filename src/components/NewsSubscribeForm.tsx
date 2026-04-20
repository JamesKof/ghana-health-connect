import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsSubscribeFormProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const NewsSubscribeForm = ({ variant = 'default', className = '' }: NewsSubscribeFormProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('subscribe-news', {
        body: { email: email.trim() },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setStatus('success');
      setMessage(data?.message ?? 'Check your inbox to confirm your subscription.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message ?? 'Something went wrong. Please try again.');
    }
  };

  const isCompact = variant === 'compact';

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden />
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            disabled={status === 'loading'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="pl-9 h-11"
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="h-11 px-6 bg-[hsl(var(--nhis-blue))] hover:bg-[hsl(var(--nhis-blue))]/90 text-white font-semibold"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Subscribing…
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 mt-3 text-sm text-[hsl(var(--nhis-green))]"
        >
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 mt-3 text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}

      {!isCompact && status === 'idle' && (
        <p className="text-xs text-muted-foreground mt-3">
          We'll send you new NHIS articles as they're published. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
};
