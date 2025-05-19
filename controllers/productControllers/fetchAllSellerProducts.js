import Product from "../../models/Product.js";

const fetchAllSellerProducts = async (req, res) => {
  try {
    const decodedSeller = req.user;

    const sellerid = decodedSeller.id;

    if (!sellerid) {
      return res.status(401).json({
        status: "error",
        message: "Please login first or seller not found",
      });
    }

    const data = await Product.find({ seller: sellerid }).sort({
      createdAt: -1,
    });

    return res.json({ status: "success", data: data });
  } catch (err) {
    console.log("error occured in /seller/products route :", err);
    return res
      .status(500)
      .json({ status: "error occured, try again ", message: err.message });
  }
};
export default fetchAllSellerProducts;
