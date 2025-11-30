import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, MapPin, Search, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FacilityListItem } from './facilities/FacilityListItem';
import { FacilityDetailCard } from './facilities/FacilityDetailCard';

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

const regions = ['All Regions', 'Greater Accra', 'Ashanti', 'Central', 'Northern', 'Volta', 'Bono', 'Eastern', 'Upper East', 'Upper West', 'Western'];

export const FacilitiesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const routeLayerRef = useRef<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [loadingDirections, setLoadingDirections] = useState(false);
  const { toast } = useToast();

  // Fetch facilities from database
  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching facilities:', error);
        toast({ title: 'Failed to load facilities', variant: 'destructive' });
      } else {
        setFacilities(data || []);
      }
    };

    fetchFacilities();
  }, []);

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      if (!mapContainer.current) return;

      try {
        const { data, error: fetchError } = await supabase.functions.invoke('get-mapbox-token');
        
        if (fetchError || !data?.token) {
          throw new Error(fetchError?.message || 'Failed to get Mapbox token');
        }

        mapboxgl.accessToken = data.token;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-1.0232, 7.9465],
          zoom: 6,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        });
        map.current.addControl(geolocate, 'top-right');

        geolocate.on('geolocate', (e: any) => {
          setUserLocation({ lat: e.coords.latitude, lng: e.coords.longitude });
        });

        map.current.on('load', () => {
          setLoading(false);
        });

      } catch (err) {
        console.error('Map initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
        setLoading(false);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      userMarkerRef.current?.remove();
      map.current?.remove();
    };
  }, []);

  // Add markers when facilities or filters change
  const addMarkers = useCallback(() => {
    if (!map.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filteredFacilities = facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           facility.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All Regions' || facility.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    filteredFacilities.forEach(facility => {
      const el = document.createElement('div');
      el.className = 'facility-marker';
      el.innerHTML = `
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform" style="background-color: hsl(207, 90%, 35%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold text-sm">${facility.name}</h3>
          <p class="text-xs text-gray-600">${facility.type}</p>
          <p class="text-xs text-gray-500">${facility.region} Region</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([facility.lng, facility.lat])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedFacility(facility);
        clearRoute();
      });

      markersRef.current.push(marker);
    });
  }, [facilities, searchQuery, selectedRegion]);

  useEffect(() => {
    if (map.current && !loading && facilities.length > 0) {
      addMarkers();
    }
  }, [addMarkers, loading, facilities]);

  // Clear route from map
  const clearRoute = () => {
    if (map.current && routeLayerRef.current) {
      if (map.current.getLayer(routeLayerRef.current)) {
        map.current.removeLayer(routeLayerRef.current);
      }
      if (map.current.getSource(routeLayerRef.current)) {
        map.current.removeSource(routeLayerRef.current);
      }
      routeLayerRef.current = null;
    }
    setDistance(null);
    setDuration(null);
  };

  // Get directions
  const getDirections = async () => {
    if (!userLocation || !selectedFacility || !map.current) return;

    setLoadingDirections(true);
    clearRoute();

    try {
      const { data, error } = await supabase.functions.invoke('get-mapbox-directions', {
        body: {
          origin: userLocation,
          destination: { lat: selectedFacility.lat, lng: selectedFacility.lng },
        },
      });

      if (error) throw error;

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setDistance(route.distance);
        setDuration(route.duration);

        const routeId = `route-${Date.now()}`;
        routeLayerRef.current = routeId;

        map.current.addSource(routeId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: route.geometry,
          },
        });

        map.current.addLayer({
          id: routeId,
          type: 'line',
          source: routeId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0066B3',
            'line-width': 5,
            'line-opacity': 0.8,
          },
        });

        // Fit map to show route
        const coordinates = route.geometry.coordinates;
        const bounds = coordinates.reduce((bounds: mapboxgl.LngLatBounds, coord: [number, number]) => {
          return bounds.extend(coord as mapboxgl.LngLatLike);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (err) {
      console.error('Error getting directions:', err);
      toast({ title: 'Failed to get directions', variant: 'destructive' });
    } finally {
      setLoadingDirections(false);
    }
  };

  const flyToFacility = (facility: Facility) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [facility.lng, facility.lat],
      zoom: 14,
      duration: 2000,
    });
    setSelectedFacility(facility);
    clearRoute();
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All Regions' || facility.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-muted/30 rounded-2xl">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Failed to load map</p>
          <p className="text-sm text-muted-foreground/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* Location Status */}
        {userLocation && (
          <div className="flex items-center gap-2 text-sm text-nhis-green">
            <Navigation className="w-4 h-4" />
            <span>Location enabled</span>
          </div>
        )}

        {/* Search & Filter */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map(region => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRegion(region)}
                  className="text-xs"
                >
                  {region}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facilities List */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {filteredFacilities.map(facility => (
            <FacilityListItem
              key={facility.id}
              facility={facility}
              isSelected={selectedFacility?.id === facility.id}
              onClick={() => flyToFacility(facility)}
            />
          ))}
          {filteredFacilities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No facilities found</p>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="lg:col-span-2 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-2xl z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        <div 
          ref={mapContainer} 
          className="w-full h-[600px] rounded-2xl shadow-card overflow-hidden"
        />
        
        {/* Selected Facility Detail Card */}
        {selectedFacility && (
          <FacilityDetailCard
            facility={selectedFacility}
            userLocation={userLocation}
            distance={distance}
            duration={duration}
            loadingDirections={loadingDirections}
            onClose={() => {
              setSelectedFacility(null);
              clearRoute();
            }}
            onGetDirections={getDirections}
          />
        )}
      </div>
    </div>
  );
};
