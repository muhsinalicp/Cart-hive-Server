import Product from "../../models/Product.js";

const fetchAllProducts = async (req, res) => {
  try {
    const itemsPerPage = 8;

    const { page = 1 } = req.params;
    const { category = "all" } = req.query;
    const { price = "all" } = req.query;
    const { rating = "all" } = req.query;

    console.log(category, price, rating);

    // const query = category !== "all" ? { category: category } : {};
    const query = category !== "all" ? { category: category } : {};
    let maxPrice = await Product.find().sort({ price: -1 }).limit(1);
    let minPrice = await Product.find().sort({ price: 1 }).limit(1);
    maxPrice = maxPrice[0].price;
    minPrice = minPrice[0].price;

    let priceRange = [];

    do {
      minPrice += 500;
      priceRange.push(minPrice + 1);
    } while (minPrice <= maxPrice);

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip((Number(page) - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    let availableCategories = await Product.distinct("category");

    res
      .status(200)
      .json({ products, totalPages, availableCategories, priceRange });
  } catch (error) {
    console.log("error in fetchAllProducts", error);
    res.status(500).json({ message: error.message });
  }
};

export default fetchAllProducts;
