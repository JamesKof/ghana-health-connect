-- Add RLS policies to prevent unauthorized updates/deletes on facility_reviews
-- Users cannot update or delete reviews (only admins should be able to in the future)

CREATE POLICY "No one can update reviews"
ON public.facility_reviews
FOR UPDATE
USING (false);

CREATE POLICY "No one can delete reviews"
ON public.facility_reviews
FOR DELETE
USING (false);