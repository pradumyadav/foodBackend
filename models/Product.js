const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  image: { type: String },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
