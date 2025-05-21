import Order from "../../models/Order.js";

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
      "name image"
    );

    let orderData = orders.map((order) => {
      return {
        _id: order._id,
        orderItems: order.orderItems,
      };
    });

    console.log("orderData", orderData);

    res.status(200).json({
      success: true,
      orders: orderData,
    });
  } catch (error) {
    console.log("error in get orders", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getOrders;
