-- Admin Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Media Table
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  alt_text TEXT,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('Icon', 'Image', 'Hero', 'Video')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Pages Table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  page_category TEXT CHECK (page_category IN ('Content', 'Case Study', 'Blog Post')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Global Elements - Header
CREATE TABLE IF NOT EXISTS header (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
  main_menu JSONB DEFAULT '[]'::jsonb,
  submenus JSONB DEFAULT '[]'::jsonb,
  cta_label TEXT,
  cta_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Global Elements - Footer
CREATE TABLE IF NOT EXISTS footer (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
  column_one_content TEXT,
  column_two_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Global Elements - Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heading TEXT NOT NULL,
  description TEXT,
  work_category TEXT CHECK (work_category IN ('E-commerce', 'Website', 'Application', 'UX Design')),
  thumbnail_id UUID REFERENCES media(id) ON DELETE SET NULL,
  link_url TEXT,
  page_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Global Elements - Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  company TEXT,
  avatar_id UUID REFERENCES media(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Global Elements - Forms
CREATE TABLE IF NOT EXISTS forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email_to TEXT NOT NULL,
  form_fields JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Repeatable Content Sections
CREATE TABLE IF NOT EXISTS repeatable_content_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  section_type TEXT NOT NULL,
  fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Page Content Sections (Junction Table)
CREATE TABLE IF NOT EXISTS page_content_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES repeatable_content_sections(id) ON DELETE CASCADE,
  content_data JSONB DEFAULT '{}'::jsonb,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_id, section_id, "order")
);

-- 10. Site Settings (Single Row Table)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_seo_title TEXT,
  site_seo_description TEXT,
  favicon_id UUID REFERENCES media(id) ON DELETE SET NULL,
  robots_no_follow BOOLEAN DEFAULT false,
  google_tag_manager_id TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  social_meta_title TEXT,
  social_meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Members Table (Placeholder)
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Page Forms (Junction Table)
CREATE TABLE IF NOT EXISTS page_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  form_id UUID NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_id, form_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_category ON pages(page_category);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(media_type);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(work_category);
CREATE INDEX IF NOT EXISTS idx_page_content_sections_page_id ON page_content_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_page_content_sections_order ON page_content_sections(page_id, "order");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_header_updated_at BEFORE UPDATE ON header FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_footer_updated_at BEFORE UPDATE ON footer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_repeatable_content_sections_updated_at BEFORE UPDATE ON repeatable_content_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE header ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE repeatable_content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_forms ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
-- For now, allow authenticated users full access
-- You'll need to adjust these based on your authentication setup

-- Media policies
CREATE POLICY "Allow authenticated users to read media" ON media FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert media" ON media FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update media" ON media FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete media" ON media FOR DELETE TO authenticated USING (true);

-- Pages policies
CREATE POLICY "Allow authenticated users to read pages" ON pages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert pages" ON pages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update pages" ON pages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete pages" ON pages FOR DELETE TO authenticated USING (true);

-- Header policies
CREATE POLICY "Allow authenticated users to read header" ON header FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert header" ON header FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update header" ON header FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete header" ON header FOR DELETE TO authenticated USING (true);

-- Footer policies
CREATE POLICY "Allow authenticated users to read footer" ON footer FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert footer" ON footer FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update footer" ON footer FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete footer" ON footer FOR DELETE TO authenticated USING (true);

-- Case Studies policies
CREATE POLICY "Allow authenticated users to read case_studies" ON case_studies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert case_studies" ON case_studies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update case_studies" ON case_studies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete case_studies" ON case_studies FOR DELETE TO authenticated USING (true);

-- Testimonials policies
CREATE POLICY "Allow authenticated users to read testimonials" ON testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- Forms policies
CREATE POLICY "Allow authenticated users to read forms" ON forms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert forms" ON forms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update forms" ON forms FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete forms" ON forms FOR DELETE TO authenticated USING (true);

-- Repeatable Content Sections policies
CREATE POLICY "Allow authenticated users to read repeatable_content_sections" ON repeatable_content_sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert repeatable_content_sections" ON repeatable_content_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update repeatable_content_sections" ON repeatable_content_sections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete repeatable_content_sections" ON repeatable_content_sections FOR DELETE TO authenticated USING (true);

-- Page Content Sections policies
CREATE POLICY "Allow authenticated users to read page_content_sections" ON page_content_sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert page_content_sections" ON page_content_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update page_content_sections" ON page_content_sections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete page_content_sections" ON page_content_sections FOR DELETE TO authenticated USING (true);

-- Site Settings policies
CREATE POLICY "Allow authenticated users to read site_settings" ON site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update site_settings" ON site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete site_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- Members policies
CREATE POLICY "Allow authenticated users to read members" ON members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert members" ON members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update members" ON members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete members" ON members FOR DELETE TO authenticated USING (true);

-- Page Forms policies
CREATE POLICY "Allow authenticated users to read page_forms" ON page_forms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert page_forms" ON page_forms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update page_forms" ON page_forms FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete page_forms" ON page_forms FOR DELETE TO authenticated USING (true);

