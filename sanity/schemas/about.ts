import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Me',
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              rows: 4,
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              return {
                title: text?.substring(0, 60) + '...' || 'Empty paragraph',
              }
            },
          },
        },
      ],
      description: 'Add multiple paragraphs for your bio',
    }),
    defineField({
      name: 'decorativeImage',
      title: 'Decorative Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional decorative image for the about page',
    }),
    defineField({
      name: 'workExperience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'experience',
          title: 'Experience',
          fields: [
            {
              name: 'company',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role/Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'period',
              title: 'Time Period',
              type: 'string',
              placeholder: '2024–Present',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Optional brief description of your role',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Lower numbers appear first (usually reverse chronological)',
            },
          ],
          preview: {
            select: {
              company: 'company',
              role: 'role',
              period: 'period',
            },
            prepare({ company, role, period }) {
              return {
                title: company || 'Untitled Company',
                subtitle: `${role || 'No role'} • ${period || 'No period'}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
        subtitle: 'Bio and work experience',
      }
    },
  },
})


