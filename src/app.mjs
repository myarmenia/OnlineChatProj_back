// app imports
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import ejs from "ejs"
import cookieParser from "cookie-parser";
import path from "node:path";

import passport from "passport";

import { fileURLToPath } from "node:url";
// app imports

// utils imports
import apiLogger from "./utils/logger/apiLogger.mjs";
import logger from "./utils/logger/logger.mjs";
// utils imports

//configs imports
import credentials from "./config/credentials.mjs";
import corsOptions from "./config/corsOptions.mjs";
// configs imports

// middlewares imports
import  session  from "express-session";
// middlewares imports

//routes imports
import authRouter from "./router/authRouter.mjs";
//routes imports

// app
const app = express();
const dotenv = configDotenv();
// app

// configs
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(apiLogger);
// configs
//auth
app.use(session({ secret: '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', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//auth
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));



app.use("/",authRouter)


// error handlers
app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
  logger.error({ message: err.message });
});
// error handlers

export default app;
