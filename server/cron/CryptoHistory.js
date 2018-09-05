module.exports = function(app) {
  var CronJob = require('cron').CronJob;
  return new CronJob({
    cronTime: '* * 1 * * *',
    start: true,
    runOnInit: true,
    onTick: function() {
      app.models.cryptoPairs.findOne({}).sort({lastDailyUpdate: 1}).limit(1).exec(function(_, e) {
        e.updateDailyTicks(app)
          .then(e=>console.log(e))
      })
    }
  });
}
