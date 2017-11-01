let fs = require('fs')
let config = require('config')
let multer = require('multer')
let uuid = require('substance').uuid

const destination = config.mediaEndpoint || './media'

/*
  Implements File Store API.
*/
class FileStore {
  constructor(config) {
    this.config = config

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, config.destination || destination)
      },
      filename: (req, file, cb) => {
        let extension = file.originalname.split('.').pop()
        cb(null, uuid() + '.' + extension)
      }
    })
    this.uploader = multer({
      storage: this.storage
    })
  }

  /*
    Returns middleware for file uploading
  */
  getFileUploader(fieldName) {
    return this.uploader.single(fieldName)
  }

  /*
    Get name of stored file
  */
  getFileName(req) {
    return req.file.filename
  }

  deleteFile(fileName, cb) {
    let path = destination + '/' + fileName
    let thumbPath = destination + '/s200/' + fileName
    return fs.unlink(path, err => {
      fs.exists(thumbPath, (exists) => {
        if (exists) return fs.unlink(thumbPath, cb)
        return cb(err)
      })
    })
  }
}

module.exports = FileStore
