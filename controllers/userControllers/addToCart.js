import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
const addToCart = async (req, res) => {
  try {
    const { productId, color, size, quantity, price } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { _id } = req.user;

    const cart = await Cart.findOne({
      user: _id,
      product: productId,
      selectedAttributes: { color, size },
      quantity: quantity,
    });
    if (cart) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    const cartData = {
      user: _id,
      product: productId,
      quantity: Number(quantity),
      price: Number(price),
      totalPrice: Number(price) * Number(quantity),
      selectedAttributes: { color, size },
    };

    await Cart.create(cartData);

    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {}
};

export default addToCart;
