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



    router.get('/register/', function(req, res) {
      app.controllers['User']._register(req, res)
    })
    router.get('/login/', function(req, res) {
      app.controllers['User']._login(req, res)
    })
  return router
}
