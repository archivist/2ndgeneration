import { DocumentNode } from 'substance'

/*
  Entities Commentary node.
  Holds Commentary entity.

  Attributes
    - name Commentary title
    - description Commentary description
*/
class Commentary extends DocumentNode {

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
    let synonyms = this.synonyms
    let name = this.getName()
    if(synonyms.indexOf(name) < 0) {
      if(name !== '') synonyms.push(name)
    }
    return synonyms
  }
}

Commentary.type = 'commentary'

Commentary.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "сommentary-name-placeholder" }},
  synonyms: {type: ['string'], default: []},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "сommentary-description-placeholder" }}
})

export default Commentary
