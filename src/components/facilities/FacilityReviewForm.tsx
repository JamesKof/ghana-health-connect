import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FacilityReviewFormProps {
  facilityId: string;
  facilityName: string;
  onReviewSubmitted: () => void;
}

export const FacilityReviewForm = ({ facilityId, facilityName, onReviewSubmitted }: FacilityReviewFormProps) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({ title: 'Please enter your name', variant: 'destructive' });
      return;
    }
    if (rating === 0) {
      toast({ title: 'Please select a rating', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('facility_reviews').insert({
        facility_id: facilityId,
        user_name: name.trim(),
        rating,
        comment: comment.trim() || null,
      });

      if (error) throw error;

      toast({ title: 'Review submitted successfully!' });
      setName('');
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({ title: 'Failed to submit review', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-border/50">
      <p className="text-sm font-medium">Rate {facilityName}</p>
      
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5 focus:outline-none"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hoverRating || rating)
                  ? 'fill-nhis-yellow text-nhis-yellow'
                  : 'text-muted-foreground/30 hover:text-nhis-yellow/50'
              }`}
            />
          </button>
        ))}
      </div>

      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-sm"
      />

      <Textarea
        placeholder="Share your experience (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-sm resize-none"
        rows={2}
      />

      <Button type="submit" size="sm" disabled={submitting} className="w-full">
        <Send className="w-4 h-4 mr-2" />
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};
