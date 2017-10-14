import { DefaultDOMElement } from 'substance'
import { Forms } from 'archivist'
import ImageField from './image-field/ImageField'
import DropdownReferenceField from './dropdown-reference-field/DropdownReferenceField'
import BibliographyField from './bibliography-field/BibliographyField'

export default class OstForms extends Forms {
  constructor(config) {
    super(config)
    this.context = config.context
  }
  addImageField(fieldId, el, config) {
    config = config || {}
    let authClient = this.context.authenticationClient
    let fileClient = this.context.fileClient
    config.fileClient = fileClient
    config.authClient = authClient
    el = DefaultDOMElement.wrapNativeElement(el)
    let field = ImageField.mount({
      fieldId,
      config
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addDropdownReferenceField(fieldId, el, config) {
    config = config || {}
    let resourceClient = this.context.resourceClient
    config.resourceClient = resourceClient
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = DropdownReferenceField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }

  addBibliographyField(fieldId, el, config) {
    config = config || {}
    let resourceClient = this.context.resourceClient
    config.resourceClient = resourceClient
    el = DefaultDOMElement.wrapNativeElement(el)
    let configurator = this.configurator

    let field = BibliographyField.mount({
      fieldId,
      config,
      configurator
    }, el)
    field.on('commit', this._onCommit, this)
    this._editables[fieldId] = field
    return field
  }
}
