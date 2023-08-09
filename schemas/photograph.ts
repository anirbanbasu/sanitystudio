import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photograph',
  title: 'Photograph',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A succinct description of the image.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alternative text',
      description: 'An alternative text for situations where the image cannot be viewed.',
      validation: Rule => [
        Rule.required(),
      ],
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
      description: 'An optional rich text description of the image.',
      type: 'array',
      of: [{ type: 'block'}],
    },
    {
      name: 'imageData',
      title: 'Photograph',
      type: 'image',
      description: 'The main photograph asset. Privacy note: EXIF data will be read from the file but not geolocation data.',
      options: {
        hotspot: true,
        metadata: [
          'exif'
        ]
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'c2paExternalManifest',
      title: 'C2PA external manifest',
      type: 'file',
      description: 'An optional external C2PA manifest of the image. Read about C2PA at https://c2pa.org/.',
      //Use custom validator with C2PA Javascript API to verify the external manifest?
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Optional tags: a maximum of 64 tags is supported.',
      of: [{ type: 'string'}],
      validation: [
        (Rule) => Rule.max(64),
        (Rule) => Rule.min(0),
      ]
    },
  ],
})