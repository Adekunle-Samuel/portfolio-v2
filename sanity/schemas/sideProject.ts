import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sideProject',
  title: 'Side Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
      description: 'The site visitors open / preview',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'displayUrl',
      title: 'Display URL',
      type: 'string',
      description: 'Optional. Shown in the browser bar. Leave blank to use the domain automatically.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'A short line about what this is.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'tools',
      title: 'Built with',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tools / tech used (shown as tags).',
    }),
    defineField({
      name: 'goal',
      title: 'Goal',
      type: 'text',
      rows: 2,
      description: 'What the project set out to do.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'embed',
      title: 'Embed live preview',
      type: 'boolean',
      initialValue: true,
      description:
        'Show the live site in an interactive frame. Turn OFF if the site blocks embedding (then the poster image + “Visit site” is shown instead).',
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback preview shown when embedding is off (or the site can’t be framed).',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'url', media: 'poster' },
  },
})
