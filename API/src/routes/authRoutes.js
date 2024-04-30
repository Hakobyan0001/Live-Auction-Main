const express = require("express");
const authController = require("../controllers/authController");
const passportService = require("../config/passport");
const { authGuards } = require("../guards");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authGuards.loginToPassport, authController.login);

module.exports = router;
