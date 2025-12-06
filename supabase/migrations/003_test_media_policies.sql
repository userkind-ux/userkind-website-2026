-- Test Media Table RLS Policies
-- Run this to verify your policies are working

-- Check if policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'media';

-- Check if RLS is enabled
SELECT 
  tablename,
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'media';

-- If the above shows no policies or RLS is false, run 002_fix_media_policies.sql again

