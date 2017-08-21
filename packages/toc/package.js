import Chapter from './Chapter'
import TocEditor from './TocEditor'

export default {
  name: 'sgn-toc',
  configure: function(config) {
    config.addNode(Chapter)
    config.addComponent('toc-editor', TocEditor)

    config.addLabel('toc-editor-label', {
      en: 'Table of Contents',
      ru: 'Оглавление'
    })
    config.addLabel('select-timecode', {
      en: 'Select timecode',
      ru: 'Выберите таймкод'
    })
    config.addLabel('add-chapter', {
      en: 'Add',
      ru: 'Добавить'
    })
    config.addLabel('remove-chapter', {
      en: 'Remove',
      ru: 'Удалить'
    })
    config.addLabel('chapter-title', {
      en: 'Enter chapter title',
      ru: 'Название главы'
    })
  }
}