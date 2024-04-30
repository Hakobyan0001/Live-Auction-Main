const auth = require("./authRoutes");
const users = require("./usersRoutes");
const items = require("./itemsRoutes");
const bid = require("./bidRoutes");
module.exports = function (app) {
  app.use("/auth", auth);
  app.use("/users", users);
  app.use("/items", items);
  app.use("/bid", bid);
};
