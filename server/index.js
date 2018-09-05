var express = require('express'),
    bodyParser = require('body-parser'),
     app = {
      fs: require('fs-extra'),
      env:{...require('dotenv').config().parsed}
    }

app.fs.mkdirs(app.env.TMP_DIR)
app.fs.emptyDir(app.env.TMP_DIR)
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
app.controllers = require('require-all')({
  dirname: __dirname + '/controllers',
  resolve     : function (Controller) {
    return new Controller(app);
  }
});
for (let i in app.cron)
  app.cron[i]=app.cron[i](app)
app.express = express();
app.db = require('./db.js')(app);
app.express.use(bodyParser.urlencoded({ extended: true }))
app.express.use(bodyParser.json())
app.express.use('/api', require('./routes')(app))
app.httpServer=app.express.listen(app.config.http.port, () => console.log('Listening on port '+app.config.http.port+'!'));
module.exports=app;
