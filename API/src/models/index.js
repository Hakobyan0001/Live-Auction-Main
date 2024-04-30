const User = require("./UserModel");
const Service = require("./ItemModel");

const models = {
  User,
  Service,
};

Object.values(models).forEach(
  (Model) => Model.associate && Model.associate(models)
);

global.models = models;

module.exports = models;
