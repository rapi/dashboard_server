module.exports=function(app){
  if(app.config.CRON==='FALSE')return false;
  app.cron= require('require-all')({
    dirname     : __dirname + '/../cron',
    resolve     : function (fn) {
      return  fn(app);
    }
  });
  for(let i in app.cron)
    try{
      app.log('[CRON]',i)
    }
    catch(e){
      app.error('[CRON]',i,e)
    }

}
