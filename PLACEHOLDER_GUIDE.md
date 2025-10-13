# 🖼️ Placeholder Images Guide

Your portfolio now has beautiful, built-in placeholder images that match the Figma design aesthetic!

## What's Included

### 1. **Profile Placeholder**
Location: `components/Hero.tsx`

- Displays a gradient circle with user icon SVG
- Automatically shows when no profile image is available
- Matches the Figma design style
- Interactive hover effect (scales up)

**To replace:** Simply add your photo to the public folder and update the component (instructions below)

### 2. **Project Card Placeholders**
Location: `components/ProjectCard.tsx`

- Dark gradient background (gray-700 → gray-900)
- Subtle image icon SVG
- Matches the dark aesthetic from Figma
- Hover effects work perfectly with placeholders

**Automatically shows when:**
- No cover image is set in Sanity CMS
- Image fails to load
- Sanity is not configured yet

### 3. **Demo Projects**
Location: `lib/placeholder-data.ts`

When you first run the site (before adding Sanity projects), you'll see **6 sample projects** with:
- Different categories (Brand, Product, Development, Design)
- Sample titles
- Placeholder images
- Working hover effects

## How It Works

### Smart Image Loading

```tsx
// ProjectCard.tsx automatically handles:
1. Tries to load Sanity image
2. Falls back to placeholder on error
3. Shows gradient + icon if no image exists
```

### Placeholder Grid View

The home page shows sample projects until you add real ones:
```tsx
// app/page.tsx
- Fetches from Sanity CMS
- If empty → Shows 6 placeholder projects
- If error → Shows placeholder projects
```

## Customizing Placeholders

### Change Profile Placeholder Color

Edit `components/Hero.tsx` (line 19):

```tsx
<div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-gray-300 to-gray-400">
  // Change to your brand colors:
  // from-blue-300 to-blue-500
  // from-purple-300 to-purple-500
```

### Change Project Card Placeholder

Edit `components/ProjectCard.tsx` (line 48):

```tsx
<div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
  // Customize gradient colors to match your style
```

### Customize Demo Projects

Edit `lib/placeholder-data.ts`:

```ts
export const placeholderProjects: Project[] = [
  {
    title: 'Your Project Name',
    category: 'brand',
    // ... customize as needed
  }
]
```

## Adding Real Images

### Profile Photo

**Option 1: Replace placeholder SVG with image**

Edit `components/Hero.tsx`:

```tsx
// Replace lines 19-24 with:
<div className="w-[60px] h-[60px] rounded-full overflow-hidden">
  <Image
    src="/profile.jpg"  // Add this file to /public
    alt="Your Name"
    width={60}
    height={60}
    className="w-full h-full object-cover"
  />
</div>
```

**Option 2: Use external URL**

```tsx
<Image
  src="https://yourdomain.com/your-photo.jpg"
  // ... rest of props
/>
```

### Project Images

Add via Sanity CMS:
1. Go to http://localhost:3000/studio
2. Create/edit a project
3. Upload cover image
4. Publish

The placeholder automatically disappears when real image is added!

## Using External Placeholder Services

Want realistic demo images? Use these services:

### Unsplash (High-quality photos)

```ts
// lib/placeholder-data.ts
coverImage: {
  asset: {
    _ref: 'https://images.unsplash.com/photo-1234567890',
    _type: 'image'
  }
}
```

### Placehold.co (Custom size placeholders)

```ts
coverImage: {
  asset: {
    _ref: 'https://placehold.co/456x249',
    _type: 'image'
  }
}
```

Already configured in `next.config.mjs`! ✅

## Placeholder Features

### ✅ Responsive
- Scales properly on all devices
- Maintains aspect ratios

### ✅ Accessible
- Proper alt text handling
- Error states managed

### ✅ Performant
- SVG inline (no external requests)
- Instant loading

### ✅ Styled to Match Figma
- Dark gradients for projects
- Clean, minimal aesthetic
- Consistent with overall design

## Visual Preview

### Profile Placeholder
- **Style**: Gradient circle with user icon
- **Colors**: Gray gradient
- **Size**: 60x60px
- **Effect**: Hover scale animation

### Project Placeholder
- **Style**: Dark gradient with image icon
- **Colors**: Gray-700 to Gray-900
- **Size**: 456x249px (3:2 aspect ratio)
- **Effect**: Hover overlay + content reveal

## Tips

1. **Quick Start**: The site works perfectly with placeholders - you can preview the entire design before adding any images!

2. **Gradual Migration**: Replace placeholders one by one as you create content

3. **Error Handling**: If a Sanity image fails to load, the placeholder automatically shows

4. **Demo Mode**: Share your portfolio with placeholder projects to show the design

## Next Steps

1. ✅ Run `npm run dev` to see placeholders in action
2. ✅ Set up Sanity (or keep using placeholders for now)
3. ✅ Add your first project via Sanity Studio
4. ✅ Watch placeholders auto-replace with real images!

The placeholders look great and match your Figma design perfectly. You can launch with them or replace them as you go! 🚀

