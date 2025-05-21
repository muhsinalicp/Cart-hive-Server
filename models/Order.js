import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: String,
        size: String,
        quantity: Number,
        finalPrice: Number,
        status: {
          type: String,
          enum: ["processing", "shipped", "delivered", "cancelled"],
          default: "processing",
        },
        isDelivered: {
          type: Boolean,
          default: false,
        },
        deliveryDate: {
          type: Date,
          default: Date.now() + 7 * 24 * 60 * 60 * 1000, //
        },
        deliveredAt: {
          type: Date,
          default: null,
        },
      },
    ],

    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay", "Stripe", "PayPal"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    itemsPrice: { type: Number, required: true }, // subtotal
    deliveryCharge: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true }, // grand total
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
