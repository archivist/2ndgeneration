import { Component, ScrollPane } from 'substance'

class RespondentContext extends Component {
  getInitialState() {
    const session = this.context.editorSession
    return session.respondent
  }

  render($$) {
    let person = this.state.person

    let el = $$('div').addClass('sc-respondent').append(
      $$('div').addClass('se-content').append(
        $$('section').addClass('se-biography sm-content-section')
          .append(
            $$('div').addClass('se-title').append(person.name),
            $$('div').addClass('se-photo-inline').append(
              $$('img').attr('src', '/media/' + person.photo)
            ),
            $$('div').addClass('se-bio').html(person.bio)
          ),
        this.renderStories($$),
        this.renderInterviews($$),
        this.renderArchive($$)
      ).ref('content')
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
      const interviewUrl = urlHelper.openDocument(interview.documentId)
      const item = $$('a').addClass('se-item')
        .attr('href', interviewUrl)

      if(interview.media) {
        item.addClass('se-media').append(
          $$('div').addClass('se-interview-cover')
            .css('background-image', 'url(/media/s200/' + person.photo + ')')
        )
      }

      item.append(
        $$('div').addClass('se-interview-metadata').append(
          $$('div').addClass('se-interview-title').append(interview.title),
          $$('div').addClass('se-interview-date').append(interview.date),
          $$('div').addClass('se-interview-location').append(interview.location)
        )
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

  _openVideo(videoId) {
    this.send('openVideo', videoId)
  }

  _openImage(image) {
    this.send('openImage', image)
  }
}

export default RespondentContext
