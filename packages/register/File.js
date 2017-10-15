import { DocumentNode } from 'substance'

/*
  File node.
  Holds File entity.

  Attributes
    - name File title
    - description File description
    - respondent related respondent
    - subject related subjects
    - gallery show in gallery
    - file File name
*/
class File extends DocumentNode {
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

File.type = 'file'

File.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "file-title-placeholder" }},
  description: { type: 'string', default: '', field: { type: "prose", placeholder: "file-description-placeholder" }},
  respondent: { type: 'string', default: '', field: { type: "reference", entityType: "respondent", multi: false, placeholder: "file-respondent-placeholder" }},
  persons: {type: ['string'], default: [], field: { type: "reference", entityType: 'person', multi: true, placeholder: "file-person-placeholder"}},
  subject: { type: '[string]', default: [], field: { type: "dropdown-reference", entityType: "subject", multi: true, placeholder: "file-subject-placeholder" }},
  gallery: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "file-gallery-placeholder", nullable: false }},
  file: { type: 'string', default: '', field: { type: "image", multi: false, placeholder: "file-placeholder" }},
  position: { type: 'number', default: 0 }
})

export default File
