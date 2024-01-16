import { defineType } from 'sanity'
import { GrProjects } from "react-icons/gr";



export default defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon: GrProjects,
    preview: {
      select: {
          name: 'name',
          startDate: 'startDate',
          endDate: 'endDate',               
      },
      prepare({ name, startDate, endDate }) {
        return {
          title: name,
          subtitle: typeof startDate !== 'undefined' ? (typeof endDate !== 'undefined' ? `${startDate} - ${endDate}` : `${startDate} - `)  : '',
        }
      }
    },
    fields: [
      {
        name: 'name',
        title: 'Project name',
        type: 'string',
        validation: (Rule) => Rule.required().error('The name of the project is mandatory.'),
      },
      {
        name: 'webURL',
        title: 'Project URL',
        type: 'url',
        description: 'Optional website of the project.',
        validation: (Rule) => Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
          allowCredentials: false,
        }),
      },
      {
        name: 'startDate',
        title: 'Start date',
        type: 'date',
        description: 'Optional start date.',
      },
      {
        name: 'endDate',
        title: 'End date',
        type: 'date',
        description: 'Optional end date.',
      },
      {
        name: 'description',
        title: 'Description',
        description: 'An optional description of this project.',
        type: 'array',
        of: [{ type: 'block'}],
      },
      {
        name: 'skills',
        title: 'Skills learned or used',
        description: 'An optional ordered list of skills (not natural languages) learned or used.',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'skill'}]}],
        validation: [
          (Rule) => Rule.min(0),
          (Rule) => Rule.unique().error('Duplicates are not allowed.'),
        ]
      },
      {
        name: 'contributors',
        title: 'Contributors',
        description: 'Optional list of contributors excluding yourself.',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'contributionAuthor'}]}],
        validation: [
          (Rule) => Rule.min(0),
          (Rule) => Rule.unique().error('Duplicates are not allowed.'),
        ]
      },
      {
        name: 'relatedProjects',
        title: 'Related projects',
        description: 'Optional list of related projects. THIS NEEDS TO BE CHANGED TO A LIST OF EXPERIENCES OR EMPLOYMENTS.',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'project'}]}],
        validation: [
          (Rule) => Rule.min(0),
          (Rule) => Rule.unique().error('Duplicates are not allowed.'),
        ]
      },
      {
        name: 'keywords',
        title: 'Keywords',
        type: 'array',
        of: [{ type: 'string'}],
        options: {
          layout: 'tags',
        },
        description: 'Optional keywords: a maximum of 32 is supported.',
        validation: [
          (Rule) => Rule.min(0),
          (Rule) => Rule.max(32).error('You have too many keywords.'),
          (Rule) => Rule.unique().error('Duplicates are not allowed.'),
        ]
      },
    ],
  })