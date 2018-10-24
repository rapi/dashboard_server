var mongoose = require('mongoose');
cryptoSchema = new mongoose.Schema({
  from: String,
  to: String,
  logo: [String],
  providers: [String],
  lastDailyUpdate: Date,
  dailyHistory: [{
    time: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
  }]
});
cryptoSchema.methods.updateDailyTicks = function(app) {
  return app.providers.cryptoHistory[this.providers[0]].daily(this.from,this.to)
    .then((e)=>{
      app.log(e.length);
      if(e.length===0)return this;
      this.dailyHistory=e;
      this.lastDailyUpdate=new Date();
      this.save()
      return this;
    })
}
crypto = mongoose.model('CryptoPairs', cryptoSchema);
module.exports = crypto
