// export const schemaTypes = []

import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import photograph from './photograph'

export const schemaTypes = [post, blockContent, photograph]
/*
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent],
}
*/