# 📋 Sanity CMS Schema Guide

## Overview

Your Sanity schema is now perfectly modeled after the project detail page design. This guide explains each field and how to use them.

## 🏗️ Schema Structure

### 1. **Basic Project Info** (Homepage Cards)

These fields appear on the homepage grid:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Project name shown everywhere |
| `slug` | slug | Yes | URL-friendly identifier (auto-generates) |
| `category` | string | Yes | Brand/Product/Development/Design |
| `coverImage` | image | No | Thumbnail for homepage cards |
| `description` | text | No | Brief description (2-3 lines) |
| `projectUrl` | url | No | External link to live project |
| `order` | number | No | Display order (lower = earlier) |

### 2. **Detail Page: Hero Section**

| Field | Type | Description |
|-------|------|-------------|
| `heroImage` | image | Large hero image (1440×534px) |

### 3. **Detail Page: Project Information**

Appears below the hero, contains metadata:

| Field | Type | Example |
|-------|------|---------|
| `overview` | text | "This project explores..." (4-6 lines) |
| `timeline` | string | "Apr - May 2025" |
| `tools` | string | "Figma, Cursor, Adobe CC" |
| `role` | string | "Product Designer" |

### 4. **Detail Page: TLDR Section**

First content section after project info:

| Field | Type | Description |
|-------|------|-------------|
| `tldr.title` | string | Section title (default: "TLDR") |
| `tldr.text` | text | Main paragraph (4-5 lines) |
| `tldr.bullets` | array | Key takeaways (3-5 bullets) |
| `tldr.image` | image | Optional image (shows on right) |

### 5. **Detail Page: Content Sections** (Array)

Add as many sections as needed. Each section contains:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Section heading (e.g., "Core Challenges") |
| `text` | text | Main paragraph |
| `bullets` | array | Optional bullet points |
| `image` | image | Optional image |
| `layout` | radio | "image-right" / "image-left" / "text-only" |

**Layout Options:**
- **Image on Right**: Text left, image right (like TLDR)
- **Image on Left**: Image left, text right
- **No Image (Text Only)**: Just text (for two-column sections)

### 6. **Detail Page: Image Gallery**

| Field | Type | Description |
|-------|------|-------------|
| `gallery.largeImage` | image | Full-width image (1180×572px) |
| `gallery.smallImages` | array | Up to 3 smaller images (381×275px each) |

### 7. **Detail Page: Conclusion**

Final section:

| Field | Type | Description |
|-------|------|-------------|
| `conclusion.title` | string | Section title (default: "Conclusion") |
| `conclusion.text` | text | Summary paragraph |
| `conclusion.bullets` | array | Final takeaways |

## 📝 How to Create a Project in Sanity Studio

### Step 1: Basic Info
1. Go to `/studio`
2. Click "Project" → "Create"
3. Fill in:
   - **Title**: "My Awesome Project"
   - **Slug**: Click "Generate" (auto-creates from title)
   - **Category**: Choose one
   - **Cover Image**: Upload thumbnail
   - **Description**: Brief 2-3 line summary
   - **Order**: 1 (or your preferred order)

### Step 2: Hero Section
- **Hero Image**: Upload large hero image

### Step 3: Project Info
- **Overview**: Write detailed project overview
- **Timeline**: "Apr - May 2025"
- **Tools**: "Figma, Cursor, Adobe CC"
- **Role**: "Product Designer"

### Step 4: TLDR Section
- **Title**: "TLDR" (or customize)
- **Text**: Write main summary paragraph
- **Bullets**: Add 3-5 key points
- **Image**: Upload section image (optional)

### Step 5: Content Sections
Click "Add Item" for each section:

**Example Section 1:**
- **Title**: "Core Challenges"
- **Text**: "Main paragraph explaining..."
- **Bullets**: ["Point 1", "Point 2", "Point 3"]
- **Image**: Upload image
- **Layout**: "Image on Right"

**Example Section 2:**
- **Title**: "Solution Design"
- **Layout**: "Image on Left"
- (etc.)

**Example Section 3 & 4** (Two-Column):
- **Layout**: "No Image (Text Only)"
- These will appear side-by-side

### Step 6: Image Gallery
- **Large Image**: Upload main showcase image
- **Small Images**: Upload 1-3 smaller images

### Step 7: Conclusion
- **Title**: "Conclusion"
- **Text**: Summary paragraph
- **Bullets**: Final takeaways

### Step 8: Publish
Click **"Publish"** to make it live!

## 🎨 Content Guidelines

### Image Sizes

| Type | Recommended Size | Aspect Ratio |
|------|-----------------|--------------|
| Cover Image (card) | 456×249px | ~1.8:1 |
| Hero Image | 1440×534px | ~2.7:1 |
| Section Image | 651×317px | ~2:1 |
| Gallery Large | 1180×572px | ~2:1 |
| Gallery Small | 381×275px | ~1.4:1 |

### Text Length Guidelines

| Field | Recommended Length |
|-------|-------------------|
| Title | 3-6 words |
| Description | 2-3 sentences |
| Overview | 3-4 sentences |
| Section Text | 2-3 paragraphs |
| Bullets | 3-5 points, 1-2 lines each |

## 🔄 Schema Field Mapping

### From Schema → Frontend Display

| Schema Field | Appears On Detail Page |
|--------------|----------------------|
| `title` | Hero section title |
| `description` | Below hero title |
| `heroImage` | Large top image |
| `overview`, `timeline`, `tools`, `role` | Project Info section |
| `tldr` | First content section |
| `contentSections[0]` | Second section (image left) |
| `contentSections[1-2]` | Two-column sections |
| `gallery` | Large + 3 small images |
| `conclusion` | Final section |

## 🎯 Example Project Structure

```
My Awesome Project
├── Basic Info
│   ├── Title: "Redesigning the Dashboard"
│   ├── Slug: redesigning-the-dashboard
│   ├── Category: Product
│   └── Order: 1
├── Hero
│   └── heroImage: [large image]
├── Project Info
│   ├── Overview: "This project focused on..."
│   ├── Timeline: "Apr - May 2025"
│   ├── Tools: "Figma, Cursor, Adobe CC"
│   └── Role: "Product Designer"
├── TLDR
│   ├── Title: "TLDR"
│   ├── Text: "Summary of entire process..."
│   └── Bullets: [3 key points]
├── Content Sections
│   ├── Section 1: "Core Challenges" (image right)
│   ├── Section 2: "Design Process" (image left)
│   ├── Section 3: "Technical Approach" (text only)
│   └── Section 4: "User Testing" (text only)
├── Gallery
│   ├── Large Image: [main showcase]
│   └── Small Images: [3 detail shots]
└── Conclusion
    ├── Title: "Conclusion"
    └── Text + Bullets
```

## 📱 Preview in Sanity Studio

Your schema includes:
- ✅ **Preview cards** showing title, category, and order
- ✅ **Section previews** showing title and layout
- ✅ **Custom ordering** by display order or title
- ✅ **Image thumbnails** in lists

## 🚀 Next Steps

1. **Set up Sanity** (if not done):
   - Go to [sanity.io](https://sanity.io)
   - Create project
   - Add credentials to `.env.local`

2. **Access Studio**:
   - Visit `http://localhost:3000/studio`
   - Or use cloud studio

3. **Create Your First Project**:
   - Follow the steps above
   - Start with minimal content
   - Add more sections as needed

4. **Test on Frontend**:
   - Visit `/projects/your-slug`
   - See your content rendered!

## 💡 Tips

### Content Strategy
- Start with 3-4 sections minimum
- Use alternating image layouts for visual interest
- Keep bullet points concise
- Use high-quality images

### Performance
- Optimize images before upload
- Use Sanity's image CDN features
- Lazy load gallery images

### SEO
- Write descriptive titles
- Include keywords in overview
- Add alt text to images (in Sanity)

Your Sanity schema is production-ready and matches your design perfectly! 🎨✨

