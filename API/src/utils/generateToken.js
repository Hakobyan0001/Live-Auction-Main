const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

const generateToken = (user) => {
  return jwt.sign(user, auth.secret, {
    expiresIn: parseInt(auth.tokenExpiration),
  });
};

module.exports = generateToken;
