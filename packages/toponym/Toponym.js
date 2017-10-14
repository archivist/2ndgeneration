import { DocumentNode } from 'substance'

/*
  Entities Toponym node.
  Holds Toponym entity.

  Attributes
    - name Toponym title
    - synonyms Toponym synonyms
    - description Toponym description
    - type Toponym type
*/
class Toponym extends DocumentNode {

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

Toponym.type = 'toponym'

Toponym.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "toponym-name-placeholder" }},
  synonyms: {type: ['string'], default: [], field: { type: "tags", placeholder: "toponym-synonyms-placeholder" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "toponym-description-placeholder" }},
  toponymType: {type: ['string'], default: [], field: { type: "reference", entityType: 'term', parent: 'a36920d85322843b4167928f71fd2472', multi: true, placeholder: "toponym-type-placeholder" }}
})

export default Toponym
