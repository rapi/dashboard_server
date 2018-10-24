const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate')

mongoose.set('useCreateIndex', true)
const User = new Schema({
  name:String,
  avatar:String,
  facebook:String,
  google:String,
  linkedin:String,
  more:Object,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
