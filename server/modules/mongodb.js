module.exports=function(app){
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://'+app.config.MONGODB_HOST+':'+app.config.MONGODB_PORT+'/'+app.config.MONGODB_DATABASE, { useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);
  var db = mongoose.connection;
  // db.on('close', app.log( 'connection close:'));
  db.on('error',(e)=>app.error('[MONGODB]','Connected on monodb database',e));
  db.once('open', function() {
    app.log('[MONGODB]','Connected on monodb database')
  });
  app.mongoose=db
}
