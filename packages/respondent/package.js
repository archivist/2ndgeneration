import RespondentsPage from './RespondentsPage'

export default {
  name: 'respondent-manager',
  configure: function(config) {
    config.addPage(RespondentsPage.pageName, RespondentsPage)
    config.addLabel('respondents', {
      en: 'Respondents',
      ru: 'Респонденты'
    })
    config.addLabel('add-respondent', {
      en: '+ Add Respondent',
      ru: '+ Добавить респондента'
    })
    config.addLabel('respondent-register-header', {
      en: 'Respondent Archive',
      ru: 'Опись архива'
    })
    config.addLabel('register-no-results', {
      en: 'No files added',
      ru: 'Нет файлов'
    })
    config.addLabel('register-no-results-description', {
      en: 'Sorry, no files added yet',
      ru: 'Для данного респондента не загружен ни один файл'
    })
  }
}