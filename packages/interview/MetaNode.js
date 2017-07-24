import { DocumentNode } from 'substance'

/**
  Interview metadata container, holds interview metadata
*/

class MetaNode extends DocumentNode {}

MetaNode.define({
  type: 'meta',
  title: { type: 'string', default: 'Untitled Interview', field: { editor: "text", description: "Enter interview title", group: 'Person details'}},
  short_summary: { type: 'string', default: '', field: { editor: "multitext", description: "Enter short summary", collapse: 'Russian', group: 'Short summary'}},
  abstract: { type: 'string', default: '', field: { editor: "multitext", description: "Enter abstract", collapse: 'Russian', group: 'Abstract'}},
  
  // Interviewee data
  interviewee: { type: 'string', default: '', field: { editor: "text", description: "Person name", group: 'Person details'}},
  interviewee_bio: { type: 'string', default: '', field: { editor: "multitext", description: "Enter person biography", collapse: 'Biography', group: 'Person details'}},
  interviewee_place_of_birth: { type: 'string', default: '', field: { editor: "text", description: "Person place of birth", group: 'Person details'}},
  interviewee_year_of_birth: { type: 'string', default: '', field: { editor: "input", dataType: "number", description: "Person year of birth", group: 'Person details'}},
  interviewee_photo: { type: 'string', default: '', field: { editor: "text", description: "Path to photo file", group: 'Person details'}},

  // Project data
  project: { type: 'string', default: '', field: { editor: "text", description: "Enter project name", group: 'Project details'}},
  interview_location: { type: 'string', default: '', field: { editor: "text", description: "Interview location", group: 'Project details'}},
  interview_date: { type: 'string', default: '', field: { editor: "input", dataType: "date", description: "Interview date (yyyy-MM-dd)", group: 'Project details'}},
  conductor: { type: 'string', default: '', field: { editor: "text", description: "Inerviewer", group: 'Project details'}},
  operator: { type: 'string', default: '', field: { editor: "text", description: "Operator", group: 'Project details'}},
  interview_duration: { type: 'number', default: 0, field: { editor: "input", dataType: "number", description: "Duration (in minutes)", group: 'Project details'}},
  media_id: { type: 'string', default: '', field: { editor: "text", description: "Media identifier", group: 'Project details'}},

  // Document data
  published_on: { type: 'string', default: '', field: { editor: "input", dataType: "date", description: "Published date (yyyy-MM-dd)", group: 'Document details'}},
  // states: transcripted, verified, finished, published
  state: { type: 'string', default: '', field: { editor: "select", description: "Document state", options: ['transcripted', 'verified', 'finished', 'published'], group: 'Document details'}}
})

export default MetaNode