import Interview from './Interview'
import MetaNode from './MetaNode'
import InterviewSeed from './InterviewSeed'

import { BasePackage, ParagraphPackage, PersistencePackage, HeadingPackage, BlockquotePackage, LinkPackage, EmphasisPackage, StrongPackage} from 'substance'
import { CommentPackage, TimecodePackage } from 'archivist'
import SubjectPackage from '../subject/package'
import CommentaryPackage from '../commentary/package'
import EntityReferencePackage from '../entity-reference/package'

export default {
  name: 'archivist-interview',
  configure: function(config) {
    config.defineSchema({
      name: 'archivist-interview',
      ArticleClass: Interview,
      defaultTextType: 'paragraph'
    })
    config.addNode(MetaNode)
    config.addSeed(InterviewSeed)

    // Import Substance Core packages
    config.import(BasePackage)
    config.import(PersistencePackage)
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
    config.import(EntityReferencePackage)
  }
}