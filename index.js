const fs = require('fs')
const path = require('path')
const BotiumConnectorUbitec = require('./src/connector')

const logo = fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64')

module.exports = {
  PluginVersion: 1,
  PluginClass: BotiumConnectorUbitec,
  PluginDesc: {
    name: 'Ubitec Bot Framework',
    avatar: logo,
    provider: 'Ubitec',
    features: {
      intentResolution: true,
      intentConfidenceScore: true,
      alternateIntents: true,
      entityResolution: true,
      entityConfidenceScore: true,
      testCaseGeneration: false
    },
    capabilities: [
      {
        name: 'UBITEC_URL',
        label: 'Consumer Endpoint',
        description: 'Path of the Botium Consumer endpoint.',
        type: 'url',
        required: true
      },
      {
        name: 'UBITEC USER',
        label: 'Username',
        description: 'Username for Basic Authentication.',
        type: 'string',
        required: true
      },
      {
        name: 'UBITEC_PASSWORD',
        label: 'Password',
        description: 'Password for Basic Authentication.',
        type: 'string',
        required: true
      }
    ]
  }
}
