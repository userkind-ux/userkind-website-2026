-- Fix Media Table RLS Policies
-- Run this in your Supabase SQL Editor if you're getting RLS policy errors

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read media" ON media;
DROP POLICY IF EXISTS "Allow authenticated users to insert media" ON media;
DROP POLICY IF EXISTS "Allow authenticated users to update media" ON media;
DROP POLICY IF EXISTS "Allow authenticated users to delete media" ON media;

-- Recreate policies
CREATE POLICY "Allow authenticated users to read media" 
  ON media FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to insert media" 
  ON media FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update media" 
  ON media FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to delete media" 
  ON media FOR DELETE 
  TO authenticated 
  USING (true);

-- Verify RLS is enabled
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

