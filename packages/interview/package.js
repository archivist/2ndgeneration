import Interview from './Interview'
import MetaNode from './MetaNode'
import InterviewSeed from './InterviewSeed'

import { BasePackage, ParagraphPackage, HeadingPackage, BlockquotePackage, LinkPackage, EmphasisPackage, StrongPackage} from 'substance'
import { CommentPackage, TimecodePackage } from 'archivist'
import SubjectPackage from '../subject/package'
import CommentaryPackage from '../commentary/package'
import PersonPackage from '../person/package'
import EntityReferencePackage from '../entity-reference/package'
import TocPackage from '../toc/package'

export default {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      version: '1.0.0',
      DocumentClass: Interview,
      defaultTextType: 'paragraph'
    })
    config.addNode(MetaNode)
    config.addSeed(InterviewSeed)

    // Import Substance Core packages
    config.import(BasePackage)
    config.import(ParagraphPackage)
    config.import(HeadingPackage)
    config.import(BlockquotePackage)
    config.import(EmphasisPackage)
    config.import(StrongPackage)
    config.import(LinkPackage)

    // Import archivist specific packages
    config.import(CommentPackage)
    config.import(TimecodePackage)
    config.import(SubjectPackage)
    config.import(CommentaryPackage)
    config.import(PersonPackage)
    config.import(EntityReferencePackage)
    config.import(TocPackage)

    // Tools translation
    config.addLabel('undo', {
      en: 'undo',
      ru: 'отмена'
    })
    config.addLabel('redo', {
      en: 'redo',
      ru: 'вернуть'
    })
    config.addLabel('strong', {
      en: 'strong',
      ru: 'жирный'
    })
    config.addLabel('emphasis', {
      en: 'emphasis',
      ru: 'наклонный'
    })
    config.addLabel('link', {
      en: 'link',
      ru: 'ссылка'
    })

    // Metadata translation
    // Groups
    config.addLabel('person-details', {
      en: 'Respondent details',
      ru: 'Данные респондента'
    })
    config.addLabel('project-details', {
      en: 'Project details',
      ru: 'Данные проекта'
    })
    config.addLabel('document-details', {
      en: 'Document details',
      ru: 'Данные документа'
    })
    config.addLabel('abstract', {
      en: 'Abstract',
      ru: 'Резюме'
    })
    config.addLabel('short-summary', {
      en: 'Short summary',
      ru: 'Короткая сводка'
    })
    // Collapsed fields
    config.addLabel('russian', {
      en: 'Russian',
      ru: 'Русский'
    })
    config.addLabel('biography', {
      en: 'Biography',
      ru: 'Биография'
    })
    // Descriptions
    config.addLabel('short-summary-description', {
      en: 'Enter short summary',
      ru: 'Короткая сводка документа'
    })
    config.addLabel('abstract-description', {
      en: 'Enter abstract',
      ru: 'Резюме документа'
    })
    config.addLabel('title-description', {
      en: 'Enter interview title',
      ru: 'Укажите название документа'
    })
    config.addLabel('interviewee-description', {
      en: 'Select Interviewee',
      ru: 'Выберите респондента из списка'
    })
    config.addLabel('bio-description', {
      en: 'Enter person biography',
      ru: 'Биография респондента'
    })
    config.addLabel('place-of-birth-description', {
      en: 'Respondent place of birth',
      ru: 'Место рождения респондента'
    })
    config.addLabel('year-of-birth-description', {
      en: 'Person year of birth',
      ru: 'Год рождения респондента'
    })
    config.addLabel('photo-file-description', {
      en: 'Path to photo file',
      ru: 'Путь к файлу с фотографией'
    })
    config.addLabel('project-name-description', {
      en: 'Enter project name',
      ru: 'Название проекта'
    })
    config.addLabel('interview-location-description', {
      en: 'Interview location',
      ru: 'Место записи интервью'
    })
    config.addLabel('interview-date-description', {
      en: 'Interview date (yyyy-MM-dd)',
      ru: 'Дата записи интервью (yyyy-MM-dd)'
    })
    config.addLabel('conductor-description', {
      en: 'Inerviewer',
      ru: 'Интервьюер'
    })
    config.addLabel('operator-description', {
      en: 'Operator',
      ru: 'Оператор'
    })
    config.addLabel('duration-description', {
      en: 'Duration (in minutes)',
      ru: 'Длина (в минутах)'
    })
    config.addLabel('media-id-description', {
      en: 'Media identifier',
      ru: 'Медиа идентификатор'
    })
    config.addLabel('published-description', {
      en: 'Published date (yyyy-MM-dd)',
      ru: 'Дата публикации интервью (yyyy-MM-dd)'
    })
    config.addLabel('document-state-description', {
      en: 'Document state',
      ru: 'Статус документа'
    })
  }
}