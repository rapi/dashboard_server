//telegram fix notifictionson startup
process.env.NTBA_FIX_319 = 1;

//Express framework for http/ws connections
var express = require('express'),
    //bodyparser for json post requests
    bodyParser = require('body-parser'),
    //Bot for telegram
    TelegramBot = require('node-telegram-bot-api'),
    app = {
      fs: require('fs-extra'),
      env:{...require('dotenv').config().parsed},
      session:require('express-session'),
      passport:require('passport')
    },
    FileStore =require('session-file-store')(app.session)
app.models = require('require-all')({
  dirname: __dirname + '/models/'
});
if(app.env.CRON==='TRUE')
  app.cron = require('require-all')({
    dirname: __dirname + '/cron/'
  });
else
  app.cron={}
app.config = require('require-all')({
  dirname: __dirname + '/config/'
});
app.providers= require('require-all')({
  dirname: __dirname + '/providers',
});
app.bot = new TelegramBot(app.env.TELEGRAM_TOKEN, {polling: true});
app.controllers = require('require-all')({
  dirname: __dirname + '/controllers',
  resolve     : function (Controller) {
    return new Controller(app);
  }
});
for (let i in app.cron)
  app.cron[i]=app.cron[i](app)
app.express = express();
app.ws = require('express-ws')(app.express);

app.db = require('./db.js')(app);

app.express.use(app.session({
  store: new FileStore(),
  secret: 'test',
  name: 'test',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.express.use(app.passport.initialize());
app.express.use(app.passport.session());
//Express use libraries
app.express.use(bodyParser.urlencoded({ extended: true }))

// parse json
app.express.use(bodyParser.json())



//routes
app.express.use('/api', require('./routes')(app))
app.express.use('/api', require('./WSroutes')(app))

app.httpServer=app.express.listen(app.config.http.port, () => console.log('Listening on port '+app.config.http.port+'!'));
module.exports=app;
