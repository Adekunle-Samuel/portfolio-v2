# Sanity Assets Guide

This guide explains how to manage your portfolio's assets (profile picture, stack items, and about page content) through Sanity CMS.

## Overview

We've created three new content types in Sanity to manage assets that don't fit into the project schema:

1. **Site Settings** - Global site configuration (profile picture, name, social links)
2. **Stack Items** - Tools and technologies you use
3. **About Page** - Bio paragraphs and work experience

## Content Types

### 1. Site Settings

**Schema:** `siteSettings`  
**Location:** Single document (only one instance)

**Fields:**
- **Your Name** (required) - Displayed on the homepage hero
- **Profile Picture** - Your photo shown on the homepage
- **Tagline** - Short bio/description shown below your name
- **Email Address** - Your contact email
- **Resume PDF** - Upload your resume for download
- **Social Links** - LinkedIn, GitHub, Twitter/X, Dribbble, Behance URLs

**How to use:**
1. Go to Sanity Studio (`/studio`)
2. Find "Site Settings" in the sidebar
3. Add your information and upload your profile picture
4. Click "Publish"

**Where it appears:**
- Profile picture and name on homepage Hero section
- Can be extended to Footer and other global areas

---

### 2. Stack Items

**Schema:** `stackItem`  
**Location:** Multiple documents (add as many tools as you want)

**Fields:**
- **Tool/Technology Name** (required) - e.g., "Figma", "Adobe Creative Suite"
- **Description** (required) - Brief description of how you use this tool
- **Icon** - Upload an icon/logo image (optional)
- **Icon Emoji (Fallback)** - Emoji to show if no icon image is uploaded
- **Brand Color** - Hex color code (e.g., #FF0000) for the tool's background
- **Display Order** (required) - Lower numbers appear first (1, 2, 3, etc.)
- **Website URL** - Optional link to the tool's website

**How to use:**
1. Go to Sanity Studio
2. Click "Stack Item" → Create new
3. Fill in the tool information
4. Upload an icon or provide an emoji
5. Set the display order (1 for first, 2 for second, etc.)
6. Click "Publish"

**Pro tips:**
- Use the icon image for professional logos
- Use emoji for quick setup or fun representation
- The color field adds a subtle background tint to make each tool distinct
- Order field controls the sequence on the Stack page

**Where it appears:**
- `/stack` page - displays all stack items in order

---

### 3. About Page

**Schema:** `about`  
**Location:** Single document (only one instance)

**Fields:**
- **Page Title** - Defaults to "About Me", can be customized
- **Bio Paragraphs** - Array of text paragraphs for your bio
- **Decorative Image** - Optional image for the about page
- **Work Experience** - Array of work experiences with:
  - Company Name (required)
  - Role/Title (required)
  - Time Period (required) - e.g., "2024–Present"
  - Description (optional) - Brief description of your role
  - Display Order - Lower numbers appear first

**How to use:**
1. Go to Sanity Studio
2. Find "About Page" in the sidebar
3. Click "Add item" under Bio Paragraphs to add each paragraph
4. Click "Add item" under Work Experience for each job
5. Set display order for work experience (usually 1 for most recent)
6. Click "Publish"

**Pro tips:**
- Keep paragraphs focused - one main idea per paragraph
- For work experience, use order 1 for most recent, 2 for previous, etc.
- The description field under work experience is optional - use it for additional context

**Where it appears:**
- `/about` page - displays bio and work experience

---

## Setup Instructions

### First Time Setup

1. **Start Sanity Studio:**
   ```bash
   npm run dev
   ```

2. **Navigate to Studio:**
   Open `http://localhost:3000/studio` in your browser

3. **Create Initial Content:**
   - Create one "Site Settings" document
   - Create multiple "Stack Item" documents
   - Create one "About Page" document

### Updating Content

Changes in Sanity Studio will automatically appear on your site after you:
1. Make your edits in the studio
2. Click "Publish"
3. Refresh your portfolio website

---

## Data Flow

### How it works:

```
Sanity Studio → Sanity API → Next.js Pages → React Components
```

1. **You edit content** in Sanity Studio
2. **Data is saved** to Sanity's cloud
3. **Next.js fetches** the data when pages load
4. **Components render** the content with fallbacks if data isn't available

### Fallback behavior:

If you haven't added content to Sanity yet, the site will show:
- **Hero**: Default name "Sam Adekunle" and tagline
- **Stack**: Default tools (Adobe, Claude, ChatGPT, Figma, Cursor)
- **About**: Default bio and work experience

This ensures your site always looks good, even during initial setup.

---

## File Structure

### Schemas (Define content structure):
```
sanity/schemas/
├── siteSettings.ts  - Global site configuration
├── stackItem.ts     - Stack/tools content type
├── about.ts         - About page content type
└── index.ts         - Exports all schemas
```

### Types (TypeScript interfaces):
```
types/
├── siteSettings.ts  - SiteSettings interface
├── stackItem.ts     - StackItem interface
└── about.ts         - About & WorkExperience interfaces
```

### Queries (Fetch data from Sanity):
```
lib/queries.ts
- siteSettingsQuery
- stackItemsQuery
- aboutQuery
```

### Components (Render the content):
```
components/
├── Hero.tsx         - Uses siteSettings
├── StackContent.tsx - Uses stackItems
└── AboutContent.tsx - Uses about
```

---

## Common Tasks

### Adding a new tool to your stack:
1. Go to Studio → Stack Item → Create new
2. Fill in name, description, and order
3. Add an icon or emoji
4. Publish

### Updating your profile picture:
1. Go to Studio → Site Settings
2. Upload new image under "Profile Picture"
3. Publish

### Editing your bio:
1. Go to Studio → About Page
2. Click into "Bio Paragraphs"
3. Edit existing paragraphs or add new ones
4. Publish

### Adding work experience:
1. Go to Studio → About Page
2. Click "Add item" under Work Experience
3. Fill in company, role, period
4. Set order (1 = most recent)
5. Publish

---

## Advanced: Image Optimization

Images uploaded to Sanity are automatically optimized using Sanity's Image API:

- Profile pictures are resized to 120x120px
- Stack icons are resized to 48x48px
- Supports hotspot for precise cropping
- Automatically generates responsive images

The `urlFor()` helper (from `@/sanity/lib/image`) handles all image transformations.

---

## Troubleshooting

### Content not showing up?
1. Check that you've clicked "Publish" in Sanity Studio (not just "Save")
2. Refresh your portfolio site
3. Check browser console for errors

### Images not loading?
1. Verify the image uploaded successfully in Sanity Studio
2. Check that your Sanity project ID is configured in `sanity.config.ts`
3. Ensure the image URL is accessible

### Wrong order of items?
- Make sure the `order` field is set correctly
- Lower numbers appear first (1, 2, 3...)
- Check that you've published after changing the order

---

## Next Steps

Now that you have these schemas set up, you can:

1. **Extend Site Settings** - Add more global fields like SEO meta tags
2. **Add more content types** - Create schemas for testimonials, blog posts, etc.
3. **Connect to social links** - Use the social links in the Footer component
4. **Add resume download** - Create a download button using the resume file

Happy content managing! 🎉


