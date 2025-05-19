import Product from "../../models/Product.js";

const fetchProductbyId = async (req, res) => {
  try {
    const productid = req.params.id;

    const product = await Product.findById(productid);
    if (!product) {
      return res.status(400).json({ message: "Product Not Found" });
    }

    return res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log("error occured in /seller/editproduct/:id route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

export default fetchProductbyId;
