import { Component } from 'substance'

// Sample data for debugging
// import DataSample from '../../data/docs'

class Explorer extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'openPerson': this._openPerson
    })
  }

  didMount() {
    this._loadData()
  }

  getInitialState() {
    return {
      perPage: 30
    }
  }

  render($$) {
    const items = this.state.items
    const urlHelper = this.context.urlHelper
    let el = $$('div').addClass('sc-explorer')

    let Menu = this.getComponent('menu')
    el.append($$(Menu))

    if (!items) {
      return el
    }

    let list = $$('div').addClass('se-person-list')

    items.forEach(item => {
      const itemUrl = urlHelper.openPerson(item.entityId)
      list.append(
        $$('a').addClass('se-item').append(item.name)
          .attr('href', itemUrl)
      )
    })

    el.append(list)

    return el
  }

  _openPerson(personId) {
    const urlHelper = this.context.urlHelper
    urlHelper.openPerson(personId)
  }

  _loadData() {
    let pagination = this.state.pagination
    let perPage = this.state.perPage
    let options = {
      order: this.state.order,
      limit: perPage,
      offset: pagination ? this.state.items.length : 0
    }
    let resourceClient = this.context.resourceClient

    resourceClient.listRespondents({}, (err, persons) => {
      this.extendState({
        items: persons.records,
        total: persons.total
      })
    })
  }
}

export default Explorer
