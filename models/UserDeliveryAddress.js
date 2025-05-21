import { Schema, model } from "mongoose";

const userDeliveryAddressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Login" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserDeliveryAddress = model(
  "UserDeliveryAddress",
  userDeliveryAddressSchema
);

export default UserDeliveryAddress;
