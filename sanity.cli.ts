import {defineCliConfig} from 'sanity/cli'

import {
  dataset,
  projectId,
} from './lib/sanity.api'

export default defineCliConfig({
  api: {
    projectId,//: 'l7tokq15',
    dataset,//: 'production'
  }
})
