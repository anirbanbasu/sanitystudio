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

export const schemaTypes = [
    //documents
    profileSummary,
    profile,
    publicationAuthor,
    researchPublication,
    post,
    photograph,
    photographCollection,
    skill,
    languageSkill,
    //objects
    personName,
]