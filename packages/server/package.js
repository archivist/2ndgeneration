let config = require('config')
let extend = require('lodash/extend')
let ServerConfig = extend({}, config.get('server'), {env: config.util.getEnv('NODE_ENV')})
let Database = require('./Database')
let EnginePackage = require('../engine/package')
let IndexerPackage = require('../indexer/package')
let ResourceServerPackage = require('./resource/package')
let ConverterServerPackage = require('./converter/package')
let DocumentServerPackage = require('./document/package')
let FileServerPackage = require('./file/package')
let ArchivistSubConfigurator = require('archivist').ArchivistSubConfigurator
let AuthServerPackage = require('archivist').AuthServerPackage
let CollabServerPackage = require('archivist').CollabServerPackage
let UserServerPackage = require('archivist').UserServerPackage
let InspectorPackage = require('archivist').InspectorPackage

let db = new Database()

let InterviewPackage = require('../../dist/sgn.cjs').InterviewPackage
let SubjectsPackage = require('../../dist/sgn.cjs').SubjectsPackage

module.exports = {
  name: 'sgn-server',
  configure: function(config) {
    config.setAppConfig(ServerConfig)
    config.setDBConnection(db)
    config.import(InterviewPackage)
    config.import(EnginePackage)
    config.import(IndexerPackage)
    config.import(InspectorPackage)
    config.import(AuthServerPackage)
    config.import(DocumentServerPackage)
    config.import(CollabServerPackage)
    config.import(ResourceServerPackage)
    config.import(UserServerPackage)
    config.import(FileServerPackage)
    config.import(ConverterServerPackage)

    // Subjects subconfigurator
    config.addConfigurator('archivist-subjects', new ArchivistSubConfigurator().import(SubjectsPackage))
  }
}