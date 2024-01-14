import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { CgProfile } from "react-icons/cg";
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {sanityComputedField} from 'sanity-plugin-computed-field'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  dataset,
  projectId,
} from './lib/sanity.api'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'anirbanbasu',
  title: '@anirbanbasu',
  icon: CgProfile,

  projectId,
  dataset,

  plugins: [structureTool(), visionTool(), media(), unsplashImageAsset(), sanityComputedField()],
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
