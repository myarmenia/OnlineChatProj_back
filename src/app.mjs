
import { configDotenv } from "dotenv";
import cors from "cors";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import apiLogger from "./utils/logger/apiLogger.mjs";
import logger from "./utils/logger/logger.mjs";
import credentials from "./config/credentials.mjs";
import corsOptions from "./config/corsOptions.mjs";
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
// import config from './config.mjs';
const dotenv = configDotenv();
const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(apiLogger);

















// Configure session middleware
app.use(session({
  secret: "cat",
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use GoogleStrategy
const googleUser={}
passport.use(new GoogleStrategy({
  clientID: "367879367836-hfat57a781iee8is96nkvknrmi39ts8r.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: 'http://chat.trigger.ltd:4001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // This callback is called when Google has authenticated the user
  // You can save the user profile to your database here
  googleUser.name=profile.displayName
  googleUser.accessToken=accessToken
  googleUser.email=profile.emails[0].value
  // console.log("profile");
  // console.log("profile",profile.emails[0].value);
  // console.log("accessToken",accessToken);
  return done(null, profile);
}));

// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, set cookies and redirect
   console.log(googleUser.name);
    res.cookie('name', googleUser.name, { httpOnly: true, secure: true });
    res.cookie('email', googleUser.email, { httpOnly: true, secure: true });
    res.cookie('accessToken', googleUser.accessToken, { httpOnly: true, secure: true });

    const url = 'https://chat.trigger.ltd';
    res.redirect(301, url);
  }
);



app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.send(`Hello, ${req.user.displayName}! <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Start the server

export default app;
