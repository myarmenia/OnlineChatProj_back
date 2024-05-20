import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "../../db/mysql.config.mjs";


const googleFunc = async (req, res) => {
  const user = {};

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://195.181.242.194/api/google/callback",
        accessType: "offline",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
       
        console.log("profile", profile);
        console.log("accesToken", accessToken);
        user.email = profile.emails[0].value;
        user.accessToken = accessToken;
        user.name = profile.displayName;
        const userData = [user.name, user.email];
        const insertUserSql = `INSERT INTO users (name, email) VALUES ("${user.name}","${user.email}")`;
        pool.query(insertUserSql, (error, results, fields) => {
          if (error) throw error;
          console.log("Data inserted into users table successfully");
        });
        res.cookie("email", user.email);
        res.cookie("accessToken", user.accessToken);
        res.cookie("userName", user.name);
        return done(null, profile);
    
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
};

export default googleFunc;
