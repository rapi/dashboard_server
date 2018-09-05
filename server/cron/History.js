module.exports = function(app) {
  var CronJob = require('cron').CronJob;
  return new CronJob({
    cronTime: '1 * * * * *',
    start: true,
    runOnInit: true,
    onTick: function() {
      app.models.symbols.find({}).sort({lastDailyUpdate: 1}).limit(1).exec(function(_, e) {
        e[0].updateDailyTicks(app)
        // console.log(e[0].name)
      })
    }

  });
}
module.exports =()=>{}
