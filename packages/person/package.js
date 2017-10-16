import PersonReference from './PersonReference'
import PersonComponent from './PersonComponent'
import PersonCommand from './PersonCommand'
import PersonContextItem from './PersonContextItem'

export default {
  name: 'person',
  configure: function(config) {
    config.addNode(PersonReference)
    config.addCommand(PersonReference.type, PersonCommand, { nodeType: PersonReference.type })
    config.addIcon(PersonReference.type, {'fontawesome': 'fa-address-book-o'})
    config.addComponent('person', PersonComponent)
    config.addComponent('respondent', PersonComponent)
    config.addContextItem('person', PersonContextItem)
    config.addContextItem('respondent', PersonContextItem)
    config.addLabel('person-resources', {
      en: 'Persons',
      ru: 'Персоналии'
    })
    config.addLabel('person', {
      en: 'Person',
      ru: 'Персоналия'
    })
    config.addLabel('person-default-name', {
      en: 'Unknown Person',
      ru: 'Безымянная персоналия'
    })
    config.addLabel('person-name-placeholder', {
      en: 'Enter name',
      ru: 'Укажите имя'
    })
    config.addLabel('person-description-placeholder', {
      en: 'Enter description',
      ru: 'Введите описание'
    })
    config.addLabel('person-global-placeholder', {
      en: 'Global person',
      ru: 'Глобальная персоналия'
    })
  }
}
