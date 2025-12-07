# On-Demand Revalidation Setup

This document explains how to set up on-demand revalidation for public pages using webhooks.

## Environment Variables

### 1. Add REVALIDATE_SECRET to .env.local

Add the following to your `.env.local` file:

```env
REVALIDATE_SECRET=your-secure-random-string-here
```

Generate a secure random string (at least 32 characters). You can use:
- Online generator: https://randomkeygen.com/
- Command line: `openssl rand -hex 32`

### 2. Add REVALIDATE_SECRET to Vercel

1. Go to your Vercel project dashboard (you should see your project name at the top)
2. Click on the **"Settings"** tab in the project navigation bar (it's in the row with "Overview", "Deployments", "Analytics", etc.)
3. In the Settings sidebar menu, click on **"Environment Variables"** (it's under the "Configuration" section)
4. Click the **"Add New"** button
5. Add `REVALIDATE_SECRET` as the **Name**
6. Paste your secure random string as the **Value**
7. Select which environments to apply it to:
   - ✅ **Production** (required for live site)
   - ✅ **Preview** (optional, for preview deployments)
   - ✅ **Development** (optional, for local development)
8. Click **"Save"**

## Supabase Webhook Setup

### Option 1: Using Supabase Database Webhooks (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to Database → Webhooks
3. Create a new webhook:
   - **Name**: Page Revalidation
   - **Table**: `pages`
   - **Events**: INSERT, UPDATE, DELETE
   - **HTTP Request**:
     - **URL**: `https://your-domain.com/api/revalidate`
     - **HTTP Method**: POST
     - **HTTP Headers**:
       - `Content-Type: application/json`
       - `x-revalidate-secret: your-secure-random-string-here`
     - **HTTP Request Body**:
       ```json
       {
         "slug": "{{NEW.slug}}"
       }
       ```
     - For DELETE events, use `{{OLD.slug}}` instead

### Option 2: Using Supabase Edge Functions

Create a Supabase Edge Function that triggers on database changes and calls the revalidation endpoint.

### Option 3: Using Database Triggers (Advanced)

Create a PostgreSQL function and trigger that calls the webhook when pages are updated.

Example SQL (run in Supabase SQL Editor):

```sql
-- Create function to call webhook
CREATE OR REPLACE FUNCTION notify_page_change()
RETURNS TRIGGER AS $$
DECLARE
  page_slug TEXT;
BEGIN
  -- Determine slug based on operation
  IF TG_OP = 'DELETE' THEN
    page_slug := OLD.slug;
  ELSE
    page_slug := NEW.slug;
  END IF;

  -- Call webhook (requires pg_net extension)
  -- Note: This is a simplified example - actual implementation may vary
  PERFORM net.http_post(
    url := 'https://your-domain.com/api/revalidate',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-revalidate-secret', current_setting('app.revalidate_secret', true)
    ),
    body := jsonb_build_object('slug', page_slug)
  );

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER page_change_webhook
AFTER INSERT OR UPDATE OR DELETE ON pages
FOR EACH ROW
EXECUTE FUNCTION notify_page_change();
```

## Testing the Webhook

### Test with curl

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: your-secure-random-string-here" \
  -d '{"slug": "test-page"}'
```

### Expected Response

```json
{
  "revalidated": true,
  "slug": "test-page",
  "now": 1234567890123
}
```

### Test Error Cases

1. **Missing secret** (should return 401):
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"slug": "test-page"}'
```

2. **Invalid secret** (should return 401):
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: wrong-secret" \
  -d '{"slug": "test-page"}'
```

3. **Missing slug** (should return 400):
```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: your-secure-random-string-here" \
  -d '{}'
```

## How It Works

1. **Background Revalidation**: Pages are automatically revalidated every 24 hours (86400 seconds) in the background
2. **On-Demand Revalidation**: When a page is created, updated, or deleted in the CMS:
   - Supabase triggers the webhook
   - Webhook calls `/api/revalidate` with the page slug
   - Next.js immediately revalidates that specific page
   - Next visitor sees the updated content instantly

## Security Notes

- The `REVALIDATE_SECRET` must be kept secure
- Never commit it to version control
- Use different secrets for development and production
- The webhook endpoint will reject requests without a valid secret

## Troubleshooting

- **401 Unauthorized**: Check that `REVALIDATE_SECRET` matches in both Supabase webhook config and Vercel environment variables
- **404 Not Found**: Ensure the webhook URL is correct (include `/api/revalidate`)
- **Pages not updating**: Check Vercel function logs for errors
- **Build errors**: Verify `generateStaticParams` is working correctly

