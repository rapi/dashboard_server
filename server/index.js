var app={
  modules:[
    'log',
    'dotenv',
    'mongodb',
    'models',
    'controllers',
    'express',
  ]
}
for(let module of app.modules){
    try{
      require('./modules/'+module)(app);
      app.log('[+]  '+module);
    }
    catch(e){
      app.log('[-]  '+module,e);
    }
  }
