-- Storage Bucket Policies for Media Bucket
-- Run this in your Supabase SQL Editor

-- These policies control access to the Storage bucket, not the database table

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads to Media bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'Media'::text);

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated reads from Media bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'Media'::text);

-- Allow authenticated users to update files
CREATE POLICY "Allow authenticated updates to Media bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'Media'::text)
WITH CHECK (bucket_id = 'Media'::text);

-- Allow authenticated users to delete files
CREATE POLICY "Allow authenticated deletes from Media bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'Media'::text);

-- Allow public to read files (since bucket is public)
CREATE POLICY "Allow public reads from Media bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Media'::text);

-- Verify policies were created
SELECT 
  policyname,
  cmd,
  roles
FROM pg_policies 
WHERE tablename = 'objects' 
  AND policyname LIKE '%Media%'
ORDER BY policyname;

