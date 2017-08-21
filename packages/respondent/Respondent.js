import { DocumentNode } from 'substance'

/*
  Respondent node.
  Holds Respondent entity.

  Attributes
    - name Respondent name
    - annotation very short annotation
    - biography small biography
    - cover Respondent's page cover photo
    - photo Respondent's photo
*/
class Respondent extends DocumentNode {
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

Respondent.type = 'respondent'

Respondent.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "Enter respondent name" }},
  annotation: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter respondent annotation" }},
  biography: { type: 'string', default: '', field: { type: "prose", placeholder: "Enter respondent biography" }},
  cover: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "Upload cover photo" }},
  photo: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "Upload respondent photo" }}
})

export default Respondent
