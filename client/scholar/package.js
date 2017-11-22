import { ProseEditorPackage } from 'substance'
import ScholarPackage from '../../packages/scholar/package'
import MenuPackage from '../../packages/menu/package'
import PersonalArchive from '../../packages/personal-archive/package'
import ExplorerPackage from '../../packages/simple-explorer/package'
import SearchExplorerPackage from '../../packages/explorer/package'
import SubjectsPackage from '../../packages/subjects/package'
import ReaderPackage from '../../packages/reader/package'
import InterviewPackage from '../../packages/interview/package'
import SourceContextPackage from '../../packages/source-context/package'
import ResourcesContextPackage from '../../packages/resources-context/package'
import SubjectsContextPackage from '../../packages/subjects-context/package'
// import InfoContextPackage from '../../packages/info-context/package'
import RespondentContextPackage from '../../packages/respondent-context/package'
import ScholarSubConfigurator from '../../packages/scholar/ScholarSubConfigurator'
import DocumentClient from './DocumentClient'
import ResourceClient from './ResourceClient'

// Entities definitions
import Person from '../../packages/person/Person'

const { ProseArticle } = ProseEditorPackage

let appConfig = 'ARCHIVISTCONFIG'
appConfig = JSON.parse(appConfig)

export default {
  name: 'archivist-scholar',
  configure: function(config) {
    config.import(ScholarPackage)
    config.import(MenuPackage)
    config.import(PersonalArchive)
    config.import(ExplorerPackage)
    config.import(SearchExplorerPackage)
    config.setDefaultLanguage(appConfig.defaultLanguage)


    // Add subconfigurators
    // Reader subconfigurator
    let ReaderConfigurator = new ScholarSubConfigurator()
    ReaderConfigurator.import(ReaderPackage)
    ReaderConfigurator.import(InterviewPackage)
    ReaderConfigurator.import(SourceContextPackage)
    ReaderConfigurator.import(SubjectsContextPackage)
    ReaderConfigurator.import(ResourcesContextPackage)
    ReaderConfigurator.import(RespondentContextPackage)
    // ReaderConfigurator.import(InfoContextPackage)
    ReaderConfigurator.setResourceTypes([
      {id: 'toponym', name: 'toponym-resources'},
      {id: 'person', name: 'person-resources'},
      {id: 'commentary', name: 'commentary-resources'}
    ])
    ReaderConfigurator.setDefaultLanguage(appConfig.defaultLanguage)
    config.addConfigurator('archivist-interview-reader', ReaderConfigurator)

    // Entities subconfigurator
    let EntitiesConfigurator = new ScholarSubConfigurator()
    EntitiesConfigurator.defineSchema({
      name: 'archivist-entities',
      version: '1.0.0',
      DocumentClass: ProseArticle
    })
    EntitiesConfigurator.addNode(Person)
    config.addConfigurator('archivist-entities', EntitiesConfigurator)

    // Subjects subconfigurator
    config.addConfigurator('archivist-subjects', new ScholarSubConfigurator().import(SubjectsPackage))

    config.setAppConfig({
      protocol: appConfig.protocol,
      host: appConfig.host,
      port: appConfig.port,
      defaultLanguage: appConfig.defaultLanguage,
      mediaServer: appConfig.mediaServer
    })

    // Define Document Client
    config.setDocumentServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/documents/')
    config.setDocumentClient(DocumentClient)
    // Define Resource Client
    config.setResourceServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/entities/')
    config.setResourceClient(ResourceClient)
  }
}
