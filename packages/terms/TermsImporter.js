import { HTMLImporter } from 'substance'
import { each } from 'lodash-es'

let converters = []

class TermsImporter extends HTMLImporter {

  importDocument(termsData, reader, facets) {
    this.reset()

    let doc = this.state.doc
    each(termsData, function(term) {
      if(reader) {
        doc.create({
          id: term.entityId,
          type: 'term',
          name: term.name,
          position: term.position || term.pos,
          count: term.cnt ? parseInt(term.cnt, 10) : 0,
          parent: term.parent || 'root',
          active: facets ? facets.indexOf(term.entityId) > -1 : false
        })
      } else {
        doc.create({
          id: term.entityId,
          type: 'term',
          name: term.data.name,
          position: term.data.position,
          count: parseInt(term.count, 10),
          edited: term.edited,
          updatedBy: term.updatedBy,
          description: term.data.description,
          parent: term.data.parent || 'root'
        })
      }
    })

    return doc
  }

  /*
    Takes an HTML string.
  */
  convertDocument(bodyEls) {
    // Just to make sure we always get an array of elements
    if (!bodyEls.length) bodyEls = [bodyEls]
    this.convertContainer(bodyEls, 'body')
  }
}

TermsImporter.converters = converters

export default TermsImporter
