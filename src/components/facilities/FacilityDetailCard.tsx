import { useState, useEffect } from 'react';
import { Navigation, Phone, MapPin, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FacilityRatingStars } from './FacilityRatingStars';
import { FacilityReviewsList } from './FacilityReviewsList';
import { FacilityReviewForm } from './FacilityReviewForm';

interface Facility {
  id: string;
  name: string;
  type: string;
  region: string;
  lat: number;
  lng: number;
  services: string[];
  phone: string | null;
  address: string | null;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface FacilityDetailCardProps {
  facility: Facility;
  userLocation: { lat: number; lng: number } | null;
  distance: number | null;
  duration: number | null;
  loadingDirections: boolean;
  onClose: () => void;
  onGetDirections: () => void;
}

export const FacilityDetailCard = ({
  facility,
  userLocation,
  distance,
  duration,
  loadingDirections,
  onClose,
  onGetDirections,
}: FacilityDetailCardProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('facility_reviews')
      .select('*')
      .eq('facility_id', facility.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
      if (data.length > 0) {
        const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [facility.id]);

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 shadow-card-hover max-h-[80vh] overflow-y-auto">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold">{facility.name}</h3>
            <p className="text-sm text-muted-foreground">{facility.type}</p>
            <p className="text-sm text-muted-foreground">{facility.region} Region</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <FacilityRatingStars rating={Math.round(averageRating)} showCount count={reviews.length} />
              {averageRating > 0 && (
                <span className="text-sm font-medium text-nhis-yellow">{averageRating}</span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact & Address */}
        {(facility.phone || facility.address) && (
          <div className="mt-3 space-y-1">
            {facility.address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{facility.address}</span>
              </div>
            )}
            {facility.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0" />
                <a href={`tel:${facility.phone}`} className="hover:text-primary">
                  {facility.phone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Services */}
        <div className="flex flex-wrap gap-1 mt-3">
          {facility.services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        {/* Distance & Duration */}
        {distance !== null && duration !== null && (
          <div className="mt-3 p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Distance:</span>
              <span className="font-medium">{formatDistance(distance)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Est. travel time:</span>
              <span className="font-medium">{formatDuration(duration)}</span>
            </div>
          </div>
        )}

        {/* Directions Button */}
        <Button 
          className="w-full mt-3" 
          size="sm" 
          onClick={onGetDirections}
          disabled={!userLocation || loadingDirections}
        >
          {loadingDirections ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 mr-2" />
          )}
          {!userLocation ? 'Enable location for directions' : 'Get Directions'}
        </Button>

        {/* Reviews Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors"
          >
            <span>Reviews ({reviews.length})</span>
            {showReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showReviews && (
            <div className="mt-2">
              <FacilityReviewsList reviews={reviews} />
              
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-sm text-primary hover:underline mt-2"
              >
                {showReviewForm ? 'Cancel' : 'Write a review'}
              </button>
              
              {showReviewForm && (
                <FacilityReviewForm
                  facilityId={facility.id}
                  facilityName={facility.name}
                  onReviewSubmitted={() => {
                    fetchReviews();
                    setShowReviewForm(false);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
