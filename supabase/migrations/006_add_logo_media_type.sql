-- Add 'Logo' as a valid media type
-- Run this in your Supabase SQL Editor

-- Drop the existing constraint
ALTER TABLE media DROP CONSTRAINT IF EXISTS media_media_type_check;

-- Add new constraint with Logo included
ALTER TABLE media ADD CONSTRAINT media_media_type_check 
  CHECK (media_type IN ('Icon', 'Image', 'Hero', 'Video', 'Logo'));

