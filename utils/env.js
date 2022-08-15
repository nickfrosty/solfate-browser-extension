// tiny wrapper with default env vars
module.exports = {
  NODE_PATH: process.env.NODE_PATH || "./build",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
};
