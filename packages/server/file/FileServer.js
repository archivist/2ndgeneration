let sharp = require('sharp')
let Err = require('substance').SubstanceError

/*
  FileServer module. Can be bound to an express instance
*/
class FileServer {
  constructor(config) {
    this.path = config.path
    this.store = config.store
    this.authEngine = config.authEngine
  }

  bind(app) {
    app.post(this.path, this.authEngine.hasAccess.bind(this.authEngine), this._uploadFile.bind(this))
    app.delete(this.path + '/:id', this.authEngine.hasAccess.bind(this.authEngine), this._removeFile.bind(this))
  }

  _uploadFile(req, res, next) {
    let uploader = this.store.getFileUploader('files')
    uploader(req, res, (err) => {
      if (err) {
        return next(new Err('FileStore.UploadError', {
          cause: err
        }))
      }
      if(req.file.mimetype.indexOf('image') > -1) {
        sharp(req.file.path)
          .resize(200, 200)
          .toFile(req.file.destination + '/s200/' + req.file.filename, err => {
            if (err) {
              return next(new Err('FileStore.UploadError', {
                cause: err
              }))
            }

            res.json({name: this.store.getFileName(req)})
          })
      } else {
        res.json({name: this.store.getFileName(req)})
      }
    })
  }

  _removeFile(req, res, next) {
    let fileName = req.params.id
    return this.store.deleteFile(fileName, err => {
      if(err) return next(err)
      res.sendStatus(200)
    })
  }
}

module.exports = FileServer
