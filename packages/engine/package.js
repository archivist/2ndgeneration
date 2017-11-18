let StorePackage = require('../store/package')

module.exports = {
  name: 'engine',
  configure: function(config) {
    config.import(StorePackage)
    config.import(require('./mailer/package'))
    config.import(require('archivist-js').AuthEnginePackage)
    config.import(require('archivist-js').CollabEnginePackage)
    config.import(require('archivist-js').SnapshotEnginePackage)
    config.import(require('./document/package'))
    config.import(require('./resource/package'))
  }
}