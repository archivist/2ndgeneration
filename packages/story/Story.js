import { DocumentNode } from 'substance'

/*
  Story node.
  Holds Story entity.

  Attributes
    - name Story name
    - annotation Story annotation
    - respondent related respondent
    - subject related subject
    - media media identifier
    - published publicly available
*/
class Story extends DocumentNode {
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

Story.type = 'story'

Story.define({
  name: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "story-name-placeholder" }},
  annotation: { type: 'string', default: '', field: { type: "prose", placeholder: "story-annotation-placeholder" }},
  respondent: { type: 'string', default: '', field: { type: "reference", entityType: "respondent", multi: false, placeholder: "story-respondent-placeholder" }},
  subject: { type: 'string', default: '', field: { type: "reference", entityType: "subject", multi: false, placeholder: "story-subject-placeholder" }},
  media: { type: 'string', default: '', field: { type: "text", dataType: "text", placeholder: "media-identifier-placeholder" }},
  published: { type: 'boolean', default: false, field: { type: "toggle", placeholder: "published-placeholder", nullable: false }}
})

export default Story
