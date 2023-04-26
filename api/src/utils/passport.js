const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: "1042216557034-foecoc9icuqhahh5bndoabjgukv7aa16.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
  //passReqToCallback: true,
},

function (accessToken, refreshToken, profile, callback) {
  callback(null, profile);
  
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
