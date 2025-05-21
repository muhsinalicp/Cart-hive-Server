import Cart from "../../models/Cart.js";

const fetchCartData = async (req, res) => {
  const { _id } = req.user;

  let cart = await Cart.find({ user: _id }).populate("product");

  cart = cart.map((item) => {
    return {
      _id: item._id,
      productId: item.product._id,
      image: item.product.images[0],
      name: item.product.name,
      size: item.selectedAttributes.get("size"),
      color: item.selectedAttributes.get("color"),
      price: item.price,
      seller: item.product.seller,
      totalAmount: item.totalPrice,
      quantity: item.quantity,
    };
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.totalAmount, 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryCharges = totalAmount > 1000 ? 0 : 100;
  const discount = totalQuantity * 2;
  let grandTotal = totalAmount + deliveryCharges;
  grandTotal = grandTotal - grandTotal * (discount / 100);

  const cartSummary = {
    totalAmount,
    deliveryCharges,
    discount,
    grandTotal,
  };

  return res.status(200).json({ cart, cartSummary });
};

export default fetchCartData;
