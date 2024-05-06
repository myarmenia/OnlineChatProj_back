// import passport, { use } from "passport";
// import { Strategy as FacebookStrategy } from 'passport-facebook';


// const facebookFunc=async ()=>{
//     const user={}
    
    
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//     //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//     //   });
//     }
//   )
// );
// passport.serializeUser(function (user, done) {
//   // console.log("users verjin",user.emails[0].value);
//   done(null, user);
// });

// passport.deserializeUser(async (id, done) => {
//   console.log("opshi user", id.emails[0].value);
//   done(null, id);
// });

// return user
// }

// export default facebookFunc;
