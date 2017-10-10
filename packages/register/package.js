import RegisterPage from './RegisterPage'
import Uploader from './Uploader'

export default {
  name: 'respondent-file-register',
  configure: function(config) {
    config.addComponent('register-uploader', Uploader)
    config.addPage(RegisterPage.pageName, RegisterPage)
    config.addLabel('register', {
      en: 'File Register',
      ru: 'Опись архивов'
    })
    config.addLabel('add-file', {
      en: '+ Files',
      ru: '+ Добавить файлы'
    })
    config.addLabel('file-default-name', {
      en: 'Unknown File',
      ru: 'Безымянный файл'
    })
    config.addLabel('multi-upload-description', {
      en: 'Drag or Select Files to Upload',
      ru: 'Перетащите или выберите файлы для загрузки'
    })
  }
}
