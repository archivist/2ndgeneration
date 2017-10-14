import TermsPage from './TermsPage'

export default {
  name: 'term-manager',
  configure: function(config) {
    config.addPage(TermsPage.pageName, TermsPage)
    config.addIcon('collapsed', { 'fontawesome': 'fa-caret-right' })
    config.addIcon('expanded', { 'fontawesome': 'fa-caret-down' })
    config.addIcon('dnd', { 'fontawesome': 'fa-arrows' })
    config.addLabel('terms', {
      en: 'Terms',
      ru: 'Словари'
    })
    config.addLabel('add-term', {
      en: '+ Add term',
      ru: '+ Добавить термин'
    })
    config.addLabel('add-term-action', {
      en: 'Add Term',
      ru: 'Добавить термин'
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
    config.addLabel('term-default-name', {
      en: 'Unknown Term',
      ru: 'Безымянный термин'
    })
    config.addLabel('term-name-placeholder', {
      en: 'Enter Name',
      ru: 'Введите название'
    })
    config.addLabel('term-description-placeholder', {
      en: 'Term Description',
      ru: 'Введите описание'
    })
  }
}
