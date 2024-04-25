// app imports
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
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

// middlewares imports

//routes imports

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

// routes
app.get("/", (req, res) => res.send("aaa"));
// routes

// error handlers
app.use((err, req, res, next) => {
  res.status(404).send({ message: err.message });
  logger.error({ message: err.message });
});
// error handlers

export default app;
