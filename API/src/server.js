const http = require("http");
const app = require("./app");
const config = require("./config/configs");
const server = http.createServer(app);

server.listen(config.port, function () {
  console.log("Server is listening on port", config.port);
});
