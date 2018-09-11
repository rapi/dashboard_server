var mongoose = require('mongoose');
symbolsSchema = new mongoose.Schema({
  name: String,
  desc: String,
  logo: String,
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
symbolsSchema.methods.updateDailyTicks = function(app) {
  return app.providers.stockHistory[this.providers[0]].daily(this.name)
    .then((e)=>{
      this.dailyHistory=e;
      this.lastDailyUpdate=new Date();
      this.save();
      return this;
    })
}
Symbols = mongoose.model('Stock', symbolsSchema);
module.exports = Symbols
