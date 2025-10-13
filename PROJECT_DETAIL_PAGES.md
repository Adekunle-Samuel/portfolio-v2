# Project Detail Pages Documentation

## Overview

Your portfolio now includes dynamic project detail pages at `/projects/[project-name]` that showcase in-depth case studies for each project.

## 📁 Structure

### Route
```
/projects/[slug]
```

Example: `/projects/project-name`

### Components Created

```
components/project/
├── ProjectHero.tsx          # Large hero image + title/description
├── ProjectInfo.tsx          # Overview, timeline, tools, role
├── ContentSection.tsx       # Reusable text + image sections
├── ImageGrid.tsx            # Large image + 3 smaller images
├── ProjectCarousel.tsx      # Navigation to other projects
└── BackButton.tsx           # Return to homepage
```

## 🎨 Page Layout (from Figma)

The detail page follows this structure:

1. **Navigation Bar** (reused from home)
2. **Hero Image** - Full-width large image (1440×534px)
3. **Title Section** - Project name and description
4. **Project Info** - Overview, Timeline, Tools, Role
5. **Content Sections** - Multiple text + image layouts
   - TLDR (text left, image right)
   - Paragraph 1 (text right, image left)
   - Two-column section (Core Challenges + Paragraph 2)
   - Image Gallery (1 large + 3 small images)
   - Conclusion
6. **Project Carousel** - Horizontal scrolling carousel of other projects
7. **Back Button** - Return to homepage
8. **Footer** (reused from home)

## 🖼️ Features

### 1. Hero Section
- Large hero image at top
- Elegant placeholder gradient if no image
- Project title and description below

### 2. Project Information
- Left side: Overview (longer description)
- Right side: Timeline, Tools, Role (metadata)
- Responsive layout

### 3. Content Sections
- Flexible text + image layouts
- Support for bullet points
- Alternating layouts (image left/right)
- Smooth scroll animations

### 4. Image Gallery
- 1 large full-width image (1180px × 572px)
- 3 smaller images in a row (381px × 275px each)
- Hover scale effects

### 5. Project Carousel
- Shows other projects (excluding current)
- Grayscale by default, color on hover
- Clickable - navigates to project detail
- Smooth animations

### 6. Placeholder System
All images use the same elegant placeholder system:
- Dark gradients (matching home page)
- SVG image icons
- Consistent aesthetic

## 🔗 Navigation

### From Home to Detail
Click any project card → Opens `/projects/[slug]`

### From Detail to Detail
Use carousel at bottom → Navigate between projects

### Back to Home
Click "Back to homepage" button

## 📊 Data Structure

### Current (Placeholder)
Uses `placeholderProjects` from `lib/placeholder-data.ts`

### Future (Sanity CMS)
The Sanity schema now includes:

```typescript
{
  // Basic fields
  title: string
  slug: string
  category: string
  coverImage: image (for card)
  
  // Detail page fields
  heroImage: image (large hero)
  overview: text
  timeline: string
  tools: string
  role: string
  
  // Content sections
  content: {
    tldr: {
      title: string
      text: text
      bullets: string[]
      image: image
    }
    sections: [
      {
        title: string
        text: text
        bullets: string[]
        image: image
        layout: 'image-left' | 'image-right'
      }
    ]
    gallery: {
      largeImage: image
      smallImages: image[] (max 3)
    }
  }
}
```

## 🎭 Animations

All components use Framer Motion:

- **Hero**: Fade in
- **Project Info**: Fade up
- **Content Sections**: Fade up on scroll
- **Images**: Scale on hover
- **Carousel**: Stagger animation + grayscale filter
- **Back Button**: Scale on hover

## 📱 Responsive Design

### Desktop (>1024px)
- Full Figma layout
- Two-column layouts
- Large images

### Tablet (768-1023px)
- Single column for most sections
- Smaller images
- Maintained spacing

### Mobile (<768px)
- Full single column
- Stacked content
- Touch-friendly carousel

## 🎨 Styling

Matches home page aesthetic:
- Typography: Inter font
- Colors: Black text, gray accents (#8d8d8d)
- Spacing: Consistent with home
- Borders: Subtle gray dividers

## 🚀 How to Use

### 1. Preview with Placeholders

Navigate to any project from homepage:
```
http://localhost:3000
→ Click a project card
→ See full detail page with placeholders
```

### 2. Carousel Navigation

At bottom of detail page:
- Hover over thumbnails (they turn from grayscale to color)
- Click to navigate to that project
- Smooth page transitions

### 3. Add Real Content (Later)

Via Sanity Studio:
1. Go to `/studio`
2. Edit a project
3. Fill in detail page fields:
   - Hero Image
   - Overview
   - Timeline, Tools, Role
   - Content sections
   - Gallery images
4. Publish

## 🔧 Customization

### Change Layout

Edit `app/projects/[slug]/page.tsx`:
```tsx
// Rearrange sections
// Add/remove content blocks
// Change spacing
```

### Modify Components

Each component is self-contained:
- `ProjectHero.tsx` - Hero section
- `ContentSection.tsx` - Text + image sections
- etc.

### Update Placeholder Content

Edit `app/projects/[slug]/page.tsx`:
```tsx
const getProjectDetail = (slug: string) => {
  return {
    overview: "Your custom overview",
    timeline: "Your timeline",
    // etc.
  }
}
```

## 📋 Content Guidelines

### Hero Image
- **Size**: 1440×534px recommended
- **Aspect**: ~2.7:1
- **Format**: JPG or PNG

### Section Images
- **Standard**: 651×317px
- **Format**: JPG or PNG
- **Content**: Project screenshots, mockups, etc.

### Gallery Images
- **Large**: 1180×572px
- **Small**: 381×275px (3 images)
- **Format**: JPG or PNG

### Text Content

**Overview**: 2-3 sentences summarizing the project

**Timeline**: Short format (e.g., "Apr - May 2025")

**Tools**: Comma-separated (e.g., "Figma, Cursor, Adobe CC")

**Role**: Your role (e.g., "Product Designer")

**Section Text**: 2-3 paragraphs + 3-5 bullet points

## 🎯 Key Features

✅ **Dynamic Routing** - Works with any slug
✅ **Smooth Animations** - Framer Motion throughout
✅ **Placeholder System** - Looks great without images
✅ **Responsive** - Mobile, tablet, desktop
✅ **SEO Ready** - Proper meta tags, semantic HTML
✅ **CMS Ready** - Full Sanity schema
✅ **Navigation** - Carousel + back button
✅ **Type Safe** - Full TypeScript support

## 🐛 Troubleshooting

### 404 Error
- Check slug matches exactly (lowercase, hyphenated)
- Ensure project exists in `placeholderProjects`

### Images Not Loading
- Check file paths
- Verify Sanity image URLs (when connected)

### Carousel Not Showing
- Need at least 2 projects total
- Current project is excluded

### Layout Issues
- Check browser width (may need responsive adjustments)
- Verify Tailwind classes

## 📚 Related Files

- `app/projects/[slug]/page.tsx` - Main page
- `components/project/*` - All components
- `sanity/schemas/project.ts` - CMS schema
- `lib/placeholder-data.ts` - Sample data
- `components/ProjectCard.tsx` - Updated with links

## 🎉 What's Working

- ✅ Click project cards → Opens detail page
- ✅ All sections render with placeholders
- ✅ Smooth animations throughout
- ✅ Carousel navigation functional
- ✅ Back button returns home
- ✅ Responsive on all devices
- ✅ Ready for Sanity CMS integration

## 🔜 Next Steps

1. **Add Real Content**
   - Use Sanity Studio to add project details
   - Upload actual images
   - Write case study content

2. **Enhance Features**
   - Add image lightbox/modal
   - Implement image captions
   - Add prev/next navigation
   - Create related projects section

3. **SEO Optimization**
   - Add meta descriptions
   - Implement Open Graph tags
   - Add structured data

4. **Performance**
   - Optimize images
   - Add lazy loading
   - Implement image blur placeholders

Your project detail pages are production-ready! 🚀

