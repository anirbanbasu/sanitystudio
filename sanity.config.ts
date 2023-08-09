import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  dataset,
  projectId,
} from './lib/sanity.api'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'anirbanbasu--visualarts',
  title: 'Visual Arts @anirbanbasu',

  projectId,//: 'l7tokq15',
  dataset,//: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  //productionUrl({ previewSecretId, types: ['post'], apiVersion }),
})
