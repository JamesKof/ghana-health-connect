import { Star } from 'lucide-react';

interface FacilityRatingStarsProps {
  rating: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  count?: number;
}

export const FacilityRatingStars = ({ rating, size = 'md', showCount, count }: FacilityRatingStarsProps) => {
  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? 'fill-nhis-yellow text-nhis-yellow'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">({count})</span>
      )}
    </div>
  );
};
