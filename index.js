const { createServer } = require("http");
require("dotenv").config(); // attach all env variable from .env file to process.env

const app = require("./src/app");
const { connectToDB } = require("./src/config/database");

const server = createServer(app);

async function startServer() {
  try {
    await connectToDB();
    server.listen(3000, () => console.log(`Server is listening on port 3000`));
  } catch (error) {
    console.error(error);
  }
}

startServer();
