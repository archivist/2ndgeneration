import { Component } from 'substance'
import dropzone from 'dropzone'

class Uploader extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'finishEditing': this.nextForm
    })
  }

  didMount() {
    this.files = []

    let authClient = this.context.authenticationClient
    let dzConfig = {
      url: '/api/media',
      acceptedFiles: 'image/*,application/pdf',
      dictDefaultMessage: this.getLabel('multi-upload-description'),
      paramName: 'files',
      addRemoveLinks: true,
      headers: {
        'x-access-token': authClient.getSessionToken()
      }
    }
    let domEl = this.refs.files.getNativeElement()
    this.dropzone = new dropzone(domEl, dzConfig);
    this.dropzone.on('success', (f, res) => {
      this.files.push(res.name)
      f.serverFileName = res.name
      this.createFileEntity(res.name)
    }, this)
    this.dropzone.on('queuecomplete', () => {
      setTimeout(() => {
        this.showForms()
      }, 500)
    })
    this.dropzone.on('removedfile', f => {
      let fileName = f.serverFileName || f.name
      this.removeFile(fileName, err => {
        if(err) console.error(err)
        let fileIndex = this.files.indexOf(fileName)
        this.files.splice(fileIndex, 1)
      })
    })
  }

  dispose() {
    this.dropzone.removeEventListeners()
  }

  render($$) {
    let el = $$('div').addClass('se-uploader')

    if(!this.state.files) {
      el.append(
        $$('div').addClass('se-upload-files dropzone')
          .ref('files')
      )

      return el
    }

    let index = this.state.index
    let fileName = this.state.files[index]
    let entityId = fileName.split('.')[0]
    let EntityEditor = this.getComponent('entity-editor')

    el.append(
      $$(EntityEditor, {entityId: entityId})
    )

    return el
  }

  showForms() {
    this.extendState({files: this.files, index: 0})
  }

  nextForm() {
    let files = this.state.files
    let index = this.state.index
    if(files.length > index + 1) {
      this.extendState({index: index + 1})
    } else {
      this.send('closeUploader')
    }
  }

  removeFile(name, cb) {
    let fileClient = this.context.fileClient
    fileClient.deleteFile(name, cb)
  }

  createFileEntity(fileName) {
    let authenticationClient = this.context.authenticationClient
    let user = authenticationClient.getUser()
    let resourceClient = this.context.resourceClient
    let entityId = fileName.split('.')[0]
    let ext = fileName.split('.')[1]
    let entityData = {
      entityId: entityId,
      name: this.getLabel('file-default-name'),
      synonyms: [],
      description: '',
      entityType: 'file',
      userId: user.userId,
      updatedBy: user.userId,
      data: {
        file: fileName,
        gallery: ext === 'pdf' ? false : true,
        respondent: this.props.respondent ? this.props.respondent : ''
      }
    }

    resourceClient.createEntity(entityData, err => {
      if (err) {
        console.error('ERROR', err)
        return
      }
    })
  }
}

export default Uploader
