# High-Resolution Image Optimization

## Overview
All images across the portfolio have been optimized for high-resolution displays, including Retina screens.

## Changes Made

### 1. Image Quality Settings
- **Quality increased to 95%** (from 90%) for all Sanity images
- All Next.js Image components now use `quality={95}` prop
- WebP format enabled for better compression (GIF animations preserved)
- AVIF format support added in Next.js config

### 2. Retina Display Support (2x)
The `getOptimizedImageUrl` function in `/lib/sanity.client.ts` now automatically:
- Doubles requested image dimensions for retina displays
- Example: Request 912px → Downloads 1824px (2x)
- Ensures crisp images on high-DPI screens

### 3. Component Updates

#### Hero Component (`/components/Hero.tsx`)
- Profile image: 240x240px (displayed at 60x60px = 2x)
- Quality: 95%

#### Navigation Component (`/components/Navigation.tsx`)
- Logo image: High-quality with quality=95

#### ProjectCard Component (`/components/ProjectCard.tsx`)
- Cover images: 1824x996px (displayed at 912x498px = 2x)
- Quality: 95%
- Responsive sizes for different screen widths

#### AboutContent Component (`/components/AboutContent.tsx`)
- Decorative image: 1600x1200px with quality=95
- Priority loading enabled
- Responsive sizes: 100vw (mobile), 50vw (desktop)

#### Footer Component (`/components/Footer.tsx`)
- Logo: 60x60px with quality=95

### 4. Next.js Configuration (`/next.config.mjs`)
Enhanced image optimization with:
- **Device sizes**: 640, 750, 828, 1080, 1200, 1920, 2048, 3840px
- **Image sizes**: 16, 32, 48, 64, 96, 128, 256, 384px
- **Formats**: WebP and AVIF for optimal compression
- **SVG support**: Safely enabled with CSP

### 5. Project Detail Images
All project detail images automatically benefit from 2x retina resolution:
- Hero images: 5760x2136px (displayed at 2880x1068px)
- Content sections: 2800x1268px (displayed at 1400x634px)
- Gallery large images: 4720x2288px (displayed at 2360x1144px)
- Gallery small images: 1524x1100px (displayed at 762x550px)

## Benefits

1. **Crisp on All Displays**: Images look sharp on Retina, 4K, and 5K displays
2. **Optimized Loading**: Next.js automatically serves the right size for each device
3. **Modern Formats**: WebP and AVIF reduce file size by 30-50% vs JPEG
4. **Smart Caching**: Images are cached for 60+ seconds for better performance
5. **GIF Preservation**: Animated GIFs maintain their animation (no WebP conversion)

## Performance Impact

- Larger image downloads (2x dimensions) but compensated by:
  - WebP/AVIF compression (30-50% smaller)
  - Lazy loading (Next.js Image component)
  - CDN caching (Sanity CDN)
  - Browser caching

## Testing

To verify high-resolution images:
1. Open DevTools → Network tab
2. Look for image requests ending in `?w=XXXX&q=95`
3. Check that width values are 2x the display size
4. Verify WebP or AVIF format is being used

## Device Pixel Ratio Support

The setup automatically handles:
- 1x displays (standard): Uses 2x images scaled down
- 2x displays (Retina): Uses full 2x images
- 3x displays (newer phones): Next.js generates appropriate sizes

