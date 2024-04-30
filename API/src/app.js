const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const statusCodes = require("./config/statusCodes");
const configs = require("./config/configs");
const dbInit = require("./db/init");

const app = express();
const environment = process.env.NODE_ENV;
const DB = dbInit(environment, configs.migrate).start();
const router = require("./routes");
const setStatus = require("./utils/setStatus");

// cross origin requests
app.use(cors());
app.options("*", cors());
app.disable("x-powered-by");
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

app.get("/test", (req, res) => {
  res.send("The server is up");
});

app.use((err, req, res, next) => {
  if (err.code === "permission_denied") {
    setStatus(res, true, {
      status: statusCodes.UnauthorizedError,
      message: "Error with getting data, please recheck your permissions.",
    });
  } else {
    setStatus(res, true, {
      status: err.statusCode ? err.statusCode : statusCodes.ServerError,
      message: err.message,
    });
  }
});

app.get("*", (req, res) => {
  setStatus(res, true, {
    status: statusCodes.NotFoundStatus,
    message: "Not found.",
  });
});

module.exports = app;
