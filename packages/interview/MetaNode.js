import { DocumentNode } from 'substance'

/**
  Interview metadata container, holds interview metadata
*/

class MetaNode extends DocumentNode {}

MetaNode.define({
  type: 'meta',
  short_summary: { type: 'string', default: '', field: { editor: "multitext", description: "short-summary-description", collapse: 'russian', group: 'short-summary'}},
  abstract: { type: 'string', default: '', field: { editor: "multitext", description: "abstract-description", collapse: 'russian', group: 'abstract'}},
  
  // Interviewee data
  title: { type: 'string', default: 'Безымянное интервью', field: { editor: "text", description: "title-description", group: 'person-details'}},
  interviewee: { type: 'string', default: '', field: { editor: "reference", entityType: ["respondent"], multi: false, description: "interviewee-description", group: 'person-details'}},
  interviewee_bio: { type: 'string', default: '', field: { editor: "multitext", description: "bio-description", collapse: 'biography', group: 'person-details'}},
  interviewee_place_of_birth: { type: 'string', default: '', field: { editor: "text", description: "place-of-birth-description", group: 'person-details'}},
  interviewee_year_of_birth: { type: 'string', default: '', field: { editor: "input", dataType: "number", description: "year-of-birth-description", group: 'person-details'}},
  interviewee_photo: { type: 'string', default: '', field: { editor: "text", description: "photo-file-description", group: 'person-details'}},

  // Project data
  project: { type: 'string', default: '', field: { editor: "text", description: "project-name-description", group: 'project-details'}},
  interview_location: { type: 'string', default: '', field: { editor: "text", description: "interview-location-description", group: 'project-details'}},
  interview_date: { type: 'string', default: '', field: { editor: "input", dataType: "date", description: "interview-date-description", group: 'project-details'}},
  conductor: { type: 'string', default: '', field: { editor: "text", description: "conductor-description", group: 'project-details'}},
  operator: { type: 'string', default: '', field: { editor: "text", description: "operator-description", group: 'project-details'}},
  interview_duration: { type: 'number', default: 0, field: { editor: "input", dataType: "number", description: "duration-description", group: 'project-details'}},
  media_id: { type: 'string', default: '', field: { editor: "text", description: "media-id-description", group: 'project-details'}},

  // Document data
  published_on: { type: 'string', default: '', field: { editor: "input", dataType: "date", description: "published-description", group: 'document-details'}},
  // states: transcripted, verified, finished, published
  state: { type: 'string', default: '', field: { editor: "select", description: "document-state-description", options: ['transcripted', 'verified', 'finished', 'published'], group: 'document-details'}},

  // Table of contents
  toc: { type: ['chapter'], default: [] }
})

export default MetaNode