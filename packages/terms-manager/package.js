import TermsPage from './TermsPage'

export default {
  name: 'term-manager',
  configure: function(config) {
    config.addPage(TermsPage.pageName, TermsPage)
    config.addIcon('collapsed', { 'fontawesome': 'fa-caret-right' })
    config.addIcon('expanded', { 'fontawesome': 'fa-caret-down' })
    config.addIcon('dnd', { 'fontawesome': 'fa-arrows' })
    config.addLabel('subjects', {
      en: 'Subjects',
      ru: 'Темы'
    })
    config.addLabel('add-subject', {
      en: '+ Add subject',
      ru: '+ Добавить тему'
    })
    config.addLabel('toggle-description', {
      en: 'Toggle Description',
      ru: 'Показывать описание'
    })
    config.addLabel('edit-action', {
      en: 'Edit',
      ru: 'Редактировать'
    })
    config.addLabel('show-documents-action', {
      en: 'Documents',
      ru: 'Документы'
    })
    config.addLabel('unknown-subject', {
      en: 'Unknown Subject',
      ru: 'Безымянная тема'
    })
  }
}
