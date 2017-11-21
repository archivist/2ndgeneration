import SimpleExplorer from './SimpleExplorer'

export default {
  name: 'archivist-simple-explorer',
  configure: function(config) {
    config.addPage('explorer', SimpleExplorer)
  }
}
