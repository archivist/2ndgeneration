import { Component } from 'substance'
import { extend } from 'lodash-es'
import plyr from 'plyr'

class Document extends Component {
  constructor(...args) {
    super(...args)

    // this.handleActions({
    //   'loadData': this._loadData
    // })
  }

  didMount() {
    //this._loadData()
  }

  getInitialState() {
    return {
      person: {},
      stories: [],
      interviews: [],
      archive: []
    }
  }

  getChildConfigurator(name) {
    let configurator = this.context.configurator
    return configurator.getConfigurator(name)
  }

  render($$) {
    const Menu = this.getComponent('menu')

    let el = $$('div').addClass('sc-document').append(
      $$(Menu, {active: 'archive', mode: 'white'})
    )

    const configurator = this.getChildConfigurator('archivist-interview-reader')
    const childComponentRegistry = configurator.getComponentRegistry()
    const Reader = childComponentRegistry.get('reader')

    let props = extend({}, this.props, {configurator: configurator})

    el.append(
      $$(Reader, props).ref('reader')
    )

    return el
  }

  renderStories($$) {
    const stories = this.state.stories
    const person = this.state.person
    let videos = $$('div').addClass('se-videos')

    stories.forEach(story => {
      const cover = story.cover || person.photo
      const item = $$('div').addClass('se-item').append(
        $$('div').addClass('se-video-cover')
          .css('background-image', 'url(/media/' + cover + ')'),
        $$('div').addClass('se-video-abstract').html(story.abstract)
      ).on('click', this._openVideo.bind(this, story.source)).ref(story.source)

      if(this.state.video === story.source) item.addClass('sm-active')
      videos.append(item)
    })

    return $$('section').addClass('se-stories sm-content-section')
      .append(
        $$('div').addClass('se-section-title').append('Сюжеты'),
        videos
      )
  }

  renderInterviews($$) {
    const interviews = this.state.interviews
    const person = this.state.person
    const urlHelper = this.context.urlHelper

    let interviewsEl = $$('div').addClass('se-interviews')

    interviews.forEach(interview => {
      const item = $$('div').addClass('se-item')

      if(interview.media) {
        item.addClass('se-media').append(
          $$('div').addClass('se-interview-cover')
            .css('background-image', 'url(/media/s200/' + person.photo + ')')
        )
      }

      const interviewUrl = urlHelper.openDocument(interview.documentId)

      item.append(
        $$('a').addClass('se-interview-metadata').append(
          $$('div').addClass('se-interview-title').append(interview.title),
          $$('div').addClass('se-interview-date').append(interview.date),
          $$('div').addClass('se-interview-location').append(interview.location)
        ).attr('href', interviewUrl)
      )
      interviewsEl.append(item)
    })

    return $$('section').addClass('se-interviews sm-content-section')
      .append(
        $$('div').addClass('se-section-title').append('Интервью'),
        interviewsEl
      )
  }

  renderArchive($$) {
    const archive = this.state.archive
    let archiveEl = $$('div').addClass('se-archive')

    archive.forEach(item => {
      const itemEl = $$('div').addClass('se-item').append(
        $$('div').addClass('se-item-thumb')
          .css('background-image', 'url(/media/s200/' + item.file + ')'),
        $$('div').addClass('se-item-title').append(item.title)
      ).on('click', this._openImage.bind(this, item.file)).ref(item.file)
      archiveEl.append(itemEl)
    })

    return $$('section').addClass('se-archive sm-content-section')
      .append(
        $$('div').addClass('se-section-title').append('Архив'),
        archiveEl
      )
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
    const archive = this.state.archive
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

  _openVideo(videoId) {
    this.extendState({video: videoId, image: undefined})
  }

  _openImage(image) {
    this.extendState({image: image, video: undefined})
  }

  _prevImage() {
    const archive = this.state.archive
    const current = this.state.image
    const index = Object.keys(archive).findIndex(item => {
      return archive[item].file === current
    })
    const prev = index > 0 ? archive[index - 1].file : archive[archive.length - 1].file
    this.extendState({image: prev})
  }

  _nextImage() {
    const archive = this.state.archive
    const current = this.state.image
    const index = Object.keys(archive).findIndex(item => {
      return archive[item].file === current
    })
    const next = index < archive.length - 1 ? archive[index + 1].file : archive[0].file
    this.extendState({image: next})
  }

  _loadData() {
    let resourceClient = this.context.resourceClient

    resourceClient.getRespondentData(this.props.personId, (err, data) => {
      if(err) {
        console.error(err)
        return
      }

      this.extendState(data)
    })
  }
}

Document.pageName = 'document'

export default Document
