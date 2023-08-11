// export const schemaTypes = []

import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import photograph from './photograph'
import photographCollection from './photographCollection'

export const schemaTypes = [post, blockContent, photograph, photographCollection]
/*
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent],
}
*/