var express = require('express'),
  router = express.Router()
multer = require('multer')

apiResponse = express.Router()
module.exports = function(app) {
  storage = multer.diskStorage({
    destination: app.env.TMP_DIR,
    filename: function(req, file, cb) {
      ext = file.originalname.split('.')
      cb(null, file.originalname + '-' + Date.now() + "." + ext[ext.length - 1]);
    }
  })
  upload = multer({storage: storage});

  //************************************
  //**************IMG***************
  //************************************

  //Get symbols
  router.post('/img', upload.single('logo'), function(req, res) {
    app.controllers['Img']._save(req, res)
  })

  //************************************
  //**************CRYPTO***************
  //************************************

  //Get symbols
  router.get('/crypto/history/:from/:to', function(req, res) {
    app.controllers['Crypto']._getHistory(req, res)
  })

  //Get symbols
  router.get('/crypto/:from/:to', function(req, res) {
    app.controllers['Crypto']._getPair(req, res)
  })

  //Get symbols
  router.get('/crypto/', function(req, res) {
    app.controllers['Crypto']._list(req, res)
  })


  //************************************
  //**************STOCKS***************
  //************************************

  // Get stocks
  router.get('/stock/', function(req, res) {
    app.controllers['Stock']._list(req, res)
  })

  // Upload logo
  // router.post('/symbols/logo', upload.single('logo'), function(req, res) {
  //   app.controllers['Symbols']._upload_logo(req, res)
  //
  // })
  //
  // Add
  // router.post('/symbols', function(req, res) {
  //   app.controllers['Symbols']._add(req, res)
  // })
  //
  // Update
  // router.post('/symbols/:id', function(req, res) {
  //   app.controllers['Symbols']._update(req, res)
  // })
  //
  // Delete
  // router.delete('/symbols/:id', function(req, res) {
  //   app.controllers['Symbols']._delete(req, res)
  // })

  //************************************
  //**************PROVIDERS***************
  //************************************

  //Find Symbol in all providers
  // router.get('/providers/search/:symbol', function(req, res) {
  //   app.controllers['Providers']._searchSymbol(req, res)
  // })
  return router
}
