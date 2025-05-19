import Login from "../../models/Login.js";
import Product from "../../models/Product.js";
import { uploadToS3 } from "../../utils/s3.js";

const addProductController = async (req, res) => {
  try {
    const sellerid = req.user.id;
    const seller = await Login.findById(sellerid);
    if (!seller.type === "seller") {
      return res.status(404).json({
        status: "error",
        message: "Seller not found",
      });
    }
    const {
      productname,
      category,
      price,
      description,
      brand,
      colors,
      sizes,
      stock,
      styleTips,
      features,
    } = req.body;

    // Validate required fields
    if (
      !productname ||
      !category ||
      !price ||
      !description ||
      !brand ||
      !colors ||
      !sizes ||
      !stock ||
      !req.files ||
      !styleTips ||
      !features
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required, including images.",
      });
    }

    // Extract main images
    const mainImageUrl = await uploadToS3(req.files.mainimage[0]);

    const product = {
      images: [mainImageUrl],
      category,
      price,
      name: productname,
      description,
      brand,
      colors: colors.split(","),
      sizes: sizes.split(","),
      stock,
      seller: sellerid,
      styleTips,
      features,
    };

    // Handle additional images
    const additionalImageKeys = [
      "additionalImage1",
      "additionalImage2",
      "additionalImage3",
    ];

    for (const key of additionalImageKeys) {
      if (req.files[key] && req.files[key][0]) {
        const url = await uploadToS3(req.files[key][0]);
        product.images.push(url);
      } else if (req.body[key]) {
        product.images.push(req.body[key]);
      }
    }

    await Product.create(product);

    return res
      .status(200)
      .json({ status: "done", message: "Product submitted successfully!" });
  } catch (error) {
    console.log("Error in addProductController", error);
    res.status(500).json({ message: error.message });
  }
};

export default addProductController;
