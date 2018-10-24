module.exports=function(app){
    app.models= require('require-all')({
      dirname     : __dirname + '/../models',
      // filter      :  /(.+Controller)\.js$/,
      // resolve     : function (Controller) {
      //   return new Controller(app);
      // }
    });
}
