var router = require('express').Router()

module.exports=function(app){
  //Get symbols
  router.get('history/:from/:to', function(req, res) {
    app.controllers['Crypto']._getHistory(req, res)
  })

  //Get symbols
  router.get(':from/:to', function(req, res) {
    app.controllers['Crypto']._getPair(req, res)
  })

  //Get symbols
  router.get('', function(req, res) {
    app.controllers['Crypto']._list(req, res)
  })

  return router;
}
