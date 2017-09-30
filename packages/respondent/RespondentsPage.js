import { SplitPane } from 'substance'
import { AbstractEntityPage } from 'archivist'
import { findIndex } from 'lodash-es'
import RespondentRegister from './RespondentRegister'

class RespondentsPage extends AbstractEntityPage {
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
        }).addClass('se-respondent-editor').append(
          $$(EntityEditor, {entityId: this.props.entityId}),
          $$(RespondentRegister, {entityId: this.props.entityId})
        ).ref('modal')
      )
    }

    if(this.state.entityId && this.state.mode) {
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
}

RespondentsPage.entityType = 'respondent'
RespondentsPage.pageName = 'respondents'

export default RespondentsPage
