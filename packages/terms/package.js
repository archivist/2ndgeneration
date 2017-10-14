import Terms from './Terms'
import Term from './Term'
import TermConverter from './TermConverter'
import TermsImporter from './TermsImporter'

export default {
  name: 'terms',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-terms',
      version: '1.0.0',
      DocumentClass: Terms,
      defaultTextType: 'term'
    })

    config.addNode(Term)
    config.addConverter('terms', TermConverter)
    config.addImporter('terms', TermsImporter)
  }
}
