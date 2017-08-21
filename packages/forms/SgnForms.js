import { DefaultDOMElement } from 'substance'
import { Forms } from 'archivist'
import ImageField from './image-field/ImageField'

export default class OstForms extends Forms {
  addImageField(fieldId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = ImageField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }
}
