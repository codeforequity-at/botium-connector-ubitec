const BotiumConnectorUbitec = require('./src/connector')

module.exports = {
  PluginVersion: 1,
  PluginClass: BotiumConnectorUbitec,
  PluginDesc: {
    name: 'Ubitec Bot Framework',
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
