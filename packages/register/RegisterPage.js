import { SplitPane } from 'substance'
import { AbstractEntityPage } from 'archivist-js'
import { findIndex } from 'lodash-es'
import Uploader from './Uploader'

class RegisterPage extends AbstractEntityPage {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'uploadFiles': this._uploadFiles,
      'closeUploader': this._closeUploader
    })
  }

  render($$) {
    const Modal = this.getComponent('modal')

    let items = this.state.items
    let el = $$('div').addClass('sc-entity-page')
    let main = $$('div').addClass('se-entity-layout')

    let header = this.renderHeader($$)

    let toolbox = this.renderToolbox($$)
    main.append(toolbox)

    if (this.props.entityId || this.state.dialog) {
      let EntityEditor = this.getComponent('entity-editor')
      main.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(EntityEditor, {entityId: this.props.entityId})
        ).ref('modal')
      )
    }

    if(this.state.entityId && this.state.mode && this.state.mode !== 'upload') {
      let ResourceOperator = this.getComponent('resource-operator')
      let index = findIndex(items, (i) => { return i.entityId === this.state.entityId })
      main.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(ResourceOperator, {entityId: this.state.entityId, item: items[index], mode: this.state.mode})
        ).ref('modal')
      )
    }

    if(this.state.mode === 'upload') {
      main.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(Uploader)     
        ).ref('modal')
      )
    }

    if (items) {
      if (items.length > 0) {
        main.append(this.renderFull($$))
      } else {
        main.append(this.renderEmpty($$))
      }
    }

    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeA: '40px'}).append(
        header,
        main
      )
    )

    return el
  }

  renderToolbox($$) {
    let Toolbox = this.getComponent('toolbox')
    let filters = this.renderFilters($$)

    let toolbox = $$(Toolbox, {
      actions: {
        'uploadFiles': this.getLabel('add-' + this.entityType)
      },
      content: filters
    })

    return toolbox
  }

  _uploadFiles() {
    this.extendState({mode: 'upload'})
  }

  _closeUploader() {
    this.extendState({mode: ''})
  }
}

RegisterPage.entityType = 'file'
RegisterPage.pageName = 'register'

export default RegisterPage
