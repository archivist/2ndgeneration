import { DocumentNode } from 'substance'

class ChapterNode extends DocumentNode {}

ChapterNode.define({
  type: 'chapter',
  timecode: { type: 'string', default: '' },
  title: { type: 'string', default: '' }
})

export default ChapterNode