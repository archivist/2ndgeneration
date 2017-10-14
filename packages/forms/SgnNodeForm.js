import { NodeForm } from 'archivist'
import { each } from 'lodash-es'
import SgnForms from './SgnForms'

class OstNodeForm extends NodeForm {
  constructor(...args) {
    super(...args)

    this.forms = new SgnForms({configurator: this.context.configurator, context: this.context})
  }

  didMount() {
    each(this.fields, function(field, id) {
      if(field.config.placeholder) {
        field.config.placeholder = this.getLabel(field.config.placeholder)
      }

      if(field.config.type === 'text') {
        this.forms.addTextField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'prose') {
        field.value = field.value || '<p></p>'
        this.forms.addRichTextArea(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setHTML(id, field.value)
      } else if(field.config.type === 'select') {
        this.forms.addSelectField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'tags') {
        this.forms.addTagsField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'multiple') {
        this.forms.addMultipleField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'toggle') {
        this.forms.addToggleField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'reference') {
        this.forms.addReferenceField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'image') {
        this.forms.addImageField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'dropdown-reference') {
        this.forms.addDropdownReferenceField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      } else if(field.config.type === 'bibliography') {
        this.forms.addBibliographyField(id, this.refs[id].getNativeElement(), field.config)
        this.forms.setValue(id, field.value)
      }
    }.bind(this))

    this.forms.on('commit', this._commit, this)
    this.forms.on('document:changed', this._updateHtml, this)
  }

  _updateHtml(params) {
    let editorId = params.editorId
    let editor = this.forms._editables[editorId]
    this._commit(editorId, editor.getHTML())
  }
}

export default OstNodeForm
