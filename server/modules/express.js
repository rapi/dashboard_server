module.exports=function(app){
    app.express=require('express')()
    let port=8080;
    if(app.config.SERVER_PORT)
      port=app.config.SERVER_PORT
    app.routes=require('require-all')({
      dirname:__dirname + '/../routes',
    });
    require('express-ws')(app.express)
    app.express.use( require('body-parser').json() );       // to support JSON-encoded bodies
    app.express.use( require('body-parser').urlencoded({     // to support URL-encoded bodies
      extended: false
    }));
    app.log('   -------------ROUTES-------------');
    for(let i in app.routes){
      try{
        app.express.use('/api/'+i,app.routes[i](app));
        app.log('\n   [+]  '+i);
      }
      catch(e){
        app.error('\n   [-]  '+i,e);
      }
    }
    app.express.listen(port, function () {
      console.log('Express server start on port '+port+'!');
    });
}
