const services = require("../services");
const setStatus = require("../utils/setStatus");
const config = require("../config/configs");

module.exports = async function (req, res, next) {
  const user = req.user;
  const id = req.params.id;

  // if (user.role === "admin") {
  //   next();
  //   return;
  // }

  const item = await services.ItemsService.getById(id);
  if (item) {
    if (item && item.userId === user.id) {
      next();
      return;
    }
  }

  setStatus(res, true, {
    status: config.UnauthorizedError,
    message: "Error with getting data, please recheck your permissions.",
  });
};
