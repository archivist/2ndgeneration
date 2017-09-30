import { DocumentNode } from 'substance'

/*
  Collection node.
  Holds Collection entity.

  Attributes
    - name Collection name
    - description Collection description
    - respondents related respondents
    - cover Collection page cover photo
    - published publicly available
*/
class Collection extends DocumentNode {
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

Collection.type = 'collection'

Collection.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "collection-name-placeholder" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "collection-description-placeholder" }},
  respondents: { type: '[string]', default: '', field: { type: "reference", entityType: "respondent", multi: true, placeholder: "collection-respondent-placeholder" }},
  cover: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "cover-photo-placeholder" }},
  published: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "published-placeholder", nullable: false }}
})

export default Collection
