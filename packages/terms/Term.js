import { DocumentNode } from 'substance'

/*
  Term node.
  Holds Term entity.

  Attributes
    - name Term name
    - parent Id of parent term
    - position Position of term within it's branch
    - description Term description
*/
class Term extends DocumentNode {
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

Term.type = 'term'

Term.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "term-name-placeholder" }},
  parent: { type: 'id', optional: true },
  position: { type: 'number', default: 0 },
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "term-description-placeholder" }},
  count: { type: 'number', default: 0 },
  edited: { type: 'string', default: '' },
  updatedBy: { type: 'string', default: '' },
  active: { type: 'boolean', default: false },
  expanded: { type: 'boolean', default: false }
})

export default Term
