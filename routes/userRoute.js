import { Router } from "express";
import fetchNewArrivals from "../controllers/productControllers/fetchNewArrivals.js";
import fetchTopSell from "../controllers/productControllers/fetchTopSell.js";
import fetchProductbyId from "../controllers/productControllers/fetchProductbyId.js";
import fetchReviews from "../controllers/productControllers/fetchReviews.js";
import fetchByCategory from "../controllers/productControllers/fetchByCategory.js";
import fetchAllProducts from "../controllers/productControllers/fetchAllProducts.js";
const router = Router();

//fetch new arrivals
router.get("/newarrivals", fetchNewArrivals);

//fetch top sell
router.get("/topsell", fetchTopSell);

//fetch product by id
router.get("/product/:id", fetchProductbyId);

//fetch reviews
router.get("/reviews/:id", fetchReviews);

//fetch reviews by category
router.get("/products/:category/:pid", fetchByCategory);

//fetch all products
router.get("/allproducts/:page", fetchAllProducts);

export default router;
