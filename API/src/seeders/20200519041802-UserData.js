const bcryptHelper = require("../utils/bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = new Date();
    const password = bcryptHelper().password({ password: "admin1111!" });
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Khachatur",
          lastName: "Hakobyan",
          email: "admin@gmail.com",
          role: "admin",
          password,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
