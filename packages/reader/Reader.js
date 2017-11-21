import { ProseEditorPackage } from 'substance'
import { ContainerEditor, Highlights, Layout, SplitPane, TextPropertyEditor } from 'substance'
import { forEach, map, uniq } from 'lodash-es'
import plyr from 'plyr'
import ReaderContext from './ReaderContext'

const { ProseEditor } = ProseEditorPackage

class Reader extends ProseEditor {
  constructor(...args) {
    super(...args)

    let doc = this.editorSession.getDocument()
    this.contentHighlights = new Highlights(doc)

    this.handleActions({
      'showReferences': this._showReferences,
      'showTopics': this._showTopics,
      'openVideo': this._openVideo,
      'openImage': this._openImage
    })
  }

  didMount() {
    let parent = this.getParent()
    let entityId = parent.props.entityId
    if(entityId) {
      setTimeout(() => {
        this._showReferences(entityId, true)
      }, 10)
    }
    if(parent.props.fragment) {
      this.refs.contentPanel.scrollTo(`[data-id="${parent.props.fragment}"]`)
    }
  }

  dispose() {
    this.editorSession.off(this)
    this._dispose()
  }

  render($$) {
    let el = $$('div').addClass('sc-reader')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '70%'}).append(
        this._renderContextSection($$),
        this._renderMainSection($$)
      )
    )
    return el
  }

  renderVideo($$) {
    let player = $$('div').addClass('se-media')
      .attr({'data-type': 'youtube', 'data-video-id': this.state.video})

    let el = $$('div').addClass('se-video').append(
      $$('div').addClass('se-close').append('×')
        .on('click', this._openVideo.bind(this, undefined)),
      player
    )

    setTimeout(()=>{
      plyr.setup({autoplay: true})
    }, 100)

    return el
  }

  renderGallery($$) {
    const respondent = this.editorSession.respondent
    const archive = respondent.archive
    const current = this.state.image
    const index = Object.keys(archive).findIndex(item => {
      return archive[item].file === current
    })

    let el = $$('div').addClass('se-gallery')
      .append(
        $$('div').addClass('se-close').append('×')
          .on('click', this._openImage.bind(this, undefined)),
        $$('div').addClass('se-prev').append('←')
          .on('click', this._prevImage.bind(this)),
        $$('div').addClass('se-next').append('→')
          .on('click', this._nextImage.bind(this)),
        $$('img').addClass('se-image')
          .attr('src', '/media/' + this.state.image),
        $$('div').addClass('se-caption').append(
          $$('div').addClass('se-title').append(archive[index].title),
          $$('div').addClass('se-description').html(archive[index].caption)
        )
      )

    return el
  }

  _renderContextSection($$) {
    const respondent = this.editorSession.respondent
    let parent = this.getParent()
    return $$('div').addClass('se-context-section').append(
      $$('div').addClass('se-cover-reflection').css('background-image', 'url(/media/' + respondent.person.cover + ')'),
      $$(ReaderContext, parent.props).ref('contextPanel')
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    mainSection.append(
      this._renderContentPanel($$)
    )

    if(this.state.video) {
      mainSection.append(this.renderVideo($$))
    }

    if(this.state.image) {
      mainSection.append(this.renderGallery($$))
    }

    return mainSection
  }

  _renderContentPanel($$) {
    const doc = this.props.editorSession.getDocument()
    const configurator = this.props.configurator

    let ScrollPane = this.componentRegistry.get('scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let Brackets = this.componentRegistry.get('brackets')

    let contentPanel = $$(ScrollPane, {
      scrollbarType: 'substance',
      scrollbarPosition: 'right',
      highlights: this.contentHighlights
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })

    layout.append(
      $$(Brackets).ref('brackets'),
      $$(TextPropertyEditor, {
        name: 'title',
        path: ["meta", "title"],
        disabled: true
      }).addClass('se-title'),
      $$(ContainerEditor, {
        disabled: true,
        editorSession: this.editorSession,
        node: doc.get('body'),
        commands: configurator.getSurfaceCommandNames()
      }).ref('body'),
      $$(Overlay, {
        toolPanel: configurator.getToolPanel('main-overlay'),
        theme: 'dark'
      })
    )

    contentPanel.append(layout)
    return contentPanel
  }

  highlightReferences(entities, containerAnnos) {
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let schema = doc.getSchema()
    let nodes = schema.nodeRegistry.entries
    let highlights = {}
    forEach(nodes, node => {
      if(node.schema.hasOwnProperty('reference')) {
        highlights[node.type] = []
      }
    })
    forEach(entities, entityId => {
      if(containerAnnos) {
        let refs = entityIndex.get(entityId)
        forEach(refs, ref => {
          let entityType = ref.type
          highlights[entityType] = highlights[entityType].concat(ref.id + '-bracket')
          highlights[entityType] = uniq(highlights[entityType])
        })
      } else {
        let refs = entityIndex.get(entityId)
        let keys = Object.keys(refs)
        if(keys.length > 0) {
          let entityType = refs[keys[0]].type
          let annos = map(refs, n => {return n.id})
          highlights[entityType] = highlights[entityType].concat(annos)
        }
      }
    })

    this.contentHighlights.set(highlights)
  }

  _showReferences(entityId, silent) {
    let container = this.refs.body.getContainer()
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let refs = entityIndex.get(entityId)
    // We are sorting references by paregraph position
    // if nodes annotations are in same paragraph
    // we will sort them by start offset
    let refIds = Object.keys(refs)
    let ordered = refIds.sort((a,b) => {
      const refAPath = refs[a].getPath()
      const refBPath = refs[b].getPath()

      if (refAPath[0] !== refBPath[0]){
        return (container.getPosition(refAPath[0]) - container.getPosition(refBPath[0]))
      } else {
        const refAOffset = refs[a].start.getOffset()
        const refBOffset = refs[b].start.getOffset()

        return (refAOffset - refBOffset)
      }
    })

    this.refs.contentPanel.scrollTo(`[data-id="${ordered[0]}"]`)
    this.highlightReferences([entityId])

    if(!silent) {
      let urlHelper = this.context.urlHelper
      urlHelper.focusResource(entityId)
    }
  }

  _showTopics(topics) {
    let editorSession = this.editorSession
    let doc = editorSession.getDocument()
    let entityIndex = doc.getIndex('entities')
    let paragraphs = []
    forEach(topics, topic => {
      let refs = entityIndex.get(topic)
      let paras = map(refs, n => {return n.start.path[0]})
      paragraphs = paragraphs.concat(paras)
    })
    let firstPara = doc.getFirst(paragraphs)
    this.refs.contentPanel.scrollTo(`[data-id="${firstPara}"]`)

    setTimeout(function(){
      this.refs.brackets.highlight(topics)
      this.highlightReferences(topics, true)
    }.bind(this), 10)
  }


  _openVideo(videoId) {
    this.extendState({video: videoId, image: undefined})
  }

  _openImage(image) {
    this.extendState({image: image, video: undefined})
  }

  _prevImage() {
    const respondent = this.editorSession.respondent
    const archive = respondent.archive
    const current = this.state.image
    const index = Object.keys(archive).findIndex(item => {
      return archive[item].file === current
    })
    const prev = index > 0 ? archive[index - 1].file : archive[archive.length - 1].file
    this.extendState({image: prev})
  }

  _nextImage() {
    const respondent = this.editorSession.respondent
    const archive = respondent.archive
    const current = this.state.image
    const index = Object.keys(archive).findIndex(item => {
      return archive[item].file === current
    })
    const next = index < archive.length - 1 ? archive[index + 1].file : archive[0].file
    this.extendState({image: next})
  }

}

export default Reader
