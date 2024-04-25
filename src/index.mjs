import ip from "ip";
import app from "./app.mjs";
import logger from "./utils/logger/logger.mjs";

const start = async () => {
  // if (!process.env.ACCESS_TOKEN) throw new Error("Error getting ACCESS_TOKEN");

  // if (!process.env.SERVICE_PORT) throw new Error("Error getting SERVICE_PORT");

  // console.log(process.env.SERVICE_PORT);

  app.listen(4000, () => logger.info(`APP LIVE AT ${ip.address()}:${4000}`));
};

start();
