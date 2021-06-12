const express = require("express");
const router = express.Router();
const authController = require("../controllers/user_controllers");

router.post("/register",  authController.register);
router.post("/login", authController.login)

module.exports = router;


