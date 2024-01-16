import post from './documents/post'
import photograph from './documents/photograph'
import photographCollection from './documents/photographCollection'
import profile from './documents/profile'
import profileSummary from './documents/profileSummary'
import researchPublication from './documents/researchPublication'
import publicationAuthor from './documents/publicationAuthor'
import personName from './objects/personName'
import skill from './documents/skill'
import languageSkill from './documents/languageSkill'
import education from './documents/education'

export const schemaTypes = [
    //documents
    profile,
    education,
    researchPublication,
    skill,
    languageSkill,
    post,
    photograph,
    photographCollection,
    profileSummary,
    publicationAuthor,
    //objects
    personName,
]