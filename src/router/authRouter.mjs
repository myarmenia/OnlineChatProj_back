import express, { Router } from "express";
import authController from "../controller/authController.mjs";
// import passport from "passport";
// import  session  from "express-session";
import { authMiddle, isLoggedIn } from "../middleware/Auth.mjs";
import {
  useDatabaseChat,
  createDatabase,
  createTableUsers,
  addTableUsers,
} from "../db/dbController.mjs";
// import passportf from './passport-config.js';
//auth

import passport from "passport";
// import express from "express";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import googleFunc from "../utils/socialAuth/authGoogle.mjs";
import pool from "../db/mysql.config.mjs";
// import facebookFunc from "../controller/__test__/authFacebook.mjs";

const app = express();
const authRouter = Router();

// const userFacebook = await facebookFunc();
const user = await googleFunc();

authRouter.get("/", authController.googleLogin);
authRouter.get("/logout", authController.googleLogout);
authRouter.get(
  "/auth/google",authMiddle,
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

authRouter.get("/auth/failure", authController.authFailure);
authRouter.get("/protected",isLoggedIn,  async (req, res) => {
  // await createDatabase()
  // await useDatabaseChat()
  // await createTableUsers()
  // await addTableUsers(user.email,user.name)
  const userData = [user.name, user.email];
  const insertUserSql = `INSERT INTO users (name, email) VALUES ("${user.name}","${user.email}")`;
  pool.query(insertUserSql, (error, results, fields) => {
    if (error) throw error;
    console.log("Data inserted into users table successfully");
  });
  res.send(user);
});



//auth facebook
// app.get('/auth/facebook',
// passportf.authenticate('facebook',{ scope: ["email", "profile"] }));

// app.get('/auth/facebook/callback',
// passportf.authenticate('facebook', { successRedirect: "/protected",failureRedirect: '/auth/failure' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

//auth facebook

export default authRouter;
