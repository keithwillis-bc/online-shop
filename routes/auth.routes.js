const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

router.get("/signup", authController.getSignup);

router.get("/login", authController.getLogin);

router.post("/signup", authController.processSignup);

router.post("/login", authController.performLogin);

router.post("/logout", authController.performLogout);

module.exports = router;
