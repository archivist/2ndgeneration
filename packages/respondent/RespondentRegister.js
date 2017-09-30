import { Component, FontAwesomeIcon as Icon } from 'substance'
import { findIndex } from 'lodash-es'
const mediaDestination = '/media'

class RespondentRegister extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'uploadFiles': this._uploadFiles,
      'closeUploader': this._closeUploader,
      'finishEditing': this._doneEditing,
      'closeResourceOperator': this._closeResourceOperator,
      'deleteEntity': this._closeResourceOperator
    })
  }

  didMount() {
    this._loadRegister()
  }

  render($$) {
    const Grid = this.getComponent('grid')
    const Modal = this.getComponent('modal')
    const Toolbox = this.getComponent('toolbox')
    const Uploader = this.getComponent('register-uploader')

    let items = this.state.items
    let toolbox = $$(Toolbox, {
      actions: {
        'uploadFiles': this.getLabel('add-file')
      },
      content: $$('h3').append(this.getLabel('respondent-register-header'))
    })
    let el = $$('div').addClass('sc-respondent-register').append(
      $$('div').addClass('sc-toolbox').append(
        toolbox
      )
    )

    if(this.state.mode === 'upload') {
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(Uploader, {respondent: this.props.entityId})     
        ).ref('modal')
      )
    }

    if (this.state.entityId && !this.state.mode) {
      let EntityEditor = this.getComponent('entity-editor')
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(EntityEditor, {entityId: this.state.entityId})
        ).ref('modal')
      )
    }

    if(this.state.entityId && this.state.mode) {
      let ResourceOperator = this.getComponent('resource-operator')
      let index = findIndex(items, (i) => { return i.entityId === this.state.entityId })
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {entityId: this.state.entityId, item: items[index], mode: this.state.mode})
        ).ref('modal')
      )
    }

    let grid = $$(Grid)

    if(items && items.length > 0) {
      items.forEach((item) => {
        let row = $$('div').addClass('se-row se-file').append(
          $$(Grid.Cell, {columns: 2}).addClass('se-thumbnail').attr({
            style: 'background-image: url("' + mediaDestination + '/s200/' + item.data.file + '");'
          }),
          $$(Grid.Cell, {columns: 8}).append(
            $$('div').addClass('se-title').setInnerHTML(item.name),
            $$('div').addClass('se-description').setInnerHTML(item.description)
          ),
          $$(Grid.Cell, {columns: 1}).addClass('se-gallery').append(
            $$(Icon, {icon: item.data.gallery ? 'fa-eye' : 'fa-eye-slash'})
          ),
          $$(Grid.Cell, {columns: 1}).addClass('se-remove').append(
            $$(Icon, {icon: 'fa-trash'})
          ).on('click', e => {
            e.stopPropagation()
            this._removeItem(item.entityId)
          })
        ).on('click', this._openEditor.bind(this, item.entityId))

        grid.append(row)
      })

      el.append(grid)
    } else {
      el.append(
        $$('h1').html(
          this.getLabel('register-no-results')
        ),
        $$('p').html(this.getLabel('register-no-results-description'))
      )
    }

    return el
  }

  _loadRegister() {
    let resourceClient = this.context.resourceClient

    resourceClient.listEntities({entityType: 'file', 'data->>respondent': this.props.entityId}, {columns: ['"entityId"', 'name', 'description', 'data'], limit: 1000}, (err, res) => {
      if (err) console.error('ERROR', err)
      this.extendState({
        items: res.records,
        total: parseInt(res.total, 10)
      })
    })
  }

  _openEditor(entityId) {
    this.extendState({entityId: entityId})
  }

  _uploadFiles() {
    this.extendState({mode: 'upload'})
  }

  _closeUploader() {
    this.extendState({mode: undefined})
    this._loadRegister()
  }

  _doneEditing() {
    this.refs.modal.triggerDispose()
    this.extendState({entityId: undefined, mode: undefined})
    this._loadRegister()
  }

  _removeItem(entityId) {
    this.extendState({entityId: entityId, mode: 'delete'})
  }

  _closeResourceOperator() {
    this.extendState({entityId: undefined, mode: undefined})
    this._loadRegister()
  }
}

export default RespondentRegister