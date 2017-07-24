import CommentariesPage from './CommentariesPage'

export default {
  name: 'commentary-manager',
  configure: function(config) {
    config.addPage(CommentariesPage.pageName, CommentariesPage)
  }
}