var LocalStrategy = require('passport-local').Strategy;

module.exports=function(app){
  app.log('[EXPRESS] passport')

  app.passport= require('passport')
  app.passport.use(app.models.user.createStrategy());
  app.express.use(app.passport.initialize());
  app.express.use(app.passport.session());
  app.passport.serializeUser(function(user, done) {
    done(null, {
      facebook:user.facebook,
      google:user.google,
      linkedin:user.linkedin,
    });
  });

  app.passport.deserializeUser(function(data, done) {
    app.models.user.find({
      facebook:data.facebook,
      google:data.google,
      linkedin:data.linkedin,
    }, function(err, user) {
      done(err, user);
    });
  });
  // app.passport.serializeUser(app.models.user.serializeUser());
  // app.passport.deserializeUser(app.models.user.deserializeUser());
}
