import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';




const googleFunc=async ()=>{
const user={}


 passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback",
    accessType: 'offline',
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log("profile",profile);
      console.log("accesToken",accessToken);
      user.email=profile.emails[0].value
      user.accessToken=accessToken
      user.name=profile.displayName
      return done(null, profile);
    // })
  }
));

passport.serializeUser(function(user, done) {
  // console.log("users verjin",user.emails[0].value);
    done(null, user);
  });
  
passport.deserializeUser(async (id, done)=> {
    console.log("opshi user",id.emails[0].value);
      done(null, id);
  });
return user
}

export default googleFunc