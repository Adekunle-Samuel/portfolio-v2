import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Your full name displayed on the homepage',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Your profile picture shown on the homepage hero',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      description: 'Short bio/tagline shown below your name on homepage',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload your resume PDF for download',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'dribbble', title: 'Dribbble URL', type: 'url' },
        { name: 'behance', title: 'Behance URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
        media,
      }
    },
  },
})


