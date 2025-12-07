-- Comprehensive Media Table RLS Policy Fix
-- This will ensure policies work correctly

-- First, disable RLS temporarily to check if that's the issue
-- ALTER TABLE media DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on media table
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'media') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON media';
    END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
-- Allow authenticated users to read all media
CREATE POLICY "authenticated_read_media" 
  ON media FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow authenticated users to insert media
CREATE POLICY "authenticated_insert_media" 
  ON media FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Allow authenticated users to update their own media (or all if you want)
CREATE POLICY "authenticated_update_media" 
  ON media FOR UPDATE 
  TO authenticated 
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete media
CREATE POLICY "authenticated_delete_media" 
  ON media FOR DELETE 
  TO authenticated 
  USING (true);

-- Also allow service_role for admin operations (optional, for server-side operations)
-- CREATE POLICY "service_role_all_media" 
--   ON media FOR ALL 
--   TO service_role 
--   USING (true)
--   WITH CHECK (true);

-- Verify the policies were created
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'media'
ORDER BY policyname;

