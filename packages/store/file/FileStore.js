let multer = require('multer')
let uuid = require('substance').uuid

/*
  Implements File Store API.
*/
class FileStore {
  constructor(config) {
    this.config = config
    
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, config.destination)
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
}

module.exports = FileStore
