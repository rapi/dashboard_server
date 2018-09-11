module.exports = function(app) {
  var CronJob = require('cron').CronJob;
  return new CronJob({
    cronTime: '* * 1 * * *',
    start: true,
    runOnInit: true,
    onTick: function() {
      app.models.stock.find({}).sort({lastDailyUpdate: 1}).limit(8).exec(function(_, e) {
        for(let i in e){
          e[i].updateDailyTicks(app)
            .then(e=>console.log('[Updated] ',e.name,'[',e.dailyHistory.length+']'))
            .catch(e=>console.log('[ERROR]  ',e.name
          ))
          }
      })
    }
  });
}
