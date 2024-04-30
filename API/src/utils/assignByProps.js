const { pick } = require("lodash");

const assignByProps = (obj, keys) => {
  return pick(obj, keys);
};

module.exports = assignByProps;
