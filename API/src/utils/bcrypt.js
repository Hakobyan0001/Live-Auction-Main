const bcrypt = require("bcrypt-nodejs");

const bcryptHelper = () => {
  const password = (user) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(user.password, salt); //hash
  };

  const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptHelper;
