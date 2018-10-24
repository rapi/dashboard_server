var chai = require('chai'),
  expect = chai.expect,
  should = chai.should(),
  fs = require('fs');
  mongoose = require('mongoose');
  app = require('../index.js')
env={}
process.argv.forEach(function (val, index, array) {
  if(val.indexOf('--')===0)
  env[val.split('=')[0].replace('--','')]=val.split('=')[1]
});
// app.log(env)
describe('Full test', function() {
  it('Start test', (e) => {
    e()
  })
  after(function(done) {
    for (let i in app.cron){
      app.cron[i].stop()
    }
    // mongoose.connection.close()
    app.httpServer.close()
    done()
  });
  fs.readdirSync(__dirname).forEach(module => {
    if(env.module && env.module===module )
    // check if is Directory
    if (fs.existsSync(__dirname + '/' + module + '/index.js')) {
      modules = require(__dirname + '/' + module + '/index.js');
      describe('Test ' + module + ':', function() {
        for (name in modules)
          describe(name + ':', function() {
            modules[name](app);
          })
      })
    }
  })
})
