import { AbstractEntityPage } from 'archivist-js'

class PersonsPage extends AbstractEntityPage {
  getInitialState() {
    return {
      active: {},
      filters: {entityType: ['person', 'respondent']},
      dataFilters: {},
      search: '',
      fts: false,
      perPage: 30,
      order: 'created',
      direction: 'desc',
      pagination: false,
      items: []
    }
  }
}

PersonsPage.entityType = 'person'
PersonsPage.pageName = 'persons'

export default PersonsPage
