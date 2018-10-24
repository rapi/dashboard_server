const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app) {
  if(!app.config.FACEBOOK_TOKEN&& !app.config.FACEBOOK_APP && !app.config.FACEBOOK_CALLBACK){
    app.error('[EXPRESS] setup facebook tokens in .env FACEBOOK_TOKEN & FACEBOOK_APP & FACEBOOK_CALLBACK')
    return false;
  }
  app.passport.use(new FacebookStrategy({
    clientID:             app.config.FACEBOOK_TOKEN,
    clientSecret:         app.config.FACEBOOK_APP,
    callbackURL:          app.config.FACEBOOK_CALLBACK
  },   function(accessToken, refreshToken, profile, cb) {
    app.models.user.findOne({ facebook: profile.id}, function (err, user) {
      if(!user){
        user=new app.models.user({
          facebook:profile.id,
          name:profile.displayName,
          avatar:profile.avatar,
          more:profile
        })
        user.save();
      }
      console.log(user);
      return cb(false, user);
    });
  } ));
  app.express.get('/auth/facebook', app.passport.authenticate('facebook'));

  app.express.get('/auth/facebook/callback', app.passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  app.log('[EXPRESS] passportFacebook')
}
