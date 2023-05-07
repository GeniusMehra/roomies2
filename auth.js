import passport from 'passport';
import GoogleStrategy from ('passport-google-oauth2').Strategy
    
const GOOGLE_CLIENT_ID = "612271809968-mklsf5lfjiidss5ncuctgaa1gc72sahk.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});