import SourcesPage from './SourcesPage'

export default {
  name: 'source-manager',
  configure: function(config) {
    config.addPage(SourcesPage.pageName, SourcesPage)
    config.addLabel('sources', {
      en: 'Sources',
      ru: 'Источники'
    })
    config.addLabel('add-source', {
      en: '+ Add Source',
      ru: '+ Добавить источник'
    })
    config.addLabel('source-default-name', {
      en: 'Unknown Source',
      ru: 'Безымянный источник'
    })
    config.addLabel('source-name-placeholder', {
      en: 'Enter title',
      ru: 'Укажите название источника'
    })
    config.addLabel('source-description-placeholder', {
      en: 'Enter description',
      ru: 'Введите описание источника'
    })
  }
}
