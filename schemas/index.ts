import post from './documents/post'
import photograph from './documents/photograph'
import photographCollection from './documents/photographCollection'
import profile from './documents/profile'
import researchPublication from './documents/researchPublication'
import personName from './objects/personName'
import skill from './documents/skill'
import languageSkill from './documents/languageSkill'
import education from './documents/education'
import contributionAuthor from './documents/contributionAuthor'
import project from './documents/project'

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
    project,
    contributionAuthor,
    //objects
    personName,
]