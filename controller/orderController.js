// Assuming you have already imported the Order model
const Order = require("../models/Orders");
const User = require("../models/User");

// Controller to create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extract data from request body

    console.log("req.body",req.body, "req.user", req)
    const response = await User.find({ role: "staff", availability: true }); 
    var staffId = null;
    if(response.length){
        staffId = response[0].id;
    }

    // Create a new order instance
    const newOrder = new Order({
      userId: req.user.id,
      itemId: req.body.orderId,
      stafId
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json(newOrder); // Return the created order
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    res.status(200).json(orders); // Return the orders
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    // Extract order ID from request parameters
    const { id } = req.params;

    // Fetch the order from the database by ID
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order); // Return the order
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to update an order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract data to update from request body
    const { customer, products, totalAmount, status } = req.body;

    // Fetch the order from the database by ID and update it
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        customer,
        products,
        totalAmount,
        status,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder); // Return the updated order
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete an order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    // Extract order ID from request parameters
    const { id } = req.params;

    // Fetch the order from the database by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
