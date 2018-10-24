module.exports=function(app){
  app.log('[EXPRESS] expressBodyParser')
  app.express.use( require('body-parser').json() );       // to support JSON-encoded bodies
  app.express.use( require('body-parser').urlencoded({     // to support URL-encoded bodies
    extended: false
  }));
}
