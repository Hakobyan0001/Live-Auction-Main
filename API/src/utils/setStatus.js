const setStatus = function (res, error, data) {
  const status = data.status || (error ? 401 : 200);
  return res.status(status).json({ error: error, ...data });
};

module.exports = setStatus;
