var app={
  modules:[
    'log',
    'dotenv',
    'mongodb',
    'models',
    'providers',
    'cron',
    'controllers',
    'express',
    // 'passport',
    // 'passportFacebook',
  ]
}
for(let module of app.modules){
    try{
      require('./modules/'+module)(app);
      app.log('[MODULE]',module);
    }
    catch(e){
      app.error('[MODULE]',module,e);
    }
  }
