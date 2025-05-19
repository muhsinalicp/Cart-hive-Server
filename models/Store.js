import { Schema, model } from "mongoose";

const StoreSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    storeDesc: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
      default: "/defaultUser.png",
    },
    revenue: {
      type: Number,
      default: 0,
    },
    login: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
  },
  { timestamps: true }
);

const Store = model("Store", StoreSchema);

export default Store;
