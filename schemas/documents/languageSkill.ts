import { defineType } from 'sanity'
import { MdOutlineLanguage } from "react-icons/md";


const levels = [ 
    {title: 'Elementary', value: 'elementary'},
    {title: 'Intermediate', value: 'intermediate'},
    {title: 'Advanced', value: 'advanced'},
    {title: 'Professional', value: 'professional'},
    {title: 'Native or bilingual', value: 'native'},  
]

export default defineType({
    name: 'languageSkill',
    title: 'Language skills',
    type: 'document',
    icon: MdOutlineLanguage,
    preview: {
      select: {
          skill: 'languageSkill',
          reading: 'readingLevel',
          writing: 'writingLevel',
          listening: 'listeningLevel',
          speaking: 'speakingLevel',
          dialect: 'dialect',               
      },
      prepare({ skill, reading, writing, listening, speaking, dialect }) {
        return {
          title: typeof dialect !== 'undefined' ? `${skill} (${dialect})` : `${skill}`,
          subtitle: `R: ${reading}; W: ${writing}; L: ${listening}; S: ${speaking}`,
        }
      }
    },
    fields: [
      {
        name: 'languageSkill',
        title: 'Language',
        type: 'string',
        description: 'Name of the language.',
        validation: (Rule) => Rule.required().error('The name of the language is mandatory.'),
      },
      {
        name: 'dialect',
        type: 'string',
        title: 'Dialect',
        description: 'Optional dialect or regional information.',
      },
      {
        name: 'readingLevel',
        type: 'string',
        title: 'Reading level',
        description: 'A self-assessed reading level of the language skill.',
        validation: (Rule) => Rule.required().error('The reading level of the language is mandatory.'),
        options: {
            list: levels,
        },
      },
      {
        name: 'writingLevel',
        type: 'string',
        title: 'Writing level',
        description: 'A self-assessed writing level of the language skill.',
        validation: (Rule) => Rule.required().error('The writing level of the language is mandatory.'),
        options: {
            list: levels,
        },
      },
      {
        name: 'listeningLevel',
        type: 'string',
        title: 'Listening level',
        description: 'A self-assessed listening level of the language skill.',
        validation: (Rule) => Rule.required().error('The listening level of the language is mandatory.'),
        options: {
            list: levels,
        },
      },
      {
        name: 'speakingLevel',
        type: 'string',
        title: 'Speaking level',
        description: 'A self-assessed speaking level of the language skill.',
        validation: (Rule) => Rule.required().error('The speaking level of the language is mandatory.'),
        options: {
            list: levels,
        },
      },
    ],
  })