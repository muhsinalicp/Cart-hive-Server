import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      default: "Other",
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    styleTips: {
      type: String,
      default: "",
    },
    features: {
      type: String,
      default: "",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

export default Product;
