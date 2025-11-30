import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, MapPin, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Sample NHIS-accredited facilities in Ghana
const facilities = [
  { id: 1, name: 'Korle Bu Teaching Hospital', type: 'Teaching Hospital', region: 'Greater Accra', lat: 5.5364, lng: -0.2274, services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'] },
  { id: 2, name: 'Komfo Anokye Teaching Hospital', type: 'Teaching Hospital', region: 'Ashanti', lat: 6.6885, lng: -1.6244, services: ['Emergency', 'Surgery', 'Maternity', 'Cardiology'] },
  { id: 3, name: '37 Military Hospital', type: 'Military Hospital', region: 'Greater Accra', lat: 5.5820, lng: -0.1875, services: ['Emergency', 'Surgery', 'Orthopedics'] },
  { id: 4, name: 'Ridge Hospital', type: 'Regional Hospital', region: 'Greater Accra', lat: 5.5630, lng: -0.2020, services: ['Emergency', 'Maternity', 'Pediatrics'] },
  { id: 5, name: 'Tema General Hospital', type: 'Regional Hospital', region: 'Greater Accra', lat: 5.6698, lng: -0.0166, services: ['Emergency', 'Surgery', 'Maternity'] },
  { id: 6, name: 'Cape Coast Teaching Hospital', type: 'Teaching Hospital', region: 'Central', lat: 5.1054, lng: -1.2466, services: ['Emergency', 'Surgery', 'Maternity'] },
  { id: 7, name: 'Tamale Teaching Hospital', type: 'Teaching Hospital', region: 'Northern', lat: 9.4034, lng: -0.8424, services: ['Emergency', 'Surgery', 'Maternity'] },
  { id: 8, name: 'Ho Municipal Hospital', type: 'Municipal Hospital', region: 'Volta', lat: 6.6016, lng: 0.4713, services: ['Emergency', 'Maternity', 'Pediatrics'] },
  { id: 9, name: 'Sunyani Regional Hospital', type: 'Regional Hospital', region: 'Bono', lat: 7.3349, lng: -2.3123, services: ['Emergency', 'Surgery', 'Maternity'] },
  { id: 10, name: 'Koforidua Regional Hospital', type: 'Regional Hospital', region: 'Eastern', lat: 6.0940, lng: -0.2620, services: ['Emergency', 'Maternity', 'Pediatrics'] },
  { id: 11, name: 'Bolgatanga Regional Hospital', type: 'Regional Hospital', region: 'Upper East', lat: 10.7856, lng: -0.8514, services: ['Emergency', 'Maternity'] },
  { id: 12, name: 'Wa Regional Hospital', type: 'Regional Hospital', region: 'Upper West', lat: 10.0601, lng: -2.5099, services: ['Emergency', 'Maternity'] },
  { id: 13, name: 'Takoradi Hospital', type: 'Regional Hospital', region: 'Western', lat: 4.8986, lng: -1.7554, services: ['Emergency', 'Surgery', 'Maternity'] },
  { id: 14, name: 'Effia Nkwanta Regional Hospital', type: 'Regional Hospital', region: 'Western', lat: 4.9220, lng: -1.7700, services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'] },
  { id: 15, name: 'Achimota Hospital', type: 'District Hospital', region: 'Greater Accra', lat: 5.6170, lng: -0.2280, services: ['Emergency', 'Maternity', 'Pediatrics'] },
];

const regions = ['All Regions', 'Greater Accra', 'Ashanti', 'Central', 'Northern', 'Volta', 'Bono', 'Eastern', 'Upper East', 'Upper West', 'Western'];

export const FacilitiesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedFacility, setSelectedFacility] = useState<typeof facilities[0] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainer.current) return;

      try {
        // Fetch Mapbox token from edge function
        const { data, error: fetchError } = await supabase.functions.invoke('get-mapbox-token');
        
        if (fetchError || !data?.token) {
          throw new Error(fetchError?.message || 'Failed to get Mapbox token');
        }

        mapboxgl.accessToken = data.token;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [-1.0232, 7.9465], // Center of Ghana
          zoom: 6,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        
        // Add geolocate control
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });
        map.current.addControl(geolocate, 'top-right');

        map.current.on('load', () => {
          setLoading(false);
          addMarkers();
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
      map.current?.remove();
    };
  }, []);

  const addMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const filteredFacilities = facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           facility.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All Regions' || facility.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });

    filteredFacilities.forEach(facility => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'facility-marker';
      el.innerHTML = `
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" x2="6" y1="1" y2="4"/>
            <line x1="10" x2="10" y1="1" y2="4"/>
            <line x1="14" x2="14" y1="1" y2="4"/>
          </svg>
        </div>
      `;

      // Create popup
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
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (map.current && !loading) {
      addMarkers();
    }
  }, [searchQuery, selectedRegion, loading]);

  const flyToFacility = (facility: typeof facilities[0]) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [facility.lng, facility.lat],
      zoom: 14,
      duration: 2000,
    });
    setSelectedFacility(facility);
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
            <Card 
              key={facility.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedFacility?.id === facility.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => flyToFacility(facility)}
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
                    <div className="flex flex-wrap gap-1 mt-2">
                      {facility.services.slice(0, 2).map(service => (
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
        
        {/* Selected Facility Info */}
        {selectedFacility && (
          <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 shadow-card-hover">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{selectedFacility.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFacility.type}</p>
                  <p className="text-sm text-muted-foreground">{selectedFacility.region} Region</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedFacility(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {selectedFacility.services.map(service => (
                  <Badge key={service} variant="secondary" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">
                Get Directions
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
