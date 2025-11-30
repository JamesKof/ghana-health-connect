import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FacilityRatingStars } from './FacilityRatingStars';

interface Facility {
  id: string;
  name: string;
  type: string;
  region: string;
  lat: number;
  lng: number;
  services: string[];
}

interface FacilityListItemProps {
  facility: Facility;
  isSelected: boolean;
  onClick: () => void;
}

export const FacilityListItem = ({ facility, isSelected, onClick }: FacilityListItemProps) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      const { data, error } = await supabase
        .from('facility_reviews')
        .select('rating')
        .eq('facility_id', facility.id);

      if (!error && data && data.length > 0) {
        const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
        setReviewCount(data.length);
      }
    };

    fetchRating();
  }, [facility.id]);

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{facility.name}</h4>
            <p className="text-xs text-muted-foreground">{facility.type}</p>
            <p className="text-xs text-muted-foreground">{facility.region} Region</p>
            
            {/* Rating */}
            <div className="mt-1">
              <FacilityRatingStars 
                rating={Math.round(averageRating)} 
                size="sm" 
                showCount 
                count={reviewCount} 
              />
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {facility.services.slice(0, 2).map((service) => (
                <Badge key={service} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {service}
                </Badge>
              ))}
              {facility.services.length > 2 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  +{facility.services.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
