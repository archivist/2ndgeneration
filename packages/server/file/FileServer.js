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
        Promise.all([
          this._resize200(req),
          this._resize400(req)
        ]).then(() => {
          res.json({name: this.store.getFileName(req)})
        })
      } else {
        res.json({name: this.store.getFileName(req)})
      }
    })
  }

  _resize200(req) {
    return new Promise((resolve, reject) => {
      sharp(req.file.path)
        .resize(200, 200)
        .toFile(req.file.destination + '/s200/' + req.file.filename, err => {
          if (err) {
            return reject(err)
          }

          resolve()
        })
    })
  }

  _resize400(req) {
    return new Promise((resolve, reject) => {
      sharp(req.file.path)
        .resize(400, 400)
        .max()
        .toFile(req.file.destination + '/s400/' + req.file.filename, err => {
          if (err) {
            return reject(err)
          }

          resolve()
        })
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
