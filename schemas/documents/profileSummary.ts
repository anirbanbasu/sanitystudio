/* 
    - Implement localisation using https://www.sanity.io/docs/localization.
    - A singleton instance of the profile may need to be created to ensure that only one profile exists: https://www.sanity.io/guides/singleton-document.
*/

import { defineType } from 'sanity'
import { RiProfileLine } from "react-icons/ri";

export default defineType({
    name: 'profileSummary',
    title: 'Researcher profile summary',
    type: 'document',
    icon: RiProfileLine,
    preview: {
      select: {
          title: 'name',
          subtitle: 'tagLine',
          media: 'profileImage.imageData.asset', 
          language: 'language'               
      },
      prepare({ title, subtitle, media, language }) {
        return {
          title,
          subtitle: `[${language}] ${subtitle}`,
          media,
        }
      }
    },
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'Name of the researcher.',
        validation: (Rule) => Rule.required().error('The name of the researcher is mandatory.'),
      },
      {
        name: 'tagLine',
        type: 'string',
        title: 'A tag line',
        description: 'A succinct tag line to promote the profile of the researcher.',
        validation: Rule => [
          Rule.required().error('You need to provide a tag line for the researcher profile.'),
        ],
      },
      {
        name: 'summary',
        title: 'Summary',
        description: 'A rich text summary of the researcher profile.',
        type: 'array',
        of: [{ type: 'block'}],
        validation: Rule => [
            Rule.required().error('You need to provide a summary of the researcher profile.'),
        ],
      },
      {
        name: 'keywords',
        title: 'Keywords',
        type: 'array',
        of: [{ type: 'string'}],
        options: {
          layout: 'tags',
        },
        description: 'Optional keywords: a maximum of 32 is supported. These keywords will be added to the metadata of the relevant HTML page(s).',
        validation: [
          (Rule) => Rule.min(0),
          (Rule) => Rule.max(32).error('You have too many keywords.'),
          (Rule) => Rule.unique().error('You have duplicate keywords.'),
        ]
      },
      {
        name: 'profileImage',
        title: 'Profile image',
        type: 'reference',
        to: [{ type: 'photograph'}],
        description: 'A profile picture of the researcher.',
        validation: (Rule) => Rule.required().error('The profile picture of the researcher is mandatory.'),
      },
      {
        // should match 'languageField' plugin configuration setting, if customized
        name: 'language',
        type: 'string',
        readOnly: true,
        hidden: true,
      }
    ],
  })