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
  //**************PROVIDERS***************
  //************************************

  //Find Symbol in all providers
  // router.get('/providers/search/:symbol', function(req, res) {
  //   app.controllers['Providers']._searchSymbol(req, res)
  // })



  //************************************
  //**************IMG***************
  //************************************

      //Get symbols
      router.post('/img', upload.single('logo'), function(req, res) {
        app.controllers['Img']._save(req, res)
      })
  //************************************
  //**************SYMBOLS***************
  //************************************

  //Get symbols
  // router.get('/symbols/:name*?', function(req, res) {
  //   app.controllers['Symbols']._get(req, res)
  // })
  //
  // //Upload logo
  // router.post('/symbols/logo', upload.single('logo'), function(req, res) {
  //   app.controllers['Symbols']._upload_logo(req, res)
  //
  // })
  //
  // //Add
  // router.post('/symbols', function(req, res) {
  //   app.controllers['Symbols']._add(req, res)
  // })
  //
  // //Update
  // router.post('/symbols/:id', function(req, res) {
  //   app.controllers['Symbols']._update(req, res)
  // })
  //
  // //Delete
  // router.delete('/symbols/:id', function(req, res) {
  //   app.controllers['Symbols']._delete(req, res)
  // })

  return router
}
