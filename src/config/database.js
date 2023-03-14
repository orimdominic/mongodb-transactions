const { connect, connection, disconnect } = require("mongoose");

const getDbUri = () => {
  if (!process.env.DB_URI) {
    throw new Error(`DB_URI env variable not set`);
  }
  return process.env.DB_URI;
};

module.exports.connectToDB = async (URI = getDbUri()) => {
  await connect(URI)
    .then(() => {
      console.info("Connected to database");
    })
    .catch((err) => {
      logger.error("Error connecting to database");
      logger.error(err);
      throw err;
    });
};
