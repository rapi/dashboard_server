module.exports=function(app){
    app.controllers= require('require-all')({
      dirname     : __dirname + '/../controllers',
      // filter      :  /(.+Controller)\.js$/,
      resolve     : function (Controller) {
        return new Controller(app);
      }
    });
    // app.log(app.controllers.Crypto)
}
