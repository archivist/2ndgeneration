import PersonPage from './Person'
import Document from './Document'

export default {
  name: 'personal-archive',
  configure: function(config) {
    config.addPage(PersonPage.pageName, PersonPage)
    config.addPage(Document.pageName, Document)
  }
}
