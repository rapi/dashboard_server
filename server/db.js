module.exports=function(app){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://'+app.config.db.host+':'+app.config.db.port+'/'+app.config.db.database, { useNewUrlParser: true });
    mongoose.set('useFindAndModify', false);


    var db = mongoose.connection;
    // db.on('close', console.log( 'connection close:'));
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // console.log('Connected on monodb database')
    });
    return db;
}
