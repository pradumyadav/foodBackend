const express = require("express");
const router = express.Router();
 const orderController = require("../../controller/orderController");
 const passport = require('passport');

router.post("/createOrder", orderController.createOrder);

router.get("/allOrders", orderController.getAllOrders);

// router.get("/orders/:id", orderController.getOrderById);

// router.put("/orders/:id", orderController.updateOrderById);

// router.delete("/orders/:id", orderController.deleteOrderById);

module.exports = router;
