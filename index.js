const BotiumConnectorUbitec = require('./src/connector')

module.exports = {
  PluginVersion: 1,
  PluginClass: BotiumConnectorUbitec,
  PluginDesc: {
    name: 'Botium Connector for Ubitec',
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
        label: 'Ubitec Endpoint',
        description: 'Ubitec endpoint url',
        type: 'url',
        required: true
      },
      {
        name: 'UBITEC USER',
        label: 'Ubitec User',
        description: 'Ubitec user',
        type: 'string',
        required: true
      },
      {
        name: 'UBITEC_PASSWORD',
        label: 'Ubitec Password',
        description: 'Ubitec password',
        type: 'string',
        required: true
      }
    ]
  }
}
