const express = require("express");
const router = express.Router();
const { authGuards, roleGuard } = require("../guards");
const userController = require("../controllers/userController");
const auth = require("../config/auth");

const roles = auth.userRoles;

router.get(
  "/",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  userController.getUsers
);

router.post(
  "/",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  userController.createUser
);

router.put(
  "/:id",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  userController.updateUser
);

router.delete(
  "/:id",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  userController.deleteUser
);

module.exports = router;
