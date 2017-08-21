import { Component, FontAwesomeIcon as Icon, TextPropertyEditor } from 'substance'
import { map } from 'lodash-es'

class TocEditor extends Component {
  render($$) {
    let doc = this.context.doc
    let node = doc.get(['meta', 'toc'])
    let el = $$('div').addClass('sc-toc-editor').append(
      $$('div').addClass('se-toc-header').append(
        $$('div').addClass('se-label').append(this.getLabel('toc-editor-label')),
        $$('div').addClass('se-action').append(
          $$(Icon, {icon: 'fa-plus'}),
          this.getLabel('add-chapter')
        ).on('click', this._addChapter)
      )
    )

    node.forEach(chapter => {
      el.append(this.renderChapterEditor($$, chapter))
    })

    return el
  }

  renderChapterEditor($$, chapterId) {
    let doc = this.context.doc
    let chapter = doc.get(chapterId)
    let el = $$('div').addClass('se-chapter-editor').append(
      $$('div').addClass('se-control').append(
        this.renderTimecodeSelector($$, chapter),
        $$('div').addClass('se-action').append(
          $$(Icon, {icon: 'fa-trash'}),
          this.getLabel('remove-chapter')
        ).on('click', this._deleteChapter.bind(this, chapterId))
      ),
      this.renderChapterTitleEditor($$, chapter)
    )

    return el
  }

  renderTimecodeSelector($$, chapter) {
    let doc = this.context.doc
    let timecodeIndex = doc.getIndex('type').get('timecode')
    let options = map(timecodeIndex, tc => { return tc.getText() })
    let el = $$('div').addClass('se-timecode-selector')

    let select = $$('select')
      .on('change', this._onTimecodeChange.bind(this, chapter.id))

    if(chapter.timecode === '') {
      select.append(
        $$('option').attr({value: '', selected: 'selected'}).append(
          this.getLabel('select-timecode')
        )
      )
    }

    options.forEach(opt => {
      let option = $$('option').attr({value: opt}).append(opt)
      if(opt === chapter.timecode) option.attr({selected: 'selected'})
      select.append(option)
    })

    el.append(select)

    return el
  }

  renderChapterTitleEditor($$, chapter) {
    let el = $$('div').addClass('se-chapter-title-editor')
      .append(
        $$(TextPropertyEditor, {
          name: chapter.id,
          path: [chapter.id, 'title'],
          placeholder: this.getLabel('chapter-title'),
          multiLine: false
        }).addClass('se-editor')
      )

    return el
  }

  _addChapter() {
    let doc = this.context.doc
    let editorSession = this.context.editorSession

    let chapters = doc.get(['meta', 'toc'])
    editorSession.transaction((tx) => {
      let chapter = tx.create({type: 'chapter'})
      chapters.push(chapter.id)
      tx.set(['meta', 'toc'], chapters)
    })
  }

  _deleteChapter(chapterId) {
    let doc = this.context.doc
    let editorSession = this.context.editorSession

    let chapters = doc.get(['meta', 'toc'])
    let chapterIndex = chapters.indexOf(chapterId)
    chapters.splice(chapterIndex, 1)

    editorSession.transaction(tx => {
      tx.delete(chapterId)
      tx.set(['meta', 'toc'], chapters)
    })
  }

  _onTimecodeChange(chapterId, e) {
    let timecode = e.target.value
    let editorSession = this.context.editorSession

    editorSession.transaction(tx => {
      tx.set([chapterId, 'timecode'], timecode)
    })
  }
}

export default TocEditor