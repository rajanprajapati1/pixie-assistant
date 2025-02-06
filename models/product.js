import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  color: String,
  stock: Number,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  isInOffer: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  size: [String], 
  color: [ColorSchema], 
  brand: String,
  image: String,
  stock: Number,
  ratings: [Number],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema, "products");

export default Product;
