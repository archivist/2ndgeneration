import ToponymReference from './ToponymReference'
import ToponymComponent from './ToponymComponent'
import ToponymCommand from './ToponymCommand'
import ToponymContextItem from './ToponymContextItem'

export default {
  name: 'toponym',
  configure: function(config) {
    config.addNode(ToponymReference)
    config.addCommand(ToponymReference.type, ToponymCommand, { nodeType: ToponymReference.type })
    config.addIcon(ToponymReference.type, {'fontawesome': 'fa-globe'})
    config.addComponent('toponym', ToponymComponent)
    config.addContextItem('toponym', ToponymContextItem)
    config.addLabel('toponym-resources', {
      en: 'Toponyms',
      ru: 'Топонимы'
    })
    config.addLabel('toponym', {
      en: 'Toponym',
      ru: 'Топоним'
    })
    config.addLabel('toponym-default-name', {
      en: 'Unknown Toponym',
      ru: 'Безымянный топоним'
    })
    config.addLabel('toponym-name-placeholder', {
      en: 'Enter name',
      ru: 'Введите заголовок'
    })
    config.addLabel('toponym-description-placeholder', {
      en: 'Enter description',
      ru: 'Введите топоним'
    })
    config.addLabel('toponym-synonyms-placeholder', {
      en: 'Enter synonyms',
      ru: 'Укажите синонимы'
    })
    config.addLabel('toponym-type-placeholder', {
      en: 'Choose a type',
      ru: 'Выберите тип'
    })
  }
}
