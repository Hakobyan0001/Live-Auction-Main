const passport = require("passport");

const loginToPassport = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  loginToPassport,
  requireAuth,
};
