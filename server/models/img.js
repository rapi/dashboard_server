var mongoose = require('mongoose');
imgSchema = new mongoose.Schema({
  name: String,
  path: String,
  encoding: String,
  mimetype: String,
  destination: String,
  path: String,
  size: Number,
  module: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
 });

 //middle ware in serial
 // imgSchema.pre('save', function preSave(next){
 //   var something = this;
 //   app.log(something)
 //   something.updatedAt=Date.now();
 //   next();
 // });
Img = mongoose.model('Img', imgSchema);
module.exports = Img
