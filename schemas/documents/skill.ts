import { defineType } from 'sanity'
import { GiSkills } from "react-icons/gi";

const levels = [ 
  {title: 'Beginner', value: 1},
  {title: 'Intermediate', value: 2},
  {title: 'Advanced', value: 3},
  {title: 'Professional', value: 4},
  {title: 'Expert', value: 5},  
]

export default defineType({
    name: 'skill',
    title: 'Skills',
    description: 'Skill that is not a natural language.',
    type: 'document',
    icon: GiSkills,
    preview: {
      select: {
          skill: 'skill',
          level: 'level',
          note: 'note',               
      },
      prepare({ skill, level, note }) {
        return {
          title: `${skill}`,
          subtitle: typeof note !== 'undefined' ? `(L:${level}) ${note}` : `L:${level}`,
        }
      }
    },
    fields: [
      {
        name: 'skill',
        title: 'Skill',
        type: 'string',
        description: 'Name of the skill.',
        validation: (Rule) => Rule.required().error('The name of the skill is mandatory.'),
      },
      {
        name: 'note',
        type: 'string',
        title: 'Note',
        description: 'Optional brief note about the skill.',
      },
      {
        name: 'level',
        type: 'number',
        title: 'Skill level',
        description: 'A self-assessed level of the skill.',
        validation: (Rule) => Rule.required().error('The level of the skill is mandatory.'),
        options: {
            list: levels,
        },
      }
    ],
  })