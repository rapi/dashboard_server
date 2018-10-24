var router = require('express').Router(),
    multer = require('multer')
    apiResponse = require('express').Router()
module.exports = function(app) {
  //


  router.ws('/:user', function(ws, res) {
/*    ws.auth=res.params.user
    ws.on('close', function() {
      for(let i in app.controllers)
        if(app.controllers[i].closeWS)
          app.controllers[i].closeWS(ws)
    })
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
        app.log(e)
      }
    });*/
  })
  return router
}
