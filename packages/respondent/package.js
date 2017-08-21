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
  }
}