import { Component, FontAwesomeIcon as Icon } from 'substance'
import dropzone from 'dropzone'

class ImageField extends Component {

  didMount() {
    let config = this.props.config
    let dzConfig = {
      url: '/api/media', 
      acceptedFiles: 'image/*',
      dictDefaultMessage: config.placeholder
    }
    if(!config.multi) {
      dzConfig.maxFiles = 1
    }
    let domEl = this.refs.files.getNativeElement()
    this.dropzone = new dropzone(domEl, dzConfig);
  }

  render($$) {
    let config = this.props.config
    let el = $$('div').addClass('sc-field-image dropzone sc-field-' + this.props.fieldId)
      .ref('files')

        
    
    return el
  }

  setValue(value) {
    //this.refs.input.val(value)
  }

  getValue() {
    return this.refs.input.val()
  }

  _onChange() {
    let name = this.props.fieldId
    let value = this.getValue()
    this.emit('commit', name, value)
  }

}

export default ImageField