module.exports=function(app){
    app.providers= require('require-all')({
      dirname     : __dirname + '/../providers',
      recursive   : true,
    });
}
