import { Component } from 'substance'

// Sample data for debugging
// import DataSample from '../../data/docs'

class Explorer extends Component {
  constructor(...args) {
    super(...args)

    this.handleActions({
      'openPerson': this._openPerson
    })
  }

  didMount() {
    this._loadData()
    this._loadLatestData()
  }

  getInitialState() {
    return {
      perPage: 30
    }
  }

  render($$) {
    const items = this.state.items
    const latest = this.state.latest
    const urlHelper = this.context.urlHelper
    let el = $$('div').addClass('sc-explorer')

    let Menu = this.getComponent('menu')
    el.append($$(Menu))

    if (!items) {
      return el
    }

    let list = $$('div').addClass('se-person-list')

    items.forEach(item => {
      const itemUrl = urlHelper.openPerson(item.entityId)
      list.append(
        $$('a').addClass('se-item').attr('href', itemUrl)
          .append(
            $$('img').addClass('se-photo').attr('src', '/media/s200/' + item.photo),
            $$('div').addClass('se-name').append(item.name),
            $$('div').addClass('se-annotation').html(item.annotation)
          )
      )
    })

    let latestEl = $$('div').addClass('se-latest')

    if(latest) {
      latest.forEach(topic => {
        let topicEl = $$('div').addClass('se-topic').append(
          $$('div').addClass('se-topic-name').append(topic.topic)
        )

        let storiesEl = $$('div').addClass('se-stories')

        if(topic.stories) {
          topic.stories.forEach(story => {
            const cover = story.cover //|| //person.photo
            const item = $$('div').addClass('se-item').append(
              $$('div').addClass('se-video-cover')
                .css('background-image', 'url(/media/s400/' + cover + ')'),
              $$('div').addClass('se-video-title').html(story.title),
              $$('div').addClass('se-video-abstract').html(story.abstract)
            ).on('click', this._openVideo.bind(this, story.source)).ref(story.source)

            if(this.state.video === story.source) item.addClass('sm-active')
            storiesEl.append(item)
          })

          topicEl.append(storiesEl)
        }

        if(topic.archive) {
          let archiveEl = $$('div').addClass('se-archive')

          topic.archive.forEach(item => {
            const itemEl = $$('div').addClass('se-item').append(
              $$('div').addClass('se-item-thumb')
                .css('background-image', 'url(/media/s200/' + item.file + ')'),
              $$('div').addClass('se-item-title').append(item.title)
            ).on('click', this._openImage.bind(this, item.file)).ref(item.file)
            archiveEl.append(itemEl)
          })

          topicEl.append(archiveEl)
        }

        latestEl.append(topicEl)
      })
    }

    el.append(
      $$('div').addClass('se-persons').append(list),
      latestEl
    )

    return el
  }

  _openPerson(personId) {
    const urlHelper = this.context.urlHelper
    urlHelper.openPerson(personId)
  }

  _loadData() {
    let pagination = this.state.pagination
    let perPage = this.state.perPage
    let options = {
      order: this.state.order,
      limit: perPage,
      offset: pagination ? this.state.items.length : 0
    }
    let resourceClient = this.context.resourceClient

    resourceClient.listRespondents({}, (err, persons) => {
      this.extendState({
        items: persons.records,
        total: persons.total
      })
    })
  }

  _loadLatestData() {
    let pagination = this.state.pagination
    let perPage = this.state.perPage
    let options = {
      order: this.state.order,
      limit: perPage,
      offset: pagination ? this.state.items.length : 0
    }
    let resourceClient = this.context.resourceClient

    resourceClient.listLatest({}, (err, persons) => {
      this.extendState({
        latest: persons
      })
    })
  }

  _openVideo(videoId) {
    this.extendState({video: videoId, image: undefined})
  }

  _openImage(image) {
    this.extendState({image: image, video: undefined})
  }
}

export default Explorer
