import ip from "ip";
import app from "./app.mjs";
import logger from "./utils/logger/logger.mjs";
import { addTableUsers, useDatabaseChat } from "./db/dbController.mjs";

const userEmail="art@mail.ru"
const userNAme="Artur"


const start = async () => {
  if (!process.env.ACCESS_TOKEN) throw new Error("Error getting ACCESS_TOKEN");

  if (!process.env.SERVICE_PORT) throw new Error("Error getting SERVICE_PORT");

  app.listen(process.env.SERVICE_PORT, () =>
    logger.info(`APP LIVE AT ${ip.address()}:${process.env.SERVICE_PORT}`)
  );
};

start();
