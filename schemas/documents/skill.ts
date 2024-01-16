import { defineType } from 'sanity'
import { GiSkills } from "react-icons/gi";



export default defineType({
    name: 'skill',
    title: 'Skill',
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
          subtitle: typeof note !== 'undefined' ? `(${level}) ${note}` : `${level}`,
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
        type: 'string',
        title: 'Skill level',
        description: 'A self-assessed level of the skill.',
        validation: (Rule) => Rule.required().error('The level of the skill is mandatory.'),
        options: {
            list: [ 
                {title: 'Beginner', value: 'beginner'},
                {title: 'Intermediate', value: 'intermediate'},
                {title: 'Advanced', value: 'advanced'},
                {title: 'Expert', value: 'expert'},  
            ],
        },
      }
    ],
  })