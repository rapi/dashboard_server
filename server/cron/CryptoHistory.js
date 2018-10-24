module.exports = function(app) {
  var CronJob = require('cron').CronJob;
  return new CronJob({
    cronTime: '* * 1 * * *',
    start: true,
    runOnInit: true,
    onTick: function() {
      // app.models.cryptoPairs.find({}).sort({lastDailyUpdate: 1}).limit(8).exec(function(_, e) {
      //   for(let i in e){
      //     e[i].updateDailyTicks(app)
      //       .then(e=>app.log('[Updated]',e.from+e.to))
      //       .catch(e=>app.log('[ERROR]',e.from+e.to))
      //     }
      // })
    }
  });
}
