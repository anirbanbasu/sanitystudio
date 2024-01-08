import { defineType } from 'sanity'

export default defineType({
    name: 'researchPublication',
    title: 'Research publication',
    type: 'document',
    fields: [
      {
        name: 'publicationType',
        title: 'Publication type',
        type: 'string',
        description: 'The BibTeX type of publication.',
        options: {
          list: [
              {title: 'Article in a journal', value: 'article'}, 
              {title: 'Book', value: 'book'},
              {title: 'Booklet', value: 'booklet'},
              {title: 'Conference paper', value: 'conference'},
              {title: 'In book', value: 'inbook'},
              {title: 'In collection', value: 'incollection'},
              {title: 'In proceedings', value: 'inproceedings'},
              {title: 'Manual', value: 'manual'},
              {title: 'Masters thesis', value: 'mastersthesis'},
              {title: 'Miscellaneous', value: 'misc'},
              {title: 'PhD thesis', value: 'phdthesis'},
              {title: 'Proceedings', value: 'proceedings'},
              {title: 'Technical report', value: 'techreport'},
              {title: 'Unpublished', value: 'unpublished'}
            ],
        },
        validation: (Rule) => Rule.required().error('The type of the publication is mandatory.'),
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Title of the publication.',
        validation: (Rule) => Rule.required().error('The title of the publication is mandatory.'),
      },
      {
        name: 'authors',
        title: 'List of authors',
        type: 'array',
        description: 'A list of authors of the publication.',
        of: [
          {
            type: 'reference',
            to: [{type: 'publicationAuthor'}],
          }
        ],
        options: {
          sortable: false,
        },
        validation: (Rule) => Rule.required().error('You need to provide at least one author for the publication.'),
      },
      {
        name: 'year',
        title: 'Year',
        type: 'number',
        description: 'Year of publication.',
        validation: (Rule) => Rule.required().error('The year of the publication is mandatory.'),
      },
      {
        name: 'month',
        title: 'Month',
        type: 'number',
        description: 'Month of publication.',
        hidden: ({ document }) => (document?.publicationType !== 'article' && 
                                   document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings' &&
                                   document?.publicationType !== 'manual' &&
                                   document?.publicationType !== 'mastersthesis' &&
                                   document?.publicationType !== 'proceedings'),
        options: {
          list: [
              {title: 'January', value: 1}, 
              {title: 'February', value: 2},
              {title: 'March', value: 3},
              {title: 'April', value: 4},
              {title: 'May', value: 5},
              {title: 'June', value: 6},
              {title: 'July', value: 7},
              {title: 'August', value: 8},
              {title: 'September', value: 9},
              {title: 'October', value: 10},
              {title: 'November', value: 11},
              {title: 'December', value: 12}
            ],
        },
      },
      {
        name: 'journal',
        title: 'Journal',
        type: 'string',
        description: 'Journal in which this article has been published.',
        hidden: ({ document }) => (document?.publicationType !== 'article'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'article' && typeof fieldValue === 'undefined') {
            return 'Journal is mandatory for a publication that is an article.'
          }
          return true        
        }),
      },
    ],
  })