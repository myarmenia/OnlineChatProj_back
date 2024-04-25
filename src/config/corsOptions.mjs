import allowedOrigins from "./allowedOrigins.mjs";

const corsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true,
};

export default corsOptions;
