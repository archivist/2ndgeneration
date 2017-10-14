import { DocumentNode } from 'substance'

/*
  Respondent node.
  Holds Respondent entity.

  Attributes
    - name Respondent name
    - annotation very short annotation
    - biography small biography
    - cover Respondent page cover photo
    - photo Respondent photo
    - published publicly available
*/
class Respondent extends DocumentNode {
  // Get entity name
  getName() {
    return this.name
  }

  // Get entity description
  getDescription() {
    return this.annotation
  }

  // Get entity synonyms
  getSynonyms() {
    let synonyms = []
    return synonyms
  }
}

Respondent.type = 'respondent'

Respondent.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "respondent-name-placeholder" }},
  annotation: { type: 'string', default: '', field: { type: "prose", placeholder: "respondent-annotation-placeholder" }},
  biography: { type: 'string', default: '', field: { type: "prose", placeholder: "respondent-biography-placeholder" }},
  cover: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "cover-photo-placeholder" }},
  photo: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "respondent-photo-placeholder" }},
  bibliography: { type: ['object'], default: [], field: { type: "bibliography", placeholder: "person-bibliography-placeholder" }},
  published: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "published-placeholder", nullable: false }}
})

export default Respondent
