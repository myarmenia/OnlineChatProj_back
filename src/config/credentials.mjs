import allowedOrigins from "./allowedOrigins.mjs";

const credentials = (req, res, next) => {
  const origin = req?.headers?.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  next();
};

export default credentials;
