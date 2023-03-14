const { createServer } = require("http");
const app = require("./src/app");

const server = createServer(app);

async function startServer() {
  try {
    server.listen(3000, () => console.log(`Server is listening on port 3000`));
  } catch (error) {
    console.error(error);
  }
}

startServer();
