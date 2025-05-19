import Product from "../../models/Product.js";

const fetchNewArrivals = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log("error occured in /fetchNewArrivals route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};

export default fetchNewArrivals;
