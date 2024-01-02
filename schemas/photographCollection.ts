import { defineType } from 'sanity'

export default defineType({
  name: 'photographCollection',
  title: 'Photograph collections',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A succinct caption of the collection.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'caption',
        maxLength: 96,
      },
      description: 'A human readable unique identifier: use namespaces, if necessary.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'An optional rich text description of the collection.',
      type: 'array',
      of: [{ type: 'block'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'photograph',
          to: [{type: 'photograph'}],
          options: {
            disableNew: false,
          },
        }
      ],
      options: {
        layout: 'grid',
      },
      description: 'The constituent images in this collection.',
      validation: [
        (Rule) => Rule.required(),
        (Rule) => Rule.unique(),
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Optional tags: a maximum of 64 tags is supported.',
      validation: [
        (Rule) => Rule.max(64),
        (Rule) => Rule.min(0),
        (Rule) => Rule.unique(),
      ]
    },
  ],
})