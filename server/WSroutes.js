var express = require('express'),
  router = express.Router()
multer = require('multer')

apiResponse = express.Router()
module.exports = function(app) {
  //


  app.ws.getWss().on('connection', function(ws,req) {
    ws.auth=req.params.user;
  });
  router.ws('/:user', function(ws, res) {
    ws.on('message', function(msg) {
      try {
        msg=JSON.parse(msg);
      } catch (e) {
        return false;
      }
      if(
        typeof msg!=='object'
        && !msg.module
        && !app.controllers[msg.module]
      )return false;
      try {
        app.controllers[msg.module].message(ws,msg.data)
      } catch (e) {
        console.log(e)
      }
    });
  })
  return router
}
