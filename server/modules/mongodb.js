module.exports=function(app){
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://'+app.config.MONGODB_HOST+':'+app.config.MONGODB_PORT+'/'+app.config.MONGODB_DATABASE, { useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);
  var db = mongoose.connection;
  // db.on('close', console.log( 'connection close:'));
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // console.log('Connected on monodb database')
  });
  app.mongoose=db
}
