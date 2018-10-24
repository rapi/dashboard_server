module.exports = function(app) {
  var CronJob = require('cron').CronJob;
  return new CronJob({
    cronTime: '* * 1 * * *',
    start: true,
    runOnInit: true,
    onTick: function() {
      app.models.stock.find({enabled:true}).sort({lastDailyUpdate: 1}).limit(100).exec(function(_, e) {
        for(let i in e){
          e[i].updateDailyTicks(app)
            .then(e=>app.log('[Updated] ',e.name,'[',e.dailyHistory.length+']'))
            .catch(e=>app.log('[ERROR]  ',e.name
          ))
          }
      })
    }
  });
}
