# What's New: Stack Page Simplification

## Summary

The Stack page has been simplified and CTAs have been updated:
1. ✅ **Removed Tools Section** - No longer displays tools/stack items
2. ✅ **Stack page = Work Experience + Resume CTA** only
3. ✅ **About page CTA changed** from "Download Resume" → "Work with me"

## Changes Made

### 1. Stack Page Simplified

**Before:** Stack page showed tools + work experience  
**After:** Stack page shows ONLY work experience + resume download button

The page now has a clean, professional focus:
- **Work Experience** - Your job history
- **Download Resume** button - Large CTA at the bottom

This creates a streamlined professional profile page.

### 2. About Page CTA Updated

**Before:** "Download Resume" button  
**After:** "Work with me" button

The button still links to your resume but has a more personal, inviting message that aligns with the storytelling nature of the About page.

### 3. Home Page CTA

**Unchanged:** Still shows "Download Resume" button below your intro

### 4. ResumeButton Component Enhanced

The button component now supports custom text:
- Can display any text you want
- Only shows download icon when text is "Download Resume"
- Fully customizable for different contexts

## File Changes

### Modified Files
```
components/
├── ResumeButton.tsx          ✏️ Added buttonText prop
├── StackContent.tsx          ✏️ Removed tools section entirely
└── AboutContent.tsx          ✏️ Changed button text to "Work with me"

app/
└── stack/page.tsx            ✏️ Removed stackItems fetch, added siteSettings
```

### Removed Dependencies
- Stack page no longer fetches `stackItemsQuery`
- Stack page no longer imports `StackItem` type
- StackContent no longer uses tools/icons/images

## Page Layouts Now

### Home (/)
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  Profile Picture + Name     │
│  Tagline                    │
│  [Download Resume]          │
├─────────────────────────────┤
│  Project Grid               │
└─────────────────────────────┘
```

### About (/about)
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  About Me                   │
│  Bio Paragraph 1            │
│  Bio Paragraph 2            │
│  Bio Paragraph 3...         │
│  [Work with me] ← CHANGED   │
├─────────────────────────────┤
│  Projects Carousel          │
└─────────────────────────────┘
```

### Stack (/stack) - SIMPLIFIED
```
┌─────────────────────────────┐
│  Navigation                 │
├─────────────────────────────┤
│  Work Experience            │
│                             │
│  Company 1                  │
│  • Role                     │
│  • Period                   │
│                             │
│  Company 2                  │
│  • Role                     │
│  • Period                   │
│                             │
│  Company 3                  │
│  • Role                     │
│  • Period                   │
│                             │
│  [Download Resume]          │
│                             │
└─────────────────────────────┘
```

## Component Updates

### ResumeButton Props

```typescript
interface ResumeButtonProps {
  siteSettings: SiteSettings | null
  variant?: 'default' | 'large'
  className?: string
  buttonText?: string  // ← NEW: Custom button text
}
```

**Default:** `"Download Resume"`

**Usage Examples:**
```tsx
// Home page - default text
<ResumeButton siteSettings={siteSettings} />

// About page - custom text
<ResumeButton 
  siteSettings={siteSettings} 
  variant="large" 
  buttonText="Work with me" 
/>

// Stack page - default text, large variant
<ResumeButton 
  siteSettings={siteSettings} 
  variant="large" 
/>
```

### StackContent Props - SIMPLIFIED

```typescript
// BEFORE
interface StackContentProps {
  stackItems: StackItem[]      // ❌ REMOVED
  aboutData: About | null
}

// AFTER
interface StackContentProps {
  aboutData: About | null
  siteSettings: SiteSettings | null  // ← CHANGED
}
```

## What About Stack Items?

The `stackItem` schema and related files are still in your codebase but are no longer used:

**Still exists but unused:**
- `sanity/schemas/stackItem.ts`
- `types/stackItem.ts`
- `stackItemsQuery` in `lib/queries.ts`

**Options:**
1. **Keep them** - In case you want to add tools back later
2. **Delete them** - Clean up unused code

Let me know if you want me to remove these files completely!

## Benefits

### Clearer Purpose
- ✅ Stack page = Professional resume page
- ✅ About page = Personal story + CTA
- ✅ Home page = Quick intro + resume access

### Simpler Content Management
- ✅ Less content to maintain
- ✅ Faster page loads (no images/icons)
- ✅ Focus on what matters: your experience

### Better CTA Strategy
- ✅ "Download Resume" on Home (direct, action-oriented)
- ✅ "Work with me" on About (personal, inviting)
- ✅ "Download Resume" on Stack (professional context)

## Resume Download Behavior

All three buttons still do the same thing:
1. Opens/downloads resume from Sanity (if uploaded)
2. Falls back to `/api/download-resume` route
3. Opens in new tab

The button text is just a messaging choice - the functionality is identical.

## Next Steps

### Required: None!
Everything is working and ready to go.

### Optional:
1. **Upload your resume** to Sanity if you haven't already
2. **Update work experience** in Sanity Studio
3. **Test all buttons** on each page
4. **Remove unused stack item files** (if desired)

## Clean Up (Optional)

If you want to remove the unused stack items code completely, I can delete:
- `sanity/schemas/stackItem.ts`
- `types/stackItem.ts`
- Stack items query from `lib/queries.ts`
- Stack items from schema index

Let me know if you want me to clean these up!

---

**Summary:** Stack page is now a focused work experience page with a resume CTA. About page has a more personal "Work with me" button. Everything is cleaner and more purposeful! 🎉

