import { Component, FontAwesomeIcon as Icon } from 'substance'
import { each, findIndex, throttle} from 'lodash-es'
const mediaDestination = '/media'

class RespondentRegister extends Component {
  constructor(...args) {
    super(...args)

    this.dragSource = null
    this.currentTarget = null
    this.updateStack = []

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
    this.send('removeDragListners')
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

    if(this.state.image) {
      el.append(
        $$('div').addClass('se-imageviewer').append(
          $$('img').attr({src: mediaDestination + '/' + this.state.image})
        )
      ).on('click', this._hideImage)
    }

    if(this.state.mode === 'upload') {
      el.append(
        $$(Modal, {
          width: 'medium'
        }).append(
          $$(Uploader, {respondent: this.props.entityId, position: items.length})
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
          }).on('click', this._showImage.bind(this, item.data.file)),
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
        )
        .ref(item.entityId)
        .on('click', this._openEditor.bind(this, item.entityId))
        .attr({draggable: true})
        .on('dragstart', this._onDragStart.bind(this, item.entityId))
        .on('dragend', this._onDragEnd)
        .on('dragover', throttle(this._onDragOver.bind(this, item.entityId), 300))


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

    resourceClient.listEntities({
      entityType: 'file',
      'data->>respondent': this.props.entityId
    }, {
      columns: ['"entityId"', 'name', 'description', 'data'],
      order: 'cast(data->>\'position\' as integer)',
      limit: 1000
    }, (err, res) => {
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
    this._fixPositions()
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

  _onDragStart(id, e) {
    this._initDrag(id, e)
  }

  _onDragEnd() {
    if(this.currentState === 'after' || this.currentState === 'before' ) {
      this._moveItem(this.dragSource, this.currentTarget, this.currentState)
    }
    this.dragSource = null
    this.currentTarget = null
    this.currentDrillTarget = null
    this.currentState = null
  }

  _onDragOver(id, e) {
    this.currentTarget = id
    let dropTarget = this.refs[id].getNativeElement()
    let activeEls = dropTarget.parentElement.querySelectorAll('.se-drop-before, .se-drop-after')
    for (let i = activeEls.length - 1; i >= 0; i--) {
      activeEls[i].classList.remove('se-drop-before', 'se-drop-after')
    }
    let elHeight = dropTarget.offsetHeight
    let after = e.offsetY >= elHeight/2
    let before = e.offsetY < elHeight/2
    if(after) {
      dropTarget.classList.add('se-drop-after')
      this.currentState = 'after'
    } else if (before) {
      dropTarget.classList.add('se-drop-before')
      this.currentState = 'before'
    }
  }

  _initDrag(id) {
    this.dragSource = id
    this.currentTarget = id
  }

  _getItemProp(id, prop) {
    let items = this.state.items
    let item = items.find(f => {return f.entityId === id})
    return item.data ? item.data[prop] : item[prop]
  }

  _moveItem(source, target, pos) {
    if(source === target) return

    let items = this.state.items
    console.info('moving', source, pos, target)
    console.info('moving', this._getItemProp(source, 'name'), pos, this._getItemProp(target, 'name'))

    let sourcePos = this._getItemProp(source, 'position')
    //let sourceParent = items.get([source, 'parent'])
    let dropPos = this._getItemProp(target, 'position')
    let targetPos = pos === 'before' ? dropPos : dropPos + 1
    //let targetParent = items.get([target, 'parent'])

    // if(sourceParent === targetParent) {
    //   if(sourcePos === targetPos) return
    //   if(sourcePos - targetPos === 1 && pos === 'after') return
    //   if(sourcePos - targetPos === -1 && pos === 'before') return
    // }

    if(sourcePos > targetPos) {
      this._fixSourceLeaf(items, sourcePos)
    }

    let targetSiblings = this.state.items
    each(targetSiblings, node => {
      if(node.data.position >= targetPos) {
        node.data.position = node.data.position + 1
        this.updateStack.push(node.entityId)
      }
    })
    console.info('new position', targetPos)
    let sourceIndex = items.findIndex(f => {return f.entityId === source})
    items[sourceIndex].data.position = targetPos
    //items.set([source, 'parent'], targetParent)
    this.updateStack.push(source)

    if(sourcePos <= targetPos) {
      this._fixSourceLeaf(items, sourcePos)
    }

    // debugging
    // let tSiblings = targetParent !== null ? items.getChildren(targetParent) : items.getRoots()
    // let tPositions = []
    // each(tSiblings, n => {
    //   tPositions.push(n.position)
    // })
    //
    // console.info('target positions', tPositions)
    // let sSiblings = sourceParent !== null ? items.getChildren(sourceParent) : items.getRoots()
    // let sPositions = []
    // each(sSiblings, n => {
    //   sPositions.push(n.position)
    // })
    // console.info('source positions', sPositions)
    items.sort((a, b) => {
      return a.data.position - b.data.position
    })
    this.extendState({
      items: items
    })

    this._performUpdate()
  }

  _fixSourceLeaf(items, sourcePos) {
    let sourceSiblings = this.state.items
    each(sourceSiblings, node => {
      if(node.data.position >= sourcePos) {
        node.data.position = node.data.position - 1
        //items.set([node.id, 'position'], node.position - 1)
        this.updateStack.push(node.entityId)
      }
    })
  }

  _fixPositions() {
    let items = this.state.items
    each(items, (node, id) => {
      node.data.position = id
      this.updateStack.push(node.entityId)
    })

    this._performUpdate()
    this._loadRegister()
  }

  _performUpdate() {
    let resourceClient = this.context.resourceClient
    let items = this.state.items
    let updated = []

    each(this.updateStack, (id) => {
      let record = items.find(f => {return f.entityId === id})
      updated.push(record)
    })

    resourceClient.updateEntities(updated, (err) => {
      if (err) {
        console.error('ERROR', err)
        return
      }

      this.updateStack = []
    })
  }

  _showImage(file, e) {
    e.preventDefault()
    e.stopPropagation()
    this.extendState({image: file})
  }

  _hideImage() {
    this.extendState({image: false})
  }
}

export default RespondentRegister
