import { ProseEditorPackage } from 'substance'
import { ArchivistPackage, ArchivistSubConfigurator, CommentsPackage, DocumentsPackage, IndentationPackage, MetadataEditorPackage, ResourcesPackage, TimecodeAnnotatorPackage, UsersPackage, WhitespacePackage } from 'archivist'
import InterviewPackage from '../../packages/interview/package'
import FormsPackage from '../../packages/forms/package'
import CommentaryManagerPackage from '../../packages/commentary-manager/package'
import PersonManagerPackage from '../../packages/person-manager/package'
import PublisherPackage from '../../packages/publisher/package'
import SubjectManagerPackage from '../../packages/subject-manager/package'
import SubjectsContextPackage from '../../packages/subjects-editor-context/package'
import AuthenticationClient from './AuthenticationClient'
import DocumentClient from './DocumentClient'
import FileClient from './FileClient'
import ResourceClient from './ResourceClient'

// Entities definitions
import Commentary from '../../packages/commentary/Commentary'
import Person from '../../packages/person/Person'
import Subject from '../../packages/subjects/Subject'
import Subjects from '../../packages/subjects/package'

// Website entities and managers
import Respondent from '../../packages/respondent/Respondent'
import RespondentPackage from '../../packages/respondent/package'


const { ProseArticle } = ProseEditorPackage

let appConfig = 'ARCHIVISTCONFIG'
appConfig = JSON.parse(appConfig)

export default {
  name: 'archivist-publisher',
  configure: function(config) {
    // Use the default Archivist package
    config.setDefaultLanguage(appConfig.defaultLanguage)
    config.import(ArchivistPackage)
    config.import(DocumentsPackage)
    // Override Archivist form package 
    config.import(FormsPackage)
    // Manage commentary entity type
    config.import(CommentaryManagerPackage)
    // Manage person entity type
    config.import(PersonManagerPackage)
    // Manage respondents
    config.import(RespondentPackage)
    // Manage subjects
    config.import(SubjectManagerPackage)
    // Manage users
    config.import(UsersPackage)

    // Add subconfigurators
    let EditorConfigurator = new ArchivistSubConfigurator()
    EditorConfigurator.import(PublisherPackage)
    EditorConfigurator.import(SubjectsContextPackage)
    EditorConfigurator.import(ResourcesPackage)
    EditorConfigurator.import(CommentsPackage)
    EditorConfigurator.import(MetadataEditorPackage)
    EditorConfigurator.import(InterviewPackage)
    EditorConfigurator.import(IndentationPackage)
    EditorConfigurator.import(WhitespacePackage)
    EditorConfigurator.import(TimecodeAnnotatorPackage)
    EditorConfigurator.setContextMapping({
      'subject': 'subjects',
      'commentary': 'resources',
      'person': 'resources',
      'comment': 'comments'
    })
    EditorConfigurator.setDefaultLanguage(appConfig.defaultLanguage)
    config.addConfigurator('archivist-interview-editor', EditorConfigurator, true)

    // Entities subconfigurator
    let EntitiesConfigurator = new ArchivistSubConfigurator()
    EntitiesConfigurator.defineSchema({
      name: 'archivist-entities',
      version: '1.0.0',
      DocumentClass: ProseArticle
    })
    EntitiesConfigurator.addNode(Commentary)
    EntitiesConfigurator.addNode(Person)
    EntitiesConfigurator.addNode(Respondent)
    EntitiesConfigurator.addNode(Subject)
    EntitiesConfigurator.setDefaultLanguage(appConfig.defaultLanguage)
    config.addConfigurator('archivist-entities', EntitiesConfigurator)

    // Subjects subconfigurator
    config.addConfigurator('archivist-subjects', new ArchivistSubConfigurator().import(Subjects))

    // Add app's root style
    //config.addStyle(__dirname, 'app.scss');

    config.setAppConfig({
      protocol: appConfig.protocol,
      host: appConfig.host,
      port: appConfig.port
    })

    // Define Authentication Client
    config.setAuthenticationServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/auth/')
    config.setAuthenticationClient(AuthenticationClient)
    // Define Document Client
    config.setDocumentServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/documents/')
    config.setDocumentClient(DocumentClient)
    // Define File Client
    config.setFileServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/files/')
    config.setFileClient(FileClient)
    // Define Resource Client
    config.setResourceServerUrl(appConfig.protocol + '://'+appConfig.host+':'+appConfig.port+'/api/entities/')
    config.setResourceClient(ResourceClient)

    config.setMenuItems([
      {icon: 'fa-file-text', label: 'documents', action: 'archive'},
      {icon: 'fa-tags', label: 'subjects', action: 'subjects'},
      {icon: 'fa-users', label: 'persons', action: 'persons'},
      {icon: 'fa-comments', label: 'commentary', action: 'commentaries'},
      {icon: 'fa-user-circle-o', label: 'respondents', action: 'respondents'},
      {icon: 'fa-id-badge', label: 'users', action: 'users'}
    ])

    config.setDefaultResourceTypes(['commentary'])
  }
}