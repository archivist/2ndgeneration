import CollectionsPage from './CollectionsPage'

export default {
  name: 'respondent-manager',
  configure: function(config) {
    config.addPage(CollectionsPage.pageName, CollectionsPage)
    config.addLabel('collections', {
      en: 'Collections',
      ru: 'Коллекции'
    })
    config.addLabel('add-collection', {
      en: '+ Add Collection',
      ru: '+ Добавить коллекцию'
    })
  }
}