import CommentariesPage from './CommentariesPage'

export default {
  name: 'commentary-manager',
  configure: function(config) {
    config.addPage(CommentariesPage.pageName, CommentariesPage)
    config.addLabel('commentary', {
      en: 'Commentary',
      ru: 'Комментарии'
    })
    config.addLabel('commentaries', {
      en: 'Commentaries',
      ru: 'Комментарии'
    })
    config.addLabel('add-commentary', {
      en: '+ Add Commentary',
      ru: '+ Добавить комментарий'
    })
  }
}
