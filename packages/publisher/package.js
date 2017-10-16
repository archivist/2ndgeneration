import SgnPublisherLayout from './SgnPublisherLayout'
import { BracketsPackage, CollaboratorsPackage, TabbedContextPackage } from 'archivist'
import { ContainerAnnotationPackage, FindAndReplacePackage } from 'substance'

export default {
  name: 'sgn-publisher',
  configure: function(config) {
    config.import(BracketsPackage)
    config.import(CollaboratorsPackage)
    config.import(TabbedContextPackage)
    config.addComponent('editor', SgnPublisherLayout)

    config.import(ContainerAnnotationPackage)
    config.import(FindAndReplacePackage, {
      targetSurfaces: ['body']
    })

    // Configure overlay
    config.addToolPanel('main-overlay', [
      {
        name: 'prompt',
        type: 'tool-group',
        commandGroups: ['prompt']
      }
    ])

    config.addToolPanel('workflow', [
      {
        name: 'workflow',
        type: 'tool-group',
        commandGroups: ['workflows']
      }
    ])

    // Configure toolbar
    config.addToolPanel('toolbar', [
      {
        name: 'document',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['undo-redo']
      },
      {
        name: 'annotations',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['annotations']
      },
      {
        name: 'references',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['references']
      },
      {
        name: 'utils',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['utils']
      }
    ])

    config.addLabel('find-and-replace-title', {
      en: 'Find and Replace',
      ru: 'Поиск и замена'
    })
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
    config.addLabel('сommentary-name-placeholder', {
      en: 'Enter comment title',
      ru: 'Заголовок комментария'
    })
    config.addLabel('сommentary-description-placeholder', {
      en: 'Enter comment',
      ru: 'Введите комментарий'
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
    config.addLabel('respondent-photo-placeholder', {
      en: 'Upload respondent photo',
      ru: 'Загрузите фотографию респондента'
    })
    config.addLabel('respondent-caption-placeholder', {
      en: 'Enter caption',
      ru: 'Подпись к фотографии'
    })
    config.addLabel('cover-photo-placeholder', {
      en: 'Upload cover photo',
      ru: 'Загрузите обложку страницы'
    })
    config.addLabel('published-placeholder', {
      en: 'Published',
      ru: 'Опубликовано'
    })
  }
}
