const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const UserModel = require("./UserModel");
const tableName = "items";

class Service extends Sequelize.Model {}

Service.init(
  {
    name: Sequelize.TEXT,
    description: Sequelize.TEXT,
    currentBid: Sequelize.FLOAT,
    imageUrl: Sequelize.TEXT,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    userId: Sequelize.INTEGER,
  },
  {
    sequelize,
    modelName: tableName,
    defaultScope: {
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password"] },
        },
      ],
    },
  }
);

Service.associate = function (models) {
  Service.belongsTo(models.User, { constraints: false });
};

module.exports = Service;
