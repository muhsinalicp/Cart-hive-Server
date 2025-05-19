import Cart from "../../models/Cart.js";

const deleteCart = async (req, res) => {
  try {
    let { _id } = req.user;
    const { cid } = req.params;

    const cart = await Cart.findOne({ user: _id, _id: cid });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    await Cart.findByIdAndDelete(cart._id);

    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log("error in deleteCart", error);
    return res.status(500).json({ message: error.message });
  }
};

export default deleteCart;
