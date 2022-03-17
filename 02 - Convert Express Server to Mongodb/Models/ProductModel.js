const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
});
const ProductModel = new mongoose.model("Product", productSchema);
module.exports = ProductModel;