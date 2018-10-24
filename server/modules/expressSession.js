var cookieParser = require('cookie-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session);

module.exports=function(app){
  if(!app.config.SESSION_TOKEN){
    app.error('[EXPRESS] expressSession setup in .env SESSION_TOKEN')
    return false;
  }
  app.log('[EXPRESS] expressSession')
  app.express.use(cookieParser(app.config.SESSION_TOKEN));
  app.express.use(session({
    secret: app.config.SESSION_TOKEN,
    resave: true,
    store: new FileStore({
      path:'sessions'
    }),
    saveUninitialized: true,
    cookie: { secure: false }
  }));
}
