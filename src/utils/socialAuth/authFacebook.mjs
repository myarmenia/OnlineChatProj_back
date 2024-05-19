import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
const facebookFunc = async () => {
  const user = {};
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://chat.trigger.ltd/",
        accessType: "offline",
        passReqToCallback: true,
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(err, user);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("opshi user", id.emails[0].value);
    done(null, id);
  });
  return user;
};
export default facebookFunc;
