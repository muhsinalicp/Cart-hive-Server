import Product from "../../models/Product.js";

const fetchByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { pid } = req.params;
    if (category) {
      let data = await Product.find({ category: category }).limit(4);
      data = data.filter((item) => item._id.toString() !== pid);
      res.json({ data });
    } else {
      let data = await Product.find().limit(4);
      data = data.filter((item) => item._id.toString() !== pid);
      res.json({ data });
    }
  } catch (error) {
    console.log("error occured in fetchByCategory :", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default fetchByCategory;
