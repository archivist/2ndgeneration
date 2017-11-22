let extend = require('lodash/extend')
let isEmpty = require('lodash/isEmpty')
let union = require('lodash/union')

/*
  PublicServer module. Can be bound to an express instance
*/
class PublicServer {
  constructor(config) {
    this.engine = config.resourceEngine
    this.docEngine = config.documentEngine
    this.authEngine = config.authEngine
    this.indexer = config.indexer
    this.inspector = config.inspector
    this.path = config.path
  }

  bind(app) {
    app.get(this.path + '/respondents', this._listRespondents.bind(this))
    app.get(this.path + '/respondents/:id', this._getRespondentData.bind(this))
  }

  /*
    List available entities
  */
  _listRespondents(req, res, next) {
    let args = req.query
    args.filters = JSON.stringify({
      'entityType': 'respondent'
    })
    args.options = JSON.stringify({
      columns: ['"entityId"', "name", "data->>'annotation' AS annotation", "data->>'photo' AS photo"]
    })

    this.engine.listEntities(args)
      .then(entities => {
        res.json(entities)
      })
      .catch(err => {
        next(err)
      })
  }

  /*
    Get Entity
  */
  _getRespondentData(req, res, next) {
    const entityId = req.params.id
    let respondent = {
      stats: {},
      person: {},
      stories: [],
      interviews: [],
      archive: []
    }
    Promise.all([
      this._getRespondent(entityId),
      this._getRespondentStories(entityId),
      this._getRespondentInterviews(entityId),
      this._getRespondentArchive(entityId)
    ]).then(all => {
      respondent.person = all[0]
      if(all[1]) {
        respondent.stats.stories = all[1].total
        respondent.stories = all[1].records
      }
      if(all[2]) {
        respondent.stats.interviews = all[2].total
        respondent.interviews = all[2].records
      }
      if(all[3]) {
        respondent.stats.archive = all[3].total
        respondent.archive = all[3].records
      }
      res.json(respondent)
    }).catch(function(err) {
      return next(err)
    })
  }

  _getRespondent(entityId) {
    return this.engine.getEntity(entityId)
      .then(person => {
        return {
          entityId: entityId,
          cover: person.data.cover,
          photo: person.data.photo,
          name: person.data.name,
          bio: person.data.biography,
          caption: person.data.caption
        }
      })
  }

  _getRespondentStories(entityId) {
    const filters = {
      entityType: 'story',
      'data->>respondent': entityId,
      //'published': true
    }
    const options = {
      columns: ['"entityId"', 'name AS title', 'data->>\'annotation\' AS abstract', 'data->>\'subject\' AS subject', 'data->>\'media\' AS source', 'data->>\'cover\' AS cover'],
      order: 'created',
      limit: 1000
    }

    return this.engine.listEntities({
      filters: JSON.stringify(filters),
      options: JSON.stringify(options)
    }).then(archive => {
      return archive
    })
  }

  _getRespondentInterviews(entityId) {
    const filters = {
      'meta->>interviewee': entityId,
      //'meta->>state: 'published'
    }
    const options = {
      columns: ['"documentId"', 'meta->>\'short_summary\' AS title', 'meta->>\'interview_date\' AS date', 'meta->>\'interview_location\' AS location', 'meta->>\'media_id\' AS media'],
      order: 'meta->>\'published_on\'',
      limit: 1000
    }

    return new Promise((resolve, reject) => {
      this.docEngine.listDocuments({
        filters: JSON.stringify(filters),
        options: JSON.stringify(options)
      }, (err, docs) => {
        if(err) {
          return reject(err)
        }

        resolve(docs)
      })
    })
  }

  _getRespondentArchive(entityId) {
    const filters = {
      entityType: 'file',
      'data->>respondent': entityId
    }
    const options = {
      columns: ['"entityId"', 'name AS title', 'data->>\'description\' AS caption', 'data->>\'gallery\' AS gallery', 'data->>\'file\' AS file'],
      order: 'cast(data->>\'position\' as integer)',
      limit: 1000
    }

    return this.engine.listEntities({
      filters: JSON.stringify(filters),
      options: JSON.stringify(options)
    }).then(archive => {
      return archive
    })
  }


  /*
    Search entities
  */
  _searchEntities(req, res, next) {
    let args = req.query

    let search = args.query
    let language = args.language

    let filters = !isEmpty(args.filters) ? JSON.parse(args.filters) : {}
    let options = !isEmpty(args.options) ? JSON.parse(args.options) : {}

    if(search) filters.query = "'" + search + "'"
    if(language) filters.language = "'" + language + "'"

    this.indexer.searchEntities(filters, options)
      .then(function(resp) {
        res.json(resp)
      })
      .catch(function(err) {
        next(err)
      })
  }

  /*
    List available entities
  */
  _listEntities(req, res, next) {
    let args = req.query

    this.engine.listEntities(args)
      .then(function(entities) {
        res.json(entities)
      })
      .catch(function(err) {
        next(err)
      })
  }

  /*
    Get document resources
  */
  _getDocumentResources(req, res, next) {
    let documentId = req.params.id

    this.engine.getDocumentResources(documentId)
      .then(function(entities) {
        res.json(entities)
      })
      .catch(function(err) {
        next(err)
      })
  }

  /*
    Get document collaborators
  */
  _getDocumentCollaborators(req, res, next) {
    let documentId = req.params.id

    this.engine.getDocumentCollaborators(documentId)
      .then(function(collaborators) {
        res.json(collaborators)
      })
      .catch(function(err) {
        next(err)
      })
  }

  _getCollaborator(req, res, next) {
    let userId = req.params.id

    this.engine.getCollaborator(userId)
      .then(function(collaborator) {
        res.json(collaborator)
      })
      .catch(function(err) {
        next(err)
      })
  }
}

module.exports = PublicServer
