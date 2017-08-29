import StoriesPage from './StoriesPage'

export default {
  name: 'respondent-manager',
  configure: function(config) {
    config.addPage(StoriesPage.pageName, StoriesPage)
    config.addLabel('stories', {
      en: 'Stories',
      ru: 'Сюжеты'
    })
    config.addLabel('add-story', {
      en: '+ Add Story',
      ru: '+ Добавить сюжет'
    })
  }
}