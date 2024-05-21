// import express, { Router } from "express";
// import authController from "../controller/authController.mjs";
// // import  session  from "express-session";
// import { authMiddle, isLoggedIn } from "../middleware/Auth.mjs";
// import {
//   useDatabaseChat,
//   createDatabase,
//   createTableUsers,
//   addTableUsers,
// } from "../db/dbController.mjs";
// //auth

// import passport from "passport";


// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import googleFunc from "../utils/socialAuth/authGoogle.mjs";
// import pool from "../db/mysql.config.mjs";
// import facebookFunc from "../utils/socialAuth/authFacebook.mjs";

// const app = express();
// const authRouter = Router();

// const userFacebook = await facebookFunc();
// // const user = await googleFunc();
// const user = {};

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:4001/google/callback",
//       accessType: "offline",
//       passReqToCallback: true,
//     },
//     function (request,accessToken, refreshToken, profile, done) {

//       // console.log("profile", profile);
//       // console.log("accesToken", accessToken);
//       user.email = profile.emails[0].value;
//       user.accessToken = accessToken;
//       user.name = profile.displayName;
     
//       return done(null, profile);

//     }
   
//   )
// );


// passport.serializeUser(function (user, done) {

//   done(null, user);
// });



// passport.deserializeUser(async (id, done) => {
//   console.log("opshi user", id.emails[0].value);
//   done(null, id);
// });

// authRouter.get("/", authController.googleLogin);
// authRouter.get("/logout", authController.googleLogout);
// authRouter.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// authRouter.get(
//   "/google/callback",
//   passport.authenticate("google",{
//     successRedirect: "/protected",
//     failureRedirect: "/auth/failure",
//   })
// );

// authRouter.get("/auth/failure", authController.authFailure);

// //auth facebook
// authRouter.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", { scope: ["email", "profile"] })
// );

// authRouter.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/failure",
//   }),
//   function (req, res) {
//     const url = "https://chat.trigger.ltd/"
//     // Successful authentication, redirect home.
//     res.redirect(301,url);
//   }
// );
// authRouter.get("/protected", isLoggedIn, async (req, res) => {
//   // await createDatabase()
//   // await useDatabaseChat();
//   // await createTableUsers()
//   // await addTableUsers(user.email,user.name)
//    console.log(user);

//   // const userData = [user.name, user.email];
//   // const insertUserSql = `INSERT INTO users (name, email) VALUES ("${user.name}","${user.email}")`;
//   // pool.query(insertUserSql, (error, results, fields) => {
//   //   if (error) throw error;
//   //   console.log("Data inserted into users table successfully");
//   // });
//   const url = "https://chat.trigger.ltd/";
//   console.log("email", user.email);
//   console.log("email",user.accessToken);
//   res.cookie("email", user.email);
//   res.cookie("accessToken", user.accessToken);
//   // res.cookie("userName", user.name);
//   res.redirect(301,url);
// });

// //auth facebook

// export default authRouter;
