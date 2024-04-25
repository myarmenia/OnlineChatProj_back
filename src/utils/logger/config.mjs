const config = {
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "info" },
  },
};

export default config;