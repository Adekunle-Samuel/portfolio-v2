# Setup Guide

Follow these steps to get your portfolio up and running.

## Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Sanity

1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project:
   - Click "Create new project"
   - Give it a name (e.g., "Portfolio")
   - Choose "Production" dataset
   - Note your Project ID

### Step 3: Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 4: Add Profile Image

1. Add your profile photo to `public/profile.jpg`
2. Recommended size: 200x200px minimum

### Step 5: Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## Adding Content via Sanity

### Method 1: Using Sanity Studio (Recommended)

You can manage content through Sanity's cloud studio:

1. Go to `https://www.sanity.io/manage`
2. Select your project
3. Click "Studio" in the sidebar
4. Start adding projects!

### Method 2: Using Sanity Vision (Quick Testing)

1. Go to your Sanity project dashboard
2. Click "Vision" in the sidebar
3. Run queries to test your data

### Example Project Data Structure

```json
{
  "title": "My Awesome Project",
  "slug": {
    "current": "my-awesome-project"
  },
  "category": "brand",
  "coverImage": {
    "asset": {
      "_ref": "image-..."
    }
  },
  "description": "A brief description of the project",
  "projectUrl": "https://example.com",
  "order": 1
}
```

## Customization Tips

### Update Your Bio

Edit `components/Hero.tsx`:

```tsx
<h1 className="text-sm font-normal text-black">
  Hi, I'm [Your Name]
</h1>
<p className="text-xs text-gray-text leading-relaxed max-w-[266px]">
  [Your bio here]
</p>
```

### Update Social Links

Edit `components/Navigation.tsx` and `components/Footer.tsx` with your actual links:

```tsx
<a href="https://youtube.com/@yourusername">YT</a>
<a href="https://linkedin.com/in/yourusername">LI</a>
```

### Customize Colors

Edit `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      // Add your custom colors
    },
  },
}
```

### Add More Categories

Edit `sanity/schemas/project.ts`:

```ts
options: {
  list: [
    { title: 'Brand', value: 'brand' },
    { title: 'Product', value: 'product' },
    { title: 'Development', value: 'development' },
    { title: 'Design', value: 'design' },
    { title: 'Your Category', value: 'your-category' }, // Add more!
  ],
}
```

## Animations

The site uses Framer Motion for smooth animations:

- **Navigation**: Slides down on page load
- **Hero Section**: Fades in with upward motion
- **Project Cards**: Stagger animation on load
- **Hover Effects**: Smooth overlay and content reveal

You can customize these in the component files.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Deploy!

### Netlify

1. Push code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

## Troubleshooting

### Images not loading from Sanity

Make sure your `next.config.mjs` includes:

```js
images: {
  domains: ['cdn.sanity.io'],
}
```

### Environment variables not working

- Make sure `.env.local` exists in root directory
- Restart the dev server after adding env variables
- Check that variable names start with `NEXT_PUBLIC_`

### Build errors

Run these commands:

```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

## Next Steps

- Add more projects via Sanity
- Customize colors and fonts
- Add case study pages for individual projects
- Implement contact form
- Add analytics (Google Analytics, Plausible, etc.)
- Add dark mode toggle

Enjoy your new portfolio! 🚀

