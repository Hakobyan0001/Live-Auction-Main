const isValidEmail = (val) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
};

module.exports = {
  isValidEmail,
};
