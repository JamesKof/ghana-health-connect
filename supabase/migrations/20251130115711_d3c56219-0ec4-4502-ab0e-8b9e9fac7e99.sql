-- Create facilities table to store facility data
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  region TEXT NOT NULL,
  lat DECIMAL(10, 6) NOT NULL,
  lng DECIMAL(10, 6) NOT NULL,
  services TEXT[] DEFAULT '{}',
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create facility reviews table
CREATE TABLE public.facility_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id UUID NOT NULL REFERENCES public.facilities(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_reviews ENABLE ROW LEVEL SECURITY;

-- Facilities are publicly readable
CREATE POLICY "Facilities are publicly readable"
ON public.facilities
FOR SELECT
USING (true);

-- Reviews are publicly readable
CREATE POLICY "Reviews are publicly readable"
ON public.facility_reviews
FOR SELECT
USING (true);

-- Anyone can submit reviews (public form)
CREATE POLICY "Anyone can submit reviews"
ON public.facility_reviews
FOR INSERT
WITH CHECK (true);

-- Insert sample NHIS facilities
INSERT INTO public.facilities (name, type, region, lat, lng, services, phone, address) VALUES
('Korle Bu Teaching Hospital', 'Teaching Hospital', 'Greater Accra', 5.5364, -0.2274, ARRAY['Emergency', 'Surgery', 'Maternity', 'Pediatrics'], '+233 30 266 5401', 'Guggisberg Ave, Accra'),
('Komfo Anokye Teaching Hospital', 'Teaching Hospital', 'Ashanti', 6.6885, -1.6244, ARRAY['Emergency', 'Surgery', 'Maternity', 'Cardiology'], '+233 32 202 2301', 'Okomfo Anokye Road, Kumasi'),
('37 Military Hospital', 'Military Hospital', 'Greater Accra', 5.5820, -0.1875, ARRAY['Emergency', 'Surgery', 'Orthopedics'], '+233 30 277 6111', '37 Hospital Road, Accra'),
('Ridge Hospital', 'Regional Hospital', 'Greater Accra', 5.5630, -0.2020, ARRAY['Emergency', 'Maternity', 'Pediatrics'], '+233 30 222 8315', 'Castle Road, Accra'),
('Tema General Hospital', 'Regional Hospital', 'Greater Accra', 5.6698, -0.0166, ARRAY['Emergency', 'Surgery', 'Maternity'], '+233 30 320 2028', 'Hospital Road, Tema'),
('Cape Coast Teaching Hospital', 'Teaching Hospital', 'Central', 5.1054, -1.2466, ARRAY['Emergency', 'Surgery', 'Maternity'], '+233 33 213 2194', 'Interberton Road, Cape Coast'),
('Tamale Teaching Hospital', 'Teaching Hospital', 'Northern', 9.4034, -0.8424, ARRAY['Emergency', 'Surgery', 'Maternity'], '+233 37 202 2455', 'Hospital Road, Tamale'),
('Ho Municipal Hospital', 'Municipal Hospital', 'Volta', 6.6016, 0.4713, ARRAY['Emergency', 'Maternity', 'Pediatrics'], '+233 36 202 8256', 'Hospital Road, Ho'),
('Sunyani Regional Hospital', 'Regional Hospital', 'Bono', 7.3349, -2.3123, ARRAY['Emergency', 'Surgery', 'Maternity'], '+233 35 202 7011', 'Hospital Road, Sunyani'),
('Koforidua Regional Hospital', 'Regional Hospital', 'Eastern', 6.0940, -0.2620, ARRAY['Emergency', 'Maternity', 'Pediatrics'], '+233 34 202 2456', 'Hospital Road, Koforidua'),
('Bolgatanga Regional Hospital', 'Regional Hospital', 'Upper East', 10.7856, -0.8514, ARRAY['Emergency', 'Maternity'], '+233 38 202 2125', 'Hospital Road, Bolgatanga'),
('Wa Regional Hospital', 'Regional Hospital', 'Upper West', 10.0601, -2.5099, ARRAY['Emergency', 'Maternity'], '+233 39 202 0236', 'Hospital Road, Wa'),
('Takoradi Hospital', 'Regional Hospital', 'Western', 4.8986, -1.7554, ARRAY['Emergency', 'Surgery', 'Maternity'], '+233 31 202 3145', 'Hospital Road, Takoradi'),
('Effia Nkwanta Regional Hospital', 'Regional Hospital', 'Western', 4.9220, -1.7700, ARRAY['Emergency', 'Surgery', 'Maternity', 'Pediatrics'], '+233 31 202 2015', 'Sekondi Road, Sekondi'),
('Achimota Hospital', 'District Hospital', 'Greater Accra', 5.6170, -0.2280, ARRAY['Emergency', 'Maternity', 'Pediatrics'], '+233 30 240 1347', 'Achimota Road, Accra');

-- Insert sample reviews
INSERT INTO public.facility_reviews (facility_id, user_name, rating, comment) 
SELECT id, 'Kwame A.', 5, 'Excellent service and caring staff. The doctors were very professional.'
FROM public.facilities WHERE name = 'Korle Bu Teaching Hospital';

INSERT INTO public.facility_reviews (facility_id, user_name, rating, comment) 
SELECT id, 'Ama B.', 4, 'Good facilities but sometimes long waiting times.'
FROM public.facilities WHERE name = 'Korle Bu Teaching Hospital';

INSERT INTO public.facility_reviews (facility_id, user_name, rating, comment) 
SELECT id, 'Kofi M.', 5, 'Best hospital in the region. Highly recommended!'
FROM public.facilities WHERE name = 'Komfo Anokye Teaching Hospital';

INSERT INTO public.facility_reviews (facility_id, user_name, rating, comment) 
SELECT id, 'Efua S.', 4, 'Clean environment and friendly nurses.'
FROM public.facilities WHERE name = 'Ridge Hospital';