const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: Array, default: [] },
    price: { type: Number, default: 0.0 },
    description: { type: String, default: "" },
    colors: { type: Array, default: [] },
    sizes: { type: Array, default: ["XS", "SM", "M", "L", "XL", "XXL"] },
    stockCode: { type: String, default: "" },
    discount: { type: Number, deafult: 0.0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
