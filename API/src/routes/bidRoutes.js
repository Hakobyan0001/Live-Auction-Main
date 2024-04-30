const express = require("express");
const router = express.Router();
const { authGuards, checkItemOwner } = require("../guards");

const bidController = require("../controllers/bidController");

router.post("/", authGuards.requireAuth, bidController.createBid);

router.put(
  "/:id",
  authGuards.requireAuth,
  checkItemOwner,
  bidController.updateBid
);

module.exports = router;
