const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const bcryptHelper = require("../utils/bcrypt");
const sequelize = require("../config/database");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptHelper().password(user);
  },
};

const tableName = "users";

class User extends Sequelize.Model {}

User.init(
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.TEXT,
    },
    lastName: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: Sequelize.ENUM,
      values: ["customer", "admin"],
      defaultValue: "customer",
    },
  },
  { sequelize, modelName: tableName, hooks }
);

User.associate = function (models) {
  User.hasMany(models.Service, { constraints: false });
};

User.prototype.comparePassword = async function (passwordAttempt) {
  // is match
  return await bcrypt.compare(passwordAttempt, this.password);
};

module.exports = User;
