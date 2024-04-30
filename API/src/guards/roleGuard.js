const guard = require("express-jwt-permissions")({
  requestProperty: "user",
  permissionsProperty: "role",
});

module.exports = guard;
