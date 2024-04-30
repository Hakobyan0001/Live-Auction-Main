const services = require("../services");
const setStatus = require("../utils/setStatus");
const config = require("../config/configs");

module.exports = async function (req, res, next) {
  const user = req.user;
  const id = req.params.id;

  const bid = await services.BidsService.getById(id);
  if (bid) {
    if (bid && bid.userId === user.id) {
      next();
      return;
    }
  }
  setStatus(res, true, {
    status: config.UnauthorizedError,
    message: "Error with getting data, please recheck your permissions.",
  });
};
