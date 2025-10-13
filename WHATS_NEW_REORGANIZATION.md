# What's New: Work Experience & Resume Buttons

## Summary

Based on your request, I've reorganized the portfolio to:
1. ✅ **Move Work Experience** from About page → Stack page
2. ✅ **Add Resume Download buttons** to both Home page and About page

## Changes Made

### 1. Work Experience Moved to Stack Page

**Before:** Work experience was displayed on the About page  
**After:** Work experience now appears on the Stack page below your tools

The Stack page now shows:
- **Stack section** - Your tools and technologies (top)
- **Work Experience section** - Your job history (below)

This creates a nice "professional profile" page with both your technical skills and work history in one place.

### 2. Resume Download Buttons Added

Created a new reusable `ResumeButton` component that appears on:
- **Home Page (Hero)** - Below your name and tagline
- **About Page** - Below your bio paragraphs

The button:
- Downloads resume from Sanity (if uploaded to Site Settings)
- Falls back to `/api/download-resume` route if no Sanity file
- Has two variants: `default` (smaller) and `large`
- Includes a download icon
- Has smooth hover/tap animations

### 3. About Page Simplified

The About page now focuses purely on your bio:
- Multiple bio paragraphs
- Resume download button
- Projects carousel

Work experience has been removed from this page since it now lives on Stack.

## File Changes

### New Files
```
components/
└── ResumeButton.tsx          ✨ NEW - Reusable resume download button
```

### Modified Files
```
components/
├── Hero.tsx                  ✏️ Added resume button
├── StackContent.tsx          ✏️ Added work experience section
└── AboutContent.tsx          ✏️ Removed work experience, added resume button

app/
├── stack/page.tsx            ✏️ Now fetches about data for work experience
└── about/page.tsx            ✏️ Now fetches site settings for resume button

lib/
└── queries.ts                ✏️ Updated to fetch resume file URL

types/
└── siteSettings.ts           ✏️ Updated resume file type definition
```

## How to Use

### Upload Resume to Sanity

1. Go to Sanity Studio (`/studio`)
2. Open **Site Settings**
3. Under "Resume PDF", click to upload your resume
4. Only PDF files are accepted
5. Click **Publish**

Your resume will now be available for download on both the Home and About pages!

### No Resume Uploaded?

If you haven't uploaded a resume to Sanity yet:
- The button will still appear
- It will fall back to the existing `/api/download-resume` route
- You can add the API route later or upload to Sanity

## Visual Layout

### Home Page (/)
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  Profile Picture + Name     │
│  Tagline                    │
│  [Download Resume] ← NEW    │
├─────────────────────────────┤
│  Project Grid               │
└─────────────────────────────┘
```

### About Page (/about)
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  About Me                   │
│  Bio Paragraph 1            │
│  Bio Paragraph 2            │
│  Bio Paragraph 3...         │
│  [Download Resume] ← NEW    │
├─────────────────────────────┤
│  Projects Carousel          │
└─────────────────────────────┘
```

### Stack Page (/stack)
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  Stack                      │
│  Tool 1                     │
│  Tool 2                     │
│  Tool 3...                  │
├─────────────────────────────┤
│  Work Experience ← MOVED    │
│  Company 1                  │
│  Company 2                  │
│  Company 3...               │
└─────────────────────────────┘
```

## Component Props

### ResumeButton
```typescript
interface ResumeButtonProps {
  siteSettings: SiteSettings | null
  variant?: 'default' | 'large'  // default = smaller, large = bigger
  className?: string              // optional custom classes
}
```

**Variants:**
- `default` - Smaller button (px-4 py-2, text-sm)
- `large` - Larger button (px-6 py-3, text-base)

**Usage:**
```tsx
// Small button (Hero on homepage)
<ResumeButton siteSettings={siteSettings} />

// Large button (About page)
<ResumeButton siteSettings={siteSettings} variant="large" />
```

### Updated Component Props

**StackContent** now requires both stack items and about data:
```typescript
interface StackContentProps {
  stackItems: StackItem[]
  aboutData: About | null  // ← NEW: for work experience
}
```

**AboutContent** now accepts optional site settings:
```typescript
interface AboutContentProps {
  aboutData: About | null
  siteSettings?: SiteSettings | null  // ← NEW: for resume button
}
```

## Data Structure

### Resume File in Sanity

The resume file is stored in Site Settings:
```javascript
{
  _type: "siteSettings",
  resumeFile: {
    asset: {
      _ref: "file-abc123...",
      _type: "reference",
      url: "https://cdn.sanity.io/files/.../resume.pdf"
    }
  }
}
```

The URL is automatically fetched and ready to use.

## Benefits

### Better Organization
- ✅ Stack page now serves as a complete "professional profile"
- ✅ About page focuses on storytelling and personality
- ✅ Work experience paired with technical skills makes sense

### Easy Access to Resume
- ✅ Resume accessible from homepage (first impression)
- ✅ Also available on About page (where people expect it)
- ✅ One component, reused in both places (DRY principle)

### Flexible Resume Management
- ✅ Upload directly to Sanity (no code changes needed)
- ✅ Update anytime from Studio
- ✅ Falls back to API route if needed

## Next Steps

1. **Upload your resume:**
   - Go to `/studio`
   - Open Site Settings
   - Upload your PDF under "Resume PDF"
   - Publish

2. **Test the buttons:**
   - Visit homepage and click "Download Resume"
   - Visit about page and click "Download Resume"
   - Verify the PDF downloads correctly

3. **Optional enhancements:**
   - Add analytics tracking to button clicks
   - Add a "view in new tab" option
   - Customize button styling
   - Add more social links

## Notes

- The work experience still pulls from the same `about` schema in Sanity
- No schema changes were needed
- All data remains manageable from Sanity Studio
- Components use smart fallbacks if data isn't in Sanity yet

Happy organizing! 🎉


