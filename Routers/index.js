const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/auth"))
router.use("/product", require("./Product/product"))
router.use("/orders", require("./OrderRoutes/orderroutes"))

module.exports = router;
