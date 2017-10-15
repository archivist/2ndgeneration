import { Component, FontAwesomeIcon as Icon, InputPackage } from 'substance'

const { Input } = InputPackage

class BibliographyField extends Component {
  constructor(...args) {
    super(...args)
    this.config = this.props.config
    this.configurator = this.props.configurator
    this.labelProvider = this.configurator.getLabelProvider()
    this.componentRegistry = this.getComponentRegistry()

    this.handleActions({
      'selectEntity': this._setSource,
      'closeResourceOperator': this._toggleDialog
    })
  }

  getChildContext() {
    return {
      configurator: this.configurator,
      componentRegistry: this.componentRegistry,
      labelProvider: this.labelProvider,
      resourceClient: this.config.resourceClient,
      editorSession: {}
    }
  }

  getComponentRegistry() {
    let componentRegistry = this.configurator.getComponentRegistry()
    return componentRegistry
  }

  getInitialState() {
    return {
      labels: {},
      values: []
    }
  }

  render($$) {
    let values = this.state.values
    let openDialog = this.state.openDialog || false

    let el = $$('div').addClass('sc-field-bibliography sc-field-' + this.props.fieldId)
      .append(
        $$('div').addClass('se-bibliography-header').append(
          $$('div').addClass('se-label').append(this.getLabel('bibliography-editor-label')),
          $$('div').addClass('se-action').append(
            $$(Icon, {icon: 'fa-plus'}),
            this.getLabel('bibliography-add-source')
          ).on('click', this._addSource)
        )
      )

    if(openDialog) {
      const Modal = this.getComponent('modal')
      const ResourceOperator = this.getComponent('resource-operator')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {mode: 'search', entityType: 'source'})
        ).ref('modal')
      )
    }

    if(values) {
      values.forEach((source, id) => {
        el.append(this.renderSourceEditor($$, source, id))
      })
    }

    return el
  }

  renderSourceEditor($$, source, id) {
    let el = $$('div').addClass('se-source-editor').append(
      this.renderSourceSelector($$, source.source, id),
      $$(Input, {type: 'text', placeholder: this.getLabel('bibliography-volume-placeholder'), value: source.volume})
        .ref('volume-' + id)
        .on('change', this._onChange.bind(this, id)),
      $$(Input, {type: 'text', placeholder: this.getLabel('bibliography-page-placeholder'), value: source.page})
        .ref('page-' + id)
        .on('change', this._onChange.bind(this, id)),
      $$('div').addClass('se-action').append(
        $$(Icon, {icon: 'fa-trash'}),
        this.getLabel('bibliography-remove-source')
      ).on('click', this._deleteSource.bind(this, id))
    )

    return el
  }

  renderSourceSelector($$, sourceId, itemId) {
    let labels = this.state.labels
    let label = labels[sourceId] || sourceId || this.getLabel('bibliography-source-placeholder')
    let el = $$('div').addClass('se-source-selector')
      .append(label)
      .on('click', this._selectSource.bind(this, itemId))

    return el
  }

  getLabel(name) {
    return this.labelProvider.getLabel(name)
  }

  setValue(value) {
    this._loadValues(value)
    this.extendState({values: value})
  }

  getValue() {
    return this.state.values
  }

  _toggleDialog(e) {
    if(e) e.stopPropagation()
    this.extendState({openDialog: false, currentSource: false})
  }

  _selectSource(id) {
    this.extendState({openDialog: true, currentSource: id})
  }

  _setSource(value, e) {
    if(e) e.stopPropagation()
    let values = this.state.values
    let id = this.state.currentSource
    let source = values[id]
    source.source = value
    values[id] = source
    this.extendState({values: values})
    this._loadValue(value)
    this._commit()
  }

  _onChange(id) {
    let values = this.state.values
    let source = values[id]
    source.volume = this.refs['volume-' + id].val()
    source.page = this.refs['page-' + id].val()
    values[id] = source
    this.extendState({values: values})
    this._commit()
  }

  _addSource() {
    let values = this.state.values
    values.push({source: '', volume: '', page: ''})
    this.extendState({values: values})
  }

  _deleteSource(id) {
    let values = this.state.values
    values.splice(id, 1)
    this.extendState({values: values})
  }

  _commit() {
    let name = this.props.fieldId
    let value = this.getValue()
    this.emit('commit', name, value)
  }

  _loadValue(entityId) {
    let config = this.props.config
    let resourceClient = config.resourceClient
    resourceClient.listEntities({entityId: entityId}, {limit: 100, columns: ['"entityId"', "name"]}, (err, res) => {
      let labels = this.state.labels
      res.records.forEach(item => {
        labels[item.entityId] = item.name
      })

      this.extendState({labels: labels})
    })
  }

  _loadValues(items) {
    let config = this.props.config
    let resourceClient = config.resourceClient
    if(items.length > 0) {
      let values = items.map(s => {return s.source})
      resourceClient.listEntities({entityId: values}, {limit: 100, columns: ['"entityId"', "name"]}, (err, res) => {
        let labels = this.state.labels
        res.records.forEach(item => {
          labels[item.entityId] = item.name
        })

        this.extendState({labels: labels})
      })
    }
  }
}

export default BibliographyField
