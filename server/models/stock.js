var mongoose = require('mongoose');
symbolsSchema = new mongoose.Schema({
  name: String,
  desc: String,
  logo: String,
  enabled: Boolean,
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
  if(app.providers.stockHistory[this.providers[0]])
    return app.providers.stockHistory[this.providers[0]].daily(this.name)
      .then((e)=>{
        this.dailyHistory=e;
        this.lastDailyUpdate=new Date();
        this.enabled=true;
        this.save();
        return this;
      })
      .catch((e)=>{
        this.enabled=false;
        this.save();
        return this
      })
  else console.log('No provider `'+this.providers[0]+'`for '+this.name)
}
Symbols = mongoose.model('Stock', symbolsSchema);
module.exports = Symbols
