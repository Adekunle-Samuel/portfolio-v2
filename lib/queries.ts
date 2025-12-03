export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  categories,
  coverImage,
  description,
  projectUrl
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  categories,
  coverImage,
  description,
  projectUrl,
  heroImage,
  heroVideo {
    asset-> {
      _id,
      url
    }
  },
  overview,
  timeline,
  tools,
  role,
  tldr {
    title,
    text,
    bullets,
    image,
    video {
      asset-> {
        _id,
        url
      }
    }
  },
  contentSections[] {
    title,
    text,
    bullets,
    image,
    video {
      asset-> {
        _id,
        url
      }
    },
    layout
  },
  gallery {
    largeImage,
    largeVideo {
      asset-> {
        _id,
        url
      }
    },
    smallImages
  },
  conclusion {
    title,
    text,
    bullets
  }
}`

export const projectSlugsQuery = `*[_type == "project"] {
  "slug": slug.current
}`

// Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  name,
  profileImage,
  tagline,
  email,
  "resumeFile": {
    "asset": {
      "_ref": resumeFile.asset->_id,
      "_type": "reference",
      "url": resumeFile.asset->url
    }
  },
  socialLinks
}`

// Stack Items Query
export const stackItemsQuery = `*[_type == "stackItem"] | order(order asc) {
  _id,
  name,
  description,
  icon,
  iconEmoji,
  color,
  order,
  url
}`

// About Page Query
export const aboutQuery = `*[_type == "about"][0] {
  _id,
  title,
  bioParagraphs[] {
    text
  },
  decorativeImage,
  workExperience[] {
    company,
    role,
    period,
    description,
    order
  }
}`

