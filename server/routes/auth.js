const router = require("express").Router();
const register = require("../controller/register");
const login = require("../controller/login");

router.post("/register", register.register);
router.post("/login", login.login);

module.exports = router;
