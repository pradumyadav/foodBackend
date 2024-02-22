const express = require("express");
const router = express.Router();
const { createUser, signin, logout } = require("../../controller/authController");
const passport = require("passport");
const registrationValidator = require("../../validators/registrationValidator");
const { getAllstaff } = require("../../controller/authController");

router
  .post("/signup", registrationValidator, createUser)
  .post("/signin",   passport.authenticate('local'),  signin)
  .get("/logout", logout)
  .get("/allstaff", getAllstaff);
module.exports = router;
        