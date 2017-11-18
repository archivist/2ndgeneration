import { ResourceSelector } from 'archivist-js'
import { find } from 'lodash-es'

class SgnResourcesSelector extends ResourceSelector {
  _onSearch(e) {
    let searchValue = this.refs['searchInput'].val()
    let entityTypeValue = this.refs['entityTypeFilter'].val()
    let entityTypes = this.state.entityTypes
    let currentEntityTypes = this.state.filters.entityType
    if(searchValue !== this.state.search || entityTypeValue !== currentEntityTypes) {
      let filters = {entityType: entityTypeValue}
      if(entityTypeValue === 'all' || e.type === 'search') {
        filters.entityType = entityTypes.concat('respondent')
      }
      this.extendState({
        search: searchValue,
        filters: filters,
        focused: undefined,
        pagination: false
      })
    }
  }

  _getAndStoreEntity(entityId, cb) {
    let resources = this.context.editorSession.resources
    let entity = find(resources, item => { return item.entityId === entityId })
    if(entity) {
      if(entity.entityType === 'respondent') entity.entityType = 'person'
      return cb(null, entity)
    } else {
      let resourceClient = this.context.resourceClient
      resourceClient.getEntity(entityId, (err, entity) => {
        if (err) return cb(err)
        if(entity.entityType === 'respondent') entity.entityType = 'person'
        resources.push(entity)
        return cb(null, entity)
      })
    }
  }
}

export default SgnResourcesSelector
