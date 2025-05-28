import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import Store from "../../models/Store.js";
import Cart from "../../models/Cart.js";
const placeOrder = async (req, res) => {
  try {
    const {
      paymentId,
      amount,
      subTotal,
      deliveryCharge,
      pdetails,
      paymentMethod = "Razorpay",
    } = req.body;

    const orderItems = await Promise.all(
      pdetails.map(async (item) => {
        await Product.findByIdAndUpdate(item.id, {
          $inc: { stock: -item.quantity, sales: item.quantity },
        });

        const store = await Store.findOne({ login: item.seller });
        if (!store) {
          return res.status(404).json({
            success: false,
            message: "Store not found",
          });
        }

        store.revenue += item.price;
        store.totalOrders += item.quantity;
        await store.save();

        await Cart.findByIdAndDelete(item.cartId);

        return {
          product: item.id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          finalPrice: item.price,
        };
      })
    );

    const orderData = {
      paymentId: paymentId,
      user: req.user._id,
      orderItems: orderItems,
      paymentMethod: paymentMethod,
      paymentStatus: "paid",
      itemsPrice: subTotal,
      deliveryCharge: deliveryCharge,
      totalPrice: amount,
    };

    await Order.create(orderData);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("Error in place order", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default placeOrder;
