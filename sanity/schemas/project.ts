import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // Basic Project Info (for homepage cards)
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Brand', value: 'brand' },
              { title: 'Product', value: 'product' },
              { title: 'Development', value: 'development' },
              { title: 'Design', value: 'design' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
      description: 'Select 1-2 categories for this project',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Card)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail shown on homepage grid',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description shown below title on detail page',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
      description: 'Optional external link to live project',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on homepage',
    }),

    // Detail Page Content
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Large hero image (1440×534px) at top of detail page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'file',
      description: 'Optional video (WebM/MP4) to replace the hero image',
      options: {
        accept: 'video/webm,video/mp4',
      },
    }),

    // Project Information Section
    defineField({
      name: 'overview',
      title: 'Project Overview',
      type: 'text',
      rows: 4,
      description: 'Detailed overview paragraph for detail page',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      placeholder: 'Apr - May 2025',
      description: 'Project timeline or duration',
    }),
    defineField({
      name: 'tools',
      title: 'Tools Used',
      type: 'string',
      placeholder: 'Figma, Cursor, Adobe CC',
      description: 'Comma-separated list of tools',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      placeholder: 'Product Designer',
      description: 'Your role in the project',
    }),

    // TLDR Section
    defineField({
      name: 'tldr',
      title: 'TLDR Section',
      type: 'object',
      description: 'Quick summary section (appears first)',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'TLDR',
        },
        {
          name: 'text',
          title: 'Main Text',
          type: 'text',
          rows: 4,
          description: 'Main paragraph text',
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Key takeaways (3-5 bullets)',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          description: 'Optional image (shows on right)',
          options: { hotspot: true },
        },
        {
          name: 'video',
          title: 'Section Video',
          type: 'file',
          description: 'Optional video (WebM/MP4) to show instead of image',
          options: { accept: 'video/webm,video/mp4' },
        },
      ],
    }),

    // Main Content Sections
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      description: 'Add multiple content sections with text + images',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Main Text',
              type: 'text',
              rows: 4,
              description: 'Main paragraph',
            },
            {
              name: 'bullets',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Optional bullet list',
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              description: 'Optional image',
              options: { hotspot: true },
            },
            {
              name: 'video',
              title: 'Section Video',
              type: 'file',
              description: 'Optional video (WebM/MP4) to show instead of image',
              options: { accept: 'video/webm,video/mp4' },
            },
            {
              name: 'layout',
              title: 'Image Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Image on Right', value: 'image-right' },
                  { title: 'Image on Left', value: 'image-left' },
                  { title: 'No Image (Text Only)', value: 'text-only' },
                ],
                layout: 'radio',
              },
              initialValue: 'image-right',
            },
          ],
          preview: {
            select: {
              title: 'title',
              layout: 'layout',
              media: 'image',
            },
            prepare({ title, layout, media }) {
              return {
                title: title || 'Untitled Section',
                subtitle: layout || 'No layout specified',
                media,
              }
            },
          },
        },
      ],
    }),

    // Image Gallery
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'object',
      description: '1 large image + 3 smaller images',
      fields: [
        {
          name: 'largeImage',
          title: 'Large Image (Full Width)',
          type: 'image',
          description: 'Main showcase image (1180×572px)',
          options: { hotspot: true },
        },
        {
          name: 'largeVideo',
          title: 'Large Video',
          type: 'file',
          description: 'Optional video (WebM/MP4) to replace the large image',
          options: { accept: 'video/webm,video/mp4' },
        },
        {
          name: 'smallImages',
          title: 'Small Images',
          type: 'array',
          of: [
            { type: 'image', options: { hotspot: true } },
            { type: 'file', title: 'Video', options: { accept: 'video/webm,video/mp4' } }
          ],
          validation: (Rule) => Rule.max(3).min(0),
          description: 'Up to 3 smaller images (381×275px each)',
        },
      ],
    }),

    // Conclusion
    defineField({
      name: 'conclusion',
      title: 'Conclusion Section',
      type: 'object',
      description: 'Final summary section',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Conclusion',
        },
        {
          name: 'text',
          title: 'Main Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      categories: 'categories',
      order: 'order',
    },
    prepare(selection) {
      const { title, media, categories, order } = selection
      const categoryStr = categories && categories.length > 0 ? categories.join(', ') : 'No categories'
      return {
        title: title || 'Untitled Project',
        subtitle: `${categoryStr} ${order ? `• Order: ${order}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})

