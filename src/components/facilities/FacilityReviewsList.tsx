import { FacilityRatingStars } from './FacilityRatingStars';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface FacilityReviewsListProps {
  reviews: Review[];
}

export const FacilityReviewsList = ({ reviews }: FacilityReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-2">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="space-y-3 max-h-40 overflow-y-auto">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-border/30 pb-2 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{review.user_name}</span>
            <FacilityRatingStars rating={review.rating} size="sm" />
          </div>
          {review.comment && (
            <p className="text-xs text-muted-foreground mt-1">{review.comment}</p>
          )}
          <p className="text-[10px] text-muted-foreground/60 mt-1">
            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
          </p>
        </div>
      ))}
    </div>
  );
};
