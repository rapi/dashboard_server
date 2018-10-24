var GooglePlusStrategy = require('passport-google-plus');

module.exports = function(app) {
  if(!app.config.GOOGLE_CLIENT_ID&& !app.config.GOOGLE_SECRET){
    app.error('[EXPRESS] setup google plus tokens in .env GOOGLE_CLIENT_ID & GOOGLE_SECRET')
    return false;
  }
  // console.log(app.config.GOOGLE_CLIENT_IDapp.config.GOOGLE_SECRET)
  app.passport.use(new GooglePlusStrategy({
      clientId: app.config.GOOGLE_CLIENT_ID,
      clientSecret: app.config.GOOGLE_SECRET
    },
    function(tokens, profile, done) {
      console.log(profile,done)
      // Create or update user, call done() when complete...
      done(null, profile, tokens);
    }
  ));
  // app.express.get('/auth/google', function(req){console.log(req.body)});

  app.express.post('/auth/google/callback', app.passport.authenticate('google'), function(req, res) {
      // Return user back to client
      console.log(req.user)
      res.send(req.user);
  });
  app.log('[EXPRESS] passportGoogle')
}
