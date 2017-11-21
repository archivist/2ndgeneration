let PublicServer = require('./PublicServer')

module.exports = {
  name: 'public-server',
  configure: function(config) {
    let server = config.getServerApp()
    let documentEngine = config.getEngine('document')
    let resourceEngine = config.getEngine('resource')
    let authEngine = config.getEngine('auth')
    let indexer = config.getEngine('indexer')
    let inspector = config.getEngine('inspector')

    let publicServer = new PublicServer({
      authEngine: authEngine,
      documentEngine: documentEngine,
      indexer: indexer,
      inspector: inspector,
      resourceEngine: resourceEngine,
      path: '/api/public'
    })
    publicServer.bind(server)
  }
}
