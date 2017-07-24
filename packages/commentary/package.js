import CommentaryReference from './CommentaryReference'
import CommentaryComponent from './CommentaryComponent'
import CommentaryCommand from './CommentaryCommand'
import CommentaryContextItem from './CommentaryContextItem'

export default {
  name: 'commentary',
  configure: function(config) {
    config.addNode(CommentaryReference)
    config.addCommand(CommentaryReference.type, CommentaryCommand, { nodeType: CommentaryReference.type })
    config.addIcon(CommentaryReference.type, {'fontawesome': 'fa-comments'})
    config.addComponent('commentary', CommentaryComponent)
    config.addContextItem('commentary', CommentaryContextItem)
    config.addLabel('commentary-resources', {
      en: 'Commentaries',
      ru: 'Комментарии'
    })
    config.addLabel('commentary', {
      en: 'Commentary',
      ru: 'Комментарий'
    })
  }
}