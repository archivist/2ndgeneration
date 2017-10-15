import SgnNodeForm from './SgnNodeForm'

export default {
  name: 'sgn-forms',
  configure: function(config) {
    config.addComponent('form', SgnNodeForm, true)

    // Form translations
    config.addLabel('person-default-name', {
      en: 'Unknown Person',
      ru: 'Безымянная персоналия'
    })
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
    config.addLabel('commentary-default-name', {
      en: 'Unknown Commentary',
      ru: 'Безымянный комментарий'
    })
    config.addLabel('сommentary-name-placeholder', {
      en: 'Enter comment title',
      ru: 'Заголовок комментария'
    })
    config.addLabel('сommentary-description-placeholder', {
      en: 'Enter comment',
      ru: 'Введите комментарий'
    })
    config.addLabel('subject-default-name', {
      en: 'Unknown Subject',
      ru: 'Безымянная тема'
    })
    config.addLabel('subject-name-placeholder', {
      en: 'Enter subject name',
      ru: 'Введите название темы'
    })
    config.addLabel('subject-description-placeholder', {
      en: 'Enter subject description',
      ru: 'Введите описание темы'
    })
    config.addLabel('respondent-default-name', {
      en: 'Unknown Respondent',
      ru: 'Безымянный респондент'
    })
    config.addLabel('respondent-name-placeholder', {
      en: 'Enter respondent name',
      ru: 'Имя респондента'
    })
    config.addLabel('respondent-annotation-placeholder', {
      en: 'Enter short annotation',
      ru: 'Несколько слов о респонденте'
    })
    config.addLabel('respondent-biography-placeholder', {
      en: 'Enter respondent biography',
      ru: 'Биография респондента'
    })
    config.addLabel('cover-photo-placeholder', {
      en: 'Upload cover photo',
      ru: 'Загрузите обложку страницы'
    })
    config.addLabel('respondent-photo-placeholder', {
      en: 'Upload respondent photo',
      ru: 'Загрузите фотографию респондента'
    })
    config.addLabel('published-placeholder', {
      en: 'Published',
      ru: 'Опубликовано'
    })
    config.addLabel('story-default-name', {
      en: 'Unknown Story',
      ru: 'Безымянный сюжет'
    })
    config.addLabel('story-name-placeholder', {
      en: 'Enter story title',
      ru: 'Название сюжета'
    })
    config.addLabel('story-annotation-placeholder', {
      en: 'Enter story annotation',
      ru: 'Описание сюжета'
    })
    config.addLabel('story-respondent-placeholder', {
      en: 'Select related respondent',
      ru: 'Выбирите респондента'
    })
    config.addLabel('story-subject-placeholder', {
      en: 'Select related subjects',
      ru: 'Выбирите темы'
    })
    config.addLabel('media-identifier-placeholder', {
      en: 'Enter media identifier',
      ru: 'Медиа идентификатор'
    })
    config.addLabel('file-default-name', {
      en: 'Unknown File',
      ru: 'Безымянный файл'
    })
    config.addLabel('file-title-placeholder', {
      en: 'Enter file title',
      ru: 'Название файла'
    })
    config.addLabel('file-description-placeholder', {
      en: 'Enter story description',
      ru: 'Описание файла'
    })
    config.addLabel('file-respondent-placeholder', {
      en: 'Select related respondent',
      ru: 'Выбирите респондента'
    })
    config.addLabel('file-person-placeholder', {
      en: 'Select related persons',
      ru: 'Выбирите персоналии'
    })
    config.addLabel('file-subject-placeholder', {
      en: 'Select related subjects',
      ru: 'Выбирите темы'
    })
    config.addLabel('file-gallery-placeholder', {
      en: 'Show file in gallery',
      ru: 'Показывать в галерее'
    })
    config.addLabel('file-placeholder', {
      en: 'Upload file',
      ru: 'Выбирите или перетащите файл'
    })
    config.addLabel('collection-default-name', {
      en: 'Unknown Collection',
      ru: 'Безымянная коллекция'
    })
    config.addLabel('collection-name-placeholder', {
      en: 'Enter collection name',
      ru: 'Название коллекции'
    })
    config.addLabel('collection-description-placeholder', {
      en: 'Enter collection description',
      ru: 'Описание коллекции'
    })
    config.addLabel('collection-respondent-placeholder', {
      en: 'Select related respondents',
      ru: 'Выбирите респондентов'
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
    config.addLabel('bibliography-editor-label', {
      en: 'Biliography',
      ru: 'Библиография'
    })
    config.addLabel('bibliography-add-source', {
      en: 'Add Source',
      ru: 'Добавить источник'
    })
    config.addLabel('bibliography-remove-source', {
      en: 'Remove Source',
      ru: 'Убрать источник'
    })
    config.addLabel('bibliography-source-placeholder', {
      en: 'Select Source',
      ru: 'Выберите источник'
    })
    config.addLabel('bibliography-volume-placeholder', {
      en: 'Volume',
      ru: 'Том'
    })
    config.addLabel('bibliography-page-placeholder', {
      en: 'Page',
      ru: 'Стр'
    })
  }
}
