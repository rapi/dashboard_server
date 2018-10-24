var router = require('express').Router()

module.exports=function(app){
  router.get('', function(req, res) {
    app.controllers['Stock']._list(req, res)
  })
  return router;
}
