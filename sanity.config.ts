import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {presentationTool} from '@sanity/presentation'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {sanityComputedField} from 'sanity-plugin-computed-field'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  dataset,
  projectId,
} from './lib/sanity.api'

import {schemaTypes} from './schemas'

const SANITY_STUDIO_PREVIEW_URL = (
	process.env.SANITY_STUDIO_PREVIEW_URL
	|| 'http://localhost:3000'
)

export default defineConfig({
  name: 'anirbanbasu',
  title: '@anirbanbasu',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool(), media(), presentationTool({previewUrl: SANITY_STUDIO_PREVIEW_URL}), sanityComputedField()],
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource)
      }
    }
  },

  schema: {
    types: schemaTypes,
  },

  //productionUrl({ previewSecretId, types: ['post'], apiVersion }),
})
