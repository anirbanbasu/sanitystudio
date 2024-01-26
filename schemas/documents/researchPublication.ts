import { defineType } from 'sanity'
import { IoNewspaperOutline } from "react-icons/io5";

export default defineType({
    name: 'researchPublication',
    title: 'Research publication',
    type: 'document',
    icon: IoNewspaperOutline,
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
            to: [{type: 'contributionAuthor'}],
          }
        ],
        options: {
          sortable: false,
        },
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'manual' && typeof fieldValue === 'undefined') {
            return true // ok, no authors for a manual
          }
          return 'You need to provide at least one author for the publication.'       
        }),
      },
      {
        name: 'year',
        title: 'Year',
        type: 'number',
        description: 'Year of publication.',
        validation: (Rule) => Rule.required().error('The year of the publication is mandatory.'),
      },
      {
        name: 'school',
        title: 'School',
        type: 'string',
        description: 'The school or university with the degree programme requiring this thesis.',
        hidden: ({ document }) => (document?.publicationType !== 'mastersthesis' &&
                                   document?.publicationType !== 'phdthesis'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'mastersthesis' && typeof fieldValue === 'undefined') {
            return 'Publisher is mandatory for a publication that is a Masters thesis.'
          }
          if (context.document?.publicationType === 'phdthesis' && typeof fieldValue === 'undefined') {
            return 'Publisher is mandatory for a publication that is a PhD thesis.'
          }
          return true        
        }),
      },
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        description: 'The type of the thesis, e.g., Masters thesis.',
        hidden: ({ document }) => (document?.publicationType !== 'phdthesis' &&
                                   document?.publicationType !== 'mastersthesis'),
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
                                   document?.publicationType !== 'phdthesis' &&
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
        name: 'volume',
        title: 'Volume',
        type: 'number',
        description: 'Volume in which this publication appears.',
        hidden: ({ document }) => (document?.publicationType !== 'article' &&
                                   document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
      },
      {
        name: 'number',
        title: 'Number',
        type: 'number',
        description: 'Volume number in which this publication appears.',
        hidden: ({ document }) => (document?.publicationType !== 'article' &&
                                   document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
      },
      {
        name: 'pages',
        title: 'Pages',
        type: 'string',
        description: 'The page numbers on which this publication appears.',
        hidden: ({ document }) => (document?.publicationType !== 'article' &&
                                   document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
      },
      {
        name: 'editor',
        title: 'Editor',
        type: 'string',
        description: 'The editor(s) for this publication.',
        hidden: ({ document }) => (document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
      },
      {
        name: 'edition',
        title: 'Edition',
        type: 'string',
        description: 'The edition for this publication.',
        hidden: ({ document }) => (document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'manual'),
      },
      {
        name: 'series',
        title: 'Series',
        type: 'string',
        description: 'The series in which this publication appears.',
        hidden: ({ document }) => (document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' && 
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
      },
      {
        name: 'organisation',
        title: 'Organisation',
        type: 'string',
        description: 'The organisation that published or sponsored this work.',
        hidden: ({ document }) => (document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inproceedings' &&
                                   document?.publicationType !== 'manual'),
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
      {
        name: 'publisher',
        title: 'Publisher',
        type: 'string',
        description: 'The publisher of this publication.',
        hidden: ({ document }) => (document?.publicationType !== 'book' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'book' && typeof fieldValue === 'undefined') {
            return 'Publisher is mandatory for a publication that is a book.'
          }
          if (context.document?.publicationType === 'inbook' && typeof fieldValue === 'undefined') {
            return 'Publisher is mandatory for a publication that is in a book.'
          }
          if (context.document?.publicationType === 'incollection' && typeof fieldValue === 'undefined') {
            return 'Publisher is mandatory for a publication that is in a collection.'
          }
          return true        
        }),
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
        description: 'Addresser of the publisher of this publication.',
        hidden: ({ document }) => (document?.publicationType !== 'book' &&
                                   document?.publicationType !== 'booklet' &&
                                   document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings' &&
                                   document?.publicationType !== 'manual' &&
                                   document?.publicationType !== 'mastersthesis' &&
                                   document?.publicationType !== 'phdthesis'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'book' && typeof fieldValue === 'undefined') {
            return 'Address of the publisher is mandatory for a publication that is a book.'
          }
          if (context.document?.publicationType === 'booklet' && typeof fieldValue === 'undefined') {
            return 'Address of the publisher is mandatory for a publication that is a booklet.'
          }
          return true        
        }),
      },
      {
        name: 'howPublished',
        title: 'How published',
        type: 'string',
        description: 'How has this work been published?',
        hidden: ({ document }) => (document?.publicationType !== 'booklet'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'booklet' && typeof fieldValue === 'undefined') {
            return 'This field is mandatory for a publication that is a booklet.'
          }
          return true        
        }),
      },
      {
        name: 'bookTitle',
        title: 'Book title',
        type: 'string',
        description: 'Title of the book in which this publication appears.',
        hidden: ({ document }) => (document?.publicationType !== 'conference' &&
                                   document?.publicationType !== 'inbook' &&
                                   document?.publicationType !== 'incollection' &&
                                   document?.publicationType !== 'inproceedings'),
        validation: (Rule) => Rule.custom((fieldValue, context) => {
          if (context.document?.publicationType === 'conference' && typeof fieldValue === 'undefined') {
            return 'This field is mandatory for a publication that is a conference.'
          }
          if (context.document?.publicationType === 'inbook' && typeof fieldValue === 'undefined') {
            return 'This field is mandatory for a publication in a book.'
          }
          if (context.document?.publicationType === 'incollection' && typeof fieldValue === 'undefined') {
            return 'This field is mandatory for a publication in a collection.'
          }
          if (context.document?.publicationType === 'inproceedings' && typeof fieldValue === 'undefined') {
            return 'This field is mandatory for a publication in proceedings.'
          }
          return true        
        }),
      },
      {
        name: 'notes',
        title: 'Notes',
        type: 'text',
        description: 'Notes for this publication.',
      },
    ],
  })