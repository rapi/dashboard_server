const express=require('express')
var path = require('path');
module.exports=function(app){
    app.express=express()
    let port=8080;
    if(app.config.SERVER_PORT)
      port=app.config.SERVER_PORT
    app.routes=require('require-all')({
      dirname:__dirname + '/../routes',
    });
    require('express-ws')(app.express)
    // app.express.use(express.static(path.join(__dirname, 'public')));

    require('./expressSession')(app);
    require('./expressBodyParser')(app);
    require('./expressPassport')(app);
    require('./expressPassportFacebook')(app);
    require('./expressPassportGoogle')(app);

    for(let i in app.routes){
      try{
        app.express.use('/api/'+i,app.routes[i](app));
        app.log('[ROUTES]',i);
      }
      catch(e){
        app.error('[ROUTES]',i,e);
      }
    }
    // app.express.get('/', function(req,res){console.log(req.session,req.user);res.send(req.session)} );

    app.express.listen(port, function () {
      app.log('[EXPRESS]','server start on port '+port+'!');
    });
}
