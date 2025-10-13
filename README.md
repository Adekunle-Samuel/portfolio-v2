# Portfolio Website

A modern, minimalist portfolio website built with Next.js 14, Sanity CMS, and Framer Motion.

## Tech Stack

- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Sanity CMS** - Content management
- **Framer Motion** - Smooth animations
- **Next Sanity** - Sanity integration for Next.js

## Features

- ✅ Responsive design
- ✅ Smooth page animations with Framer Motion
- ✅ Project hover effects
- ✅ CMS-powered content
- ✅ Clean, minimalist UI inspired by modern portfolio designs

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

First, you need to create a Sanity project:

```bash
npm install -g @sanity/cli
sanity init
```

Follow the prompts to:
- Create a new project
- Choose a dataset name (e.g., "production")
- Note down your Project ID

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with your actual Sanity project ID.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio with beautiful placeholder images!

**Note**: The site includes built-in placeholders matching the Figma design. You'll see 6 sample projects with dark gradient placeholders until you add your own content via Sanity. See `PLACEHOLDER_GUIDE.md` for details.

### 6. Access Sanity Studio (Optional)

To manage your content via Sanity Studio UI, you'll need to set up the studio separately or access it via Sanity's hosted studio.

## Adding Projects

To add projects to your portfolio, you can either:

1. Use Sanity's hosted Studio at `https://your-project.sanity.studio`
2. Or create projects directly via the Sanity API

Each project should have:
- **Title** - Project name
- **Slug** - URL-friendly identifier
- **Category** - Brand, Product, Development, or Design
- **Cover Image** - Main project image
- **Description** - Short project description (optional)
- **Project URL** - Link to live project (optional)
- **Order** - Display order (lower numbers appear first)

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   └── ProjectGrid.tsx
├── lib/
│   ├── queries.ts
│   └── sanity.client.ts
├── sanity/
│   └── schemas/
│       ├── index.ts
│       └── project.ts
├── types/
│   └── project.ts
└── public/
    └── assets/
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize colors:

```ts
colors: {
  gray: {
    text: "#8d8d8d",
  },
}
```

### Content

Update the following in the components:
- `Hero.tsx` - Your name and bio
- `Footer.tsx` - Location and social links
- `Navigation.tsx` - Navigation items and links

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## License

MIT

