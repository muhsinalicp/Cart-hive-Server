import Product from "../../models/Product.js";
import { uploadToS3 } from "../../utils/s3.js";

const editProductController = async (req, res) => {
  try {
    const productid = req.params.id;

    const editedData = {
      name: req.body.name,
      description: req.body.description,
      features: req.body.features,
      styleTips: req.body.styleTips,
      brand: req.body.brand,
      colors: req.body.colors.split(","),
      sizes: req.body.sizes.split(","),
      stock: req.body.stock,
      price: req.body.price,
      category: req.body.category,
      images: [],
    };

    if (req.files.mainimage) {
      const mainImageUrl = await uploadToS3(req.files.mainimage[0]);
      editedData.images = [mainImageUrl];
    } else {
      editedData.images.push(req.body.mainimage);
    }

    // Handle additional images
    const additionalImageKeys = [
      "additionalImage1",
      "additionalImage2",
      "additionalImage3",
    ];

    for (const key of additionalImageKeys) {
      if (req.files[key] && req.files[key][0]) {
        const url = await uploadToS3(req.files[key][0]);
        editedData.images.push(url);
      } else if (req.body[key]) {
        editedData.images.push(req.body[key]);
      }
    }

    await Product.findByIdAndUpdate(productid, editedData);

    return res
      .status(200)
      .json({ status: "success", message: "Product updated successfully" });
  } catch (error) {
    console.log("error occured in /seller/getproduct/:id route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

export default editProductController;
