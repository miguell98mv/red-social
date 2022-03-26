const express = require("express");
const router = express.Router();
const controllerUser = require("../controller/user.controller");
const login = require("../controller/login.controller");
// const service = require("../services/user.service");
// const boom = require("@hapi/boom");

router.post("/", controllerUser.addUser);
router.post("/login", login.login);

module.exports = router;
