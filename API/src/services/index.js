const UsersService = require("./UsersService");
const ItemsService = require("./ItemsService");
const BidsService = require("./BidsService");

module.exports = {
  usersService: new UsersService(),
  ItemsService: new ItemsService(),
  BidsService: new BidsService(),
};
