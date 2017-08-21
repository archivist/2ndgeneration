let Err = require('substance').SubstanceError

/*
  FileServer module. Can be bound to an express instance
*/
class FileServer {
  constructor(config) {
    this.path = config.path
    this.store = config.store
  }

  bind(app) {
    app.post(this.path, this._uploadFile.bind(this))
  }

  _uploadFile(req, res, next) {
    let uploader = this.store.getFileUploader('files')
    uploader(req, res, (err) => {
      if (err) {
        return next(new Err('FileStore.UploadError', {
          cause: err
        }))
      }
      res.json({name: this.store.getFileName(req)})
    })
  }
}

module.exports = FileServer
