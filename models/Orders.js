const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  id: { type: Number },
  userId: { type:  mongoose.Schema.Types.ObjectId },
  itemId: { type:  mongoose.Schema.Types.ObjectId },
  stafId: { type:  mongoose.Schema.Types.ObjectId },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
    