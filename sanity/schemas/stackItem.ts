import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'stackItem',
  title: 'Stack Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tool/Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      description: 'Brief description of how you use this tool',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Tool icon/logo (optional - can use emoji as fallback)',
    }),
    defineField({
      name: 'iconEmoji',
      title: 'Icon Emoji (Fallback)',
      type: 'string',
      description: 'Emoji to use if no image is uploaded',
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Hex color for the tool (e.g., #FF0000)',
      validation: (Rule) => 
        Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false,
        }).error('Please enter a valid hex color (e.g., #FF0000)'),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Optional link to the tool\'s website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'icon',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Untitled Tool',
        subtitle: `Order: ${order || 'N/A'} - ${subtitle?.substring(0, 50) || ''}`,
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
  ],
})

