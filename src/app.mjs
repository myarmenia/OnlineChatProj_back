import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiLogger from "./utils/logger/apiLogger.mjs";
import credentials from "./config/credentials.mjs";
import corsOptions from "./config/corsOptions.mjs";
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import { addTableUsers, getTableUsers, useDatabaseChat } from "./db/dbController.mjs";
// import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";


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
  key: 'connect.sid',
  secret: 'your-secret-key',
  // store: sessionStorage,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use GoogleStrategy
const googleUser={}
passport.use(new GoogleStrategy({
  clientID: "367879367836-hfat57a781iee8is96nkvknrmi39ts8r.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: 'https://chat.trigger.ltd:4001/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
 

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
//google config


//facebook config
passport.use(
      new FacebookStrategy(
        {
          clientID: "1374054513291709",
          clientSecret: "737f92274f4cb84f6160752902e4f0c7",
          callbackURL: "https://chat.trigger.ltd:4001/auth/facebook/callback",
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

//facebook config




// Routes
app.get('/', (req, res) => {
  const url ="https://chat.trigger.ltd"
  res.redirect(301,url);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['profile', 'email'] })
)

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    if (req.user) {
      // Assuming googleUser is the authenticated user object
      const googleUser = req.user;
      // req.session.name = googleUser.name;
      // req.session.email = googleUser.email;
      // req.session.accessToken = googleUser.accessToken;
      await useDatabaseChat()
      const userName=googleUser.name.givenName+" "+googleUser.name.familyName
      const usersDb=await getTableUsers()
      const findUser=usersDb[0].find((el)=>{
        return el.email===googleUser.emails[0].value
      })
      if(!findUser){
        await addTableUsers(googleUser.emails[0].value,userName)
      }
      
      // Set cookies
      res.cookie('name', googleUser.name, { httpOnly: true, secure: true });
      res.cookie('email', googleUser.email, { httpOnly: true, secure: true });
      res.cookie('accessToken', googleUser.accessToken, { httpOnly: true, secure: true });


      // Redirect to the desired URL
      ;
      res.redirect('/profile')
    } else {
      res.redirect('/');
    }
  }
);

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
async (req, res) => {
  if (req.user) {
    // Assuming googleUser is the authenticated user object
    const googleUser = req.user;
    // req.session.name = googleUser.name;
    // req.session.email = googleUser.email;
    // req.session.accessToken = googleUser.accessToken;
    await useDatabaseChat()
    const userName=googleUser.name.givenName+" "+googleUser.name.familyName
    const usersDb=await getTableUsers()
    const findUser=usersDb[0].find((el)=>{
      return el.email===googleUser.emails[0].value
    })
    if(!findUser){
      await addTableUsers(googleUser.emails[0].value,userName)
    }
    
    // Set cookies
    res.cookie('name', googleUser.name, { httpOnly: true, secure: true });
    res.cookie('email', googleUser.email, { httpOnly: true, secure: true });
    res.cookie('accessToken', googleUser.accessToken, { httpOnly: true, secure: true });


    // Redirect to the desired URL
    ;
    res.redirect('/profile')
  } else {
    res.redirect('/');
  }
}
)



app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    const url ="https://chat.trigger.ltd"
    return res.redirect(301,url);
  }
  
  const url = `https://chat.trigger.ltd/user/${req.user.displayName}`
  // const url = 'https://chat.trigger.ltd'
  res.redirect(301,url)
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Start the server

export default app;
