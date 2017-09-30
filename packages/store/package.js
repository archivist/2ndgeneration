const ChangeStorePackage = require('archivist').ChangeStorePackage
const DocumentStorePackage = require('archivist').DocumentStorePackage
const EntityStorePackage = require('archivist').EntityStorePackage
const FragmentStorePackage = require('archivist').FragmentStorePackage
const SessionStorePackage = require('archivist').SessionStorePackage
const SnapshotStorePackage = require('archivist').SnapshotStorePackage
const UserStorePackage = require('archivist').UserStorePackage
const FileStorePackage = require('./file/package')

module.exports = {
  name: 'sgn-store',
  configure: function(config) {
    config.import(ChangeStorePackage)
    config.import(DocumentStorePackage)
    config.import(EntityStorePackage)
    config.import(FragmentStorePackage)
    config.import(SessionStorePackage)
    config.import(SnapshotStorePackage)
    config.import(UserStorePackage)
    config.import(FileStorePackage)
  }
}