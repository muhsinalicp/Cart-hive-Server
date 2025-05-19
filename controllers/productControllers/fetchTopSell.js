import Product from "../../models/Product.js";

const fetchTopSell = async (req, res) => {
  try {
    const data = await Product.find().sort({ sales: -1 }).limit(4);
    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log("error occured in /fetchTopSell route :", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};
export default fetchTopSell;
