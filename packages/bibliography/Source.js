import { DocumentNode } from 'substance'

/*
  Source node.
  Holds Source entity.

  Attributes
    - name Source name
    - description Source description
*/
class Source extends DocumentNode {
  // Get entity name
  getName() {
    return this.name
  }

  // Get entity description
  getDescription() {
    return this.description
  }

  // Get entity synonyms
  getSynonyms() {
    let synonyms = []
    return synonyms
  }
}

Source.type = 'source'

Source.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "source-name-placeholder" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "source-description-placeholder" }}
})

export default Source
