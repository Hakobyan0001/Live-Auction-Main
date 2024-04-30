const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const tableName = "bids";

class Bid extends Sequelize.Model {}

Bid.init(
  {
    itemId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    bidAmount: Sequelize.FLOAT,
    isWin: Sequelize.BOOLEAN,
  },
  {
    sequelize,
    modelName: tableName,
  }
);

Bid.associate = function (models) {
  Bid.belongsTo(models.User, { foreignKey: "userId", constraints: false });
  Bid.belongsTo(models.Item, { foreignKey: "itemId", constraints: false });
};

module.exports = Bid;
