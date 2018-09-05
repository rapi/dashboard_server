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
      this.dailyHistory=e;
      this.save()
      return this;
    })
}
crypto = mongoose.model('CryptoPairs', cryptoSchema);
module.exports = crypto
