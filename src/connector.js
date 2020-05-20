const util = require('util')
const debug = require('debug')('botium-connector-ubitec')

const SimpleRestContainer = require('botium-core/src/containers/plugins/SimpleRestContainer')
const CoreCapabilities = require('botium-core/src/Capabilities')

const Capabilities = {
  UBITEC_URL: 'UBITEC_URL',
  UBITEC_USER: 'UBITEC_USER',
  UBITEC_PASSWORD: 'UBITEC_PASSWORD'
}

const Defaults = {
}

class BotiumConnectorUbitec {
  constructor ({ queueBotSays, caps }) {
    this.queueBotSays = queueBotSays
    this.caps = caps
    this.delegateContainer = null
    this.delegateCaps = null
  }

  Validate () {
    debug('Validate called')

    this.caps = Object.assign({}, Defaults, this.caps)

    if (!this.caps[Capabilities.UBITEC_URL]) throw new Error('UBITEC_URL capability required')
    if (!this.delegateContainer) {
      let endpointUrl = this.caps[Capabilities.UBITEC_URL]
      if (!endpointUrl.endsWith('/')) {
        endpointUrl = endpointUrl + '/'
      }

      const headers = {}
      if (this.caps[Capabilities.UBITEC_USER]) {
        const basicAuthToken = Buffer.from(`${this.caps[Capabilities.UBITEC_USER]}:${this.caps[Capabilities.UBITEC_PASSWORD] || ''}`).toString('base64')
        headers.Authorization = `Basic ${basicAuthToken}`
      }

      this.delegateCaps = {
        [CoreCapabilities.SIMPLEREST_URL]: `${endpointUrl}`,
        [CoreCapabilities.SIMPLEREST_METHOD]: 'POST',
        [CoreCapabilities.SIMPLEREST_HEADERS_TEMPLATE]: headers,
        [CoreCapabilities.SIMPLEREST_BODY_TEMPLATE]: `{
          "text": "{{msg.messageText}}"
        }`,
        [CoreCapabilities.SIMPLEREST_REQUEST_HOOK]: ({ requestOptions, msg }) => {
          requestOptions.headers['User-ID'] = Buffer.from('Botium').toString('base64')
          requestOptions.headers['User-Label'] = Buffer.from('Botium').toString('base64')
          if (msg.header && msg.header.projectname) {
            requestOptions.headers['Botium-Project'] = `${msg.header.projectname}`
          }
          if (msg.header && msg.header.testsessionname) {
            requestOptions.headers['Botium-TestSession'] = `${msg.header.testsessionname}`
          }
          if (msg.header && msg.header.name) {
            requestOptions.headers['Botium-TestCase'] = `${msg.header.name}`
          }
          if (msg.conversation) {
            const currentStep = msg.conversation[msg.currentStepIndex]
            requestOptions.headers['Botium-TestStep'] = `${currentStep.stepTag}`
          }
        },
        [CoreCapabilities.SIMPLEREST_CONTEXT_JSONPATH]: '$',
        [CoreCapabilities.SIMPLEREST_BODY_JSONPATH]: '$.messages[*]',
        [CoreCapabilities.SIMPLEREST_RESPONSE_JSONPATH]: '$.messageText',
        [CoreCapabilities.SIMPLEREST_RESPONSE_HOOK]: ({ botMsg, botMsgRoot }) => {
          Object.assign(botMsg, botMsgRoot)
        }
      }
      for (const capKey of Object.keys(this.caps).filter(c => c.startsWith('SIMPLEREST'))) {
        if (!this.delegateCaps[capKey]) this.delegateCaps[capKey] = this.caps[capKey]
      }

      debug(`Validate delegateCaps ${util.inspect(this.delegateCaps)}`)
      this.delegateContainer = new SimpleRestContainer({ queueBotSays: this.queueBotSays, caps: this.delegateCaps })
    }

    debug('Validate delegate')
    return this.delegateContainer.Validate()
  }

  Build () {
    return this.delegateContainer.Build()
  }

  Start () {
    return this.delegateContainer.Start()
  }

  UserSays (msg) {
    return this.delegateContainer.UserSays(msg)
  }

  Stop () {
    return this.delegateContainer.Stop()
  }

  Clean () {
    return this.delegateContainer.Clean()
  }
}

module.exports = BotiumConnectorUbitec
