# 🚀 Quick Start (5 Minutes)

Get your portfolio running in 5 simple steps!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Create Sanity Account (2 min)

1. Visit [sanity.io/get-started](https://www.sanity.io/get-started)
2. Sign up (free account)
3. Create a new project:
   - Name: "My Portfolio"
   - Dataset: "production"
4. **Copy your Project ID** (you'll see it after creation)

## Step 3: Configure Environment (30 sec)

Create `.env.local` in the root folder:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=paste_your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 4: Start Development (30 sec)

```bash
npm run dev
```

Visit:
- **Portfolio**: http://localhost:3000 (see placeholders in action!)
- **CMS Studio**: http://localhost:3000/studio

**Note**: The site will show beautiful placeholder images until you add your own projects! ✨

---

## Now What?

### Add Your First Project

1. Go to http://localhost:3000/studio
2. Click "Project" → "Create"
3. Fill in:
   - **Title**: "My Awesome Project"
   - **Slug**: Click "Generate"
   - **Category**: Choose one
   - **Cover Image**: Upload an image
   - **Project URL**: (optional) Link to live project
   - **Order**: 1
4. Click "Publish"
5. Refresh http://localhost:3000 to see it!

### Customize Your Info

#### Update Your Bio
`components/Hero.tsx` - Line 17-21

#### Update Social Links
- `components/Navigation.tsx` - Lines 28-45
- `components/Footer.tsx` - Lines 36-58

#### Update Footer Location
`components/Footer.tsx` - Lines 27-33

---

## Deploy to Vercel (Optional)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
6. Click "Deploy"
7. Done! Your site is live! 🎉

---

## Need Help?

- 📖 Full docs: `README.md`
- 🔧 Detailed setup: `SETUP.md`
- 📋 Overview: `PROJECT_OVERVIEW.md`

**You're ready to go!** 🚀

