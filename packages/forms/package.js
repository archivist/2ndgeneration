import SgnNodeForm from './SgnNodeForm'

export default {
  name: 'sgn-forms',
  configure: function(config) {
    config.addComponent('form', SgnNodeForm, true)

    // Form translations
    config.addLabel('person-name-placeholder', {
      en: 'Enter person\'s name',
      ru: 'Введите имя персоналии'
    })
    config.addLabel('person-description-placeholder', {
      en: 'Enter person\'s description',
      ru: 'Введите описание персоналии'
    })
    config.addLabel('person-global-placeholder', {
      en: 'Global person',
      ru: 'Глобальная персоналия'
    })
    config.addLabel('сommentary-name-placeholder', {
      en: 'Enter comment title',
      ru: 'Заголовок комментария'
    })
    config.addLabel('сommentary-description-placeholder', {
      en: 'Enter comment',
      ru: 'Введите комментарий'
    })
  }
}