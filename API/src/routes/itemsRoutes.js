const express = require("express");
const router = express.Router();
const { authGuards, roleGuard, checkItemOwner } = require("../guards");

const itemController = require("../controllers/itemController");
const auth = require("../config/auth");

const roles = auth.userRoles;

router.get("/", itemController.getItems);
router.get("/:id", itemController.getItem);
router.post(
  "/",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  itemController.createItem
);

router.put(
  "/:id",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  checkItemOwner,
  itemController.updateItem
);

router.delete(
  "/:id",
  authGuards.requireAuth,
  roleGuard.check([[roles.ADMIN]]),
  checkItemOwner,
  itemController.deleteItem
);

module.exports = router;
