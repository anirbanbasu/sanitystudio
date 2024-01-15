import { defineType } from "sanity";
import { GiHumanTarget } from "react-icons/gi";

export default defineType({
    name: 'publicationAuthor',
    title: 'Publication author',
    type: 'document',
    icon: GiHumanTarget,
    description: 'An author of a publication.',
    preview: {
      select: {
          authorType: 'authorType',
          familyName: 'familyName',
          organisationName: 'organisationName',
          givenNames: 'givenNames',
          orcid: 'orcid',
          image: 'imageRef.imageData.asset',                
      },
      prepare: ({ authorType, familyName, organisationName, givenNames, orcid, image }) => {
          return {
              title: authorType === 'Person' ? (typeof givenNames!=='undefined' ? `${familyName}, ${givenNames.join(' ')}` : `${familyName}`) : organisationName,
              subtitle: authorType === 'Person' ? typeof orcid!=='undefined' ? `${authorType} (${orcid})` : `${authorType}` : authorType,
              media: image,
          }
      },
    },
    fields: [
      {
        name: 'authorType',
        title: 'Type of author',
        type: 'string',
        description: 'Identify the type of author.',
        options: {
          list: [
              {title: 'Person', value: 'Person'}, 
              {title: 'Organisation', value: 'Organisation'},
            ],
            layout: 'radio',
        },
        validation: (Rule) => Rule.required().error('The type of the publication is mandatory.'),
      },
      {
        name: 'familyName',
        title: 'Family name',
        type: 'string',
        description: 'Family name of the author.',
        hidden: ({ document }) => (document?.authorType !== 'Person'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.authorType === 'Person' && typeof fieldValue === 'undefined') {
            return 'Family name is mandatory for a person.'
          }
          return true        
        }),
      },
      {
        name: 'organisationName',
        title: 'Name',
        type: 'string',
        description: 'Name of the organisation.',
        hidden: ({ document }) => (document?.authorType !== 'Organisation'),
        validation: [
            (Rule) => Rule.custom((fieldValue, context) => {
                if (context.document?.authorType === 'Organisation' && typeof fieldValue === 'undefined') {
                    return 'Name of the organisation is mandatory.'
                }
                return true        
                })
        ]
      },  
      {
        name: 'givenNames',
        title: 'Given names',
        type: 'array',
        of: [{ type: 'string'}],
        description: 'A list of given names of the author. A minimum of 1 and a maximum of 16 names are supported.',
        hidden: ({ document }) => (document?.authorType !== 'Person'),
        validation: [
          (Rule) => Rule.required().min(1).error('You need to provide at least one name for the author.'),
          (Rule) => Rule.max(16).error('You have too many names for the author.'),
        ]
      },
      {
        name: 'orcid',
        title: 'ORCiD of the author',
        type: 'string',
        description: 'Optional ORCiD of the author.',
        hidden: ({ document }) => (document?.authorType !== 'Person'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.authorType === 'Person') {
            if (typeof fieldValue === 'undefined') {
                return true // allow empty ORCiD
            }
            else {
                const orcidRegex = /^(\d{4}-){3}\d{3}(\d|X)$/gi
                if (orcidRegex.test(typeof fieldValue === 'string' ? fieldValue : '')) { 
                    return true
                }
                else {
                    return 'The ORCiD must be in the form of 0000-0000-0000-0000.'
                }
            }
         }
         return true // does not matter for organisations
        }),
      },
      {
        name: 'imageRef',
        title: 'Image',
        type: 'reference',
        to: [{ type: 'photograph'}],
        description: 'An optional profile picture of a person or a logo of an organisation.',
      },
    ],
  })