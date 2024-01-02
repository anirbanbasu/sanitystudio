import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photograph',
  title: 'Photographs',
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
      // TODO: (1) Compute all fields in one-go? (2) Compute from drafts, if it is not published.
      name: 'focalLengthExposureTriangle',
      title: 'Focal length and the exposure triangle',
      type: 'object',
      description: 'Optional focal length and the exposure triangle: apeture, shutter speed and ISO. This data can be computed from EXIF, if available.',
      fields: [
        defineField({
          name: 'focalLength',
          type: 'computedString',
          title: 'Focal length (in mm)',
          description: 'Focal length (35mm equivalent)',
          options: {
            buttonText: 'Refresh from EXIF',
            documentQuerySelection: `
            "t": *[_type == "photograph" && _id==(^._id)]
            {
              imageData {
                asset->{ 
                  metadata {exif {"focalLength": coalesce(FocalLengthIn35mmFormat, FocalLength)}}
                }
              }
            }[0].imageData.asset.metadata.exif.focalLength`, //FocalLengthIn35mmFormat is only recorded in cameras that do not have full frame (35mm equivalent) sensors.
            reduceQueryResult: (result: {
              draft?: { t: string }
              published: { t: string }
            }) => {
              return result.published?.t.toString()
            },
          },
        }),
        defineField({
          name: 'aperture',
          type: 'computedString',
          title: 'F number',
          description: 'F number (aperture)',
          options: {
            buttonText: 'Refresh from EXIF',
            documentQuerySelection: `
            "t": *[_type == "photograph" && _id==(^._id)]
            {
              imageData {
                asset->{ 
                  metadata {exif {FNumber}}
                }
              }
            }[0].imageData.asset.metadata.exif.FNumber`,
            reduceQueryResult: (result: {
              draft?: { t: number }
              published: { t: number }
            }) => {
              //var expTime:number = result.published?.t
              return "f/" + result.published?.t
            },
          },
        }),
        defineField({
          name: 'shutterSpeed',
          type: 'computedString',
          title: 'Shutter speed (in seconds)',
          options: {
            buttonText: 'Refresh from EXIF',
            documentQuerySelection: `
            "t": *[_type == "photograph" && _id==(^._id)]
            {
              imageData {
                asset->{ 
                  metadata {exif {ExposureTime}}
                }
              }
            }[0].imageData.asset.metadata.exif.ExposureTime`,
            reduceQueryResult: (result: {
              draft?: { t: number }
              published: { t: number }
            }) => {
              //var expTime:number = result.published?.t
              return "1/" + (1/result.published?.t)
            },
          },
        }),
        defineField({
          name: 'iso',
          type: 'computedString',
          title: 'ISO',
          options: {
            buttonText: 'Refresh from EXIF',
            documentQuerySelection: `"t": *[_type=="photograph"] 
            {
              imageData {
                asset->{ 
                  metadata {exif {ISO}}
                }
              }
            }[0].imageData.asset.metadata.exif.ISO`,
            reduceQueryResult: (result: {
              draft?: { t: string }
              published: { t: string }
            }) => {
              return result.published?.t.toString()
            },
          },
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
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