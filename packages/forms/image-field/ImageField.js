import { Component } from 'substance'
import dropzone from 'dropzone'

class ImageField extends Component {

  shouldRerender() {
    return false
  }

  didMount() {
    let config = this.props.config
    this.authClient = config.authClient
    this.fileClient = config.fileClient
    let dzConfig = {
      url: '/api/media', 
      acceptedFiles: 'image/*,application/pdf',
      dictDefaultMessage: config.placeholder,
      paramName: 'files',
      addRemoveLinks: true,
      headers: {
        'x-access-token': this.authClient.getSessionToken()
      }
    }
    if(!config.multi) {
      dzConfig.maxFiles = 1
    }
    let domEl = this.refs.files.getNativeElement()
    this.dropzone = new dropzone(domEl, dzConfig);
    this.dropzone.on('success', (f, res) => {
      let files = this.state.files || []
      files.push(res.name)
      f.serverFileName = res.name
      this.changeValue(files)
    })
    this.dropzone.on('removedfile', f => {
      let fileName = f.serverFileName || f.name
      this.removeFile(fileName, err => {
        if(err) console.error(err)
        let files = this.state.files || []
        if(!config.multi) {
          files = files === '' ? [] : [files]
          this.dropzone.options.maxFiles = 1
        }
        let fileIndex = files.indexOf(fileName)
        files.splice(fileIndex, 1)
        this.changeValue(files)
      })
    })
  }

  render($$) {
    let el = $$('div').addClass('sc-field-image dropzone sc-field-' + this.props.fieldId)
      .ref('files')        
    
    return el
  }

  setValue(value) {
    let config = this.props.config
    if(!config.multi) {
      value = value === '' ? [] : [value]
    }
    value = value || []
    if(value.length > 0) {
      this.extendState({files: value})
      value.forEach(f => {
        let mockFile = {name: f, size: 'unknown', dataURL: '/media/' + f}

        // Call the default addedfile event handler
        this.dropzone.emit('addedfile', mockFile)

        this.dropzone.createThumbnailFromUrl(mockFile,
          this.dropzone.options.thumbnailWidth,
          this.dropzone.options.thumbnailHeight,
          this.dropzone.options.thumbnailMethod, 
          true, 
          t => {
            this.dropzone.emit('thumbnail', mockFile, t)
          }
        )

        this.dropzone.emit('complete', mockFile)

        let existingFileCount = value.length
        this.dropzone.options.maxFiles = this.dropzone.options.maxFiles - existingFileCount
      })
    }
  }

  getValue() {
    return this.state.files
  }

  changeValue(value) {
    let config = this.props.config
    if(!config.multi) {
      value = value.length > 0 ? value[0] : ''
    }
    let name = this.props.fieldId
    this.emit('commit', name, value)
    this.extendState({files: value})
  }

  removeFile(name, cb) {
    this.fileClient.deleteFile(name, cb)
  }
}

export default ImageField