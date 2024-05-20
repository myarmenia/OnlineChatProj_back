import express, { Router } from "express";
import authController from "../controller/authController.mjs";
// import  session  from "express-session";
import { authMiddle, isLoggedIn } from "../middleware/Auth.mjs";
import {
  useDatabaseChat,
  createDatabase,
  createTableUsers,
  addTableUsers,
} from "../db/dbController.mjs";
//auth

import passport from "passport";


import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import googleFunc from "../utils/socialAuth/authGoogle.mjs";
import pool from "../db/mysql.config.mjs";
import facebookFunc from "../utils/socialAuth/authFacebook.mjs";

const app = express();
const authRouter = Router();

const userFacebook = await facebookFunc();
const user = await googleFunc();

authRouter.get("/", authController.googleLogin);
authRouter.get("/logout", authController.googleLogout);
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("api",{
    successRedirect: "/protected",
    failureRedirect: "api/auth/failure",
  })
);

authRouter.get("/auth/failure", authController.authFailure);

//auth facebook
authRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "profile"] })
);

authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "api/protected",
    failureRedirect: "api/auth/failure",
  }),
  function (req, res) {
    const url = "https://chat.trigger.ltd/"
    // Successful authentication, redirect home.
    res.redirect(301,url);
  }
);
authRouter.get("/protected", isLoggedIn, async (req, res) => {
  // await createDatabase()
  // await useDatabaseChat();
  // await createTableUsers()
  // await addTableUsers(user.email,user.name)
  //  console.log(user);

  const userData = [user.name, user.email];
  const insertUserSql = `INSERT INTO users (name, email) VALUES ("${user.name}","${user.email}")`;
  pool.query(insertUserSql, (error, results, fields) => {
    if (error) throw error;
    console.log("Data inserted into users table successfully");
  });
  const url = "https://chat.trigger.ltd/";
  res.cookie("email", user.email);
  res.cookie("accessToken", user.accessToken);
  res.cookie("userName", user.name);
  res.redirect(301,url);
});

//auth facebook

export default authRouter;
