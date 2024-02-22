const express = require("express");
const { createProduct, getAllProduct, getAllstaff } = require("../../controller/productController");
const router = express.Router();


router
  .post("/createproduct",createProduct)
  .get("/allproduct",getAllProduct)
//   .get("/allstaff",getAllstaff)
//   .post("/signin", passport.authenticate("local"), signin)
//   .get("/logout", passport.authenticate("jwt"), logout);

module.exports = router;
