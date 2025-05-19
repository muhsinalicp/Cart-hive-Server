import { Router } from "express";
import postReview from "../controllers/productControllers/postReview.js";
import addToCart from "../controllers/userControllers/addToCart.js";
import fetchCartData from "../controllers/userControllers/fetchCartData.js";
import deleteCart from "../controllers/userControllers/deleteCart.js";
const router = Router();

//post review and rating
router.post("/reviews", postReview);

//add to cart
router.post("/addtocart", addToCart);

//get cart
router.get("/cart", fetchCartData);

//delete cart
router.delete("/deletecart/:cid", deleteCart);

export default router;
