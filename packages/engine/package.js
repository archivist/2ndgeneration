let StorePackage = require('../store/package')

module.exports = {
  name: 'engine',
  configure: function(config) {
    config.import(StorePackage)
    config.import(require('./mailer/package'))
    config.import(require('archivist').AuthEnginePackage)
    config.import(require('archivist').CollabEnginePackage)
    config.import(require('archivist').SnapshotEnginePackage)
    config.import(require('./document/package'))
    config.import(require('./resource/package'))
  }
}