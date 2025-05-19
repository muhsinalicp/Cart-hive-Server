import Login from "../../models/Login.js";
import Product from "../../models/Product.js";
import { deleteImage } from "../../utils/s3.js";

const deleteProductController = async (req, res) => {
  try {
    const productid = req.params.id;
    const sellerid = req.user.id;

    const seller = await Login.findById(sellerid);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const product = await Product.findById(productid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== sellerid.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const image = product.images;

    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        const imageurl = image[i];
        await deleteImage(imageurl);
      }
    }

    await Product.findByIdAndDelete(productid);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("error occured in deleteProductController :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteProductController;
