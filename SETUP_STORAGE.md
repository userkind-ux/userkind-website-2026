# Supabase Storage Setup Guide

## Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `media`
   - **Public bucket**: ✅ Enable this (so files can be accessed via public URLs)
   - Click **"Create bucket"**

## Step 2: Set Up Bucket Policies

1. After creating the bucket, click on the **"media"** bucket
2. Go to the **"Policies"** tab
3. Click **"New Policy"** and create the following policies:

### Policy 1: Allow authenticated users to upload files
- **Policy name**: "Allow authenticated uploads"
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**:
```sql
(bucket_id = 'media'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 2: Allow authenticated users to read files
- **Policy name**: "Allow authenticated reads"
- **Allowed operation**: SELECT
- **Target roles**: authenticated
- **Policy definition**:
```sql
(bucket_id = 'media'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 3: Allow authenticated users to delete files
- **Policy name**: "Allow authenticated deletes"
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**:
```sql
(bucket_id = 'media'::text) AND (auth.role() = 'authenticated'::text)
```

### Policy 4: Allow public to read files (if bucket is public)
- **Policy name**: "Allow public reads"
- **Allowed operation**: SELECT
- **Target roles**: anon, authenticated
- **Policy definition**:
```sql
bucket_id = 'media'::text
```

## Step 3: Verify Setup

1. Try uploading a file through the admin interface
2. Check that the file appears in the Storage bucket
3. Verify the file URL is accessible

## File Storage Structure

Files are stored with the following structure:
- Path format: `{year}/{month}/{unique-filename}`
- Example: `2025/12/1733456789-abc123def456.jpg`

The database stores:
- **filename**: Original semantic filename (e.g., `hero-image.jpg`) - for SEO and display
- **file_url**: Full public URL to the file in storage

This ensures:
- ✅ No filename conflicts in storage (unique identifiers)
- ✅ SEO-friendly semantic filenames in database
- ✅ Screen readers get meaningful filenames

