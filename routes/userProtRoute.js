import { Router } from "express";
import postReview from "../controllers/productControllers/postReview.js";
import addToCart from "../controllers/userControllers/addToCart.js";
import fetchCartData from "../controllers/userControllers/fetchCartData.js";
import deleteCart from "../controllers/userControllers/deleteCart.js";
import placeOrder from "../controllers/userControllers/placeOrder.js";
import getOrders from "../controllers/userControllers/getOrders.js";
const router = Router();

//post review and rating
router.post("/reviews", postReview);

//add to cart
router.post("/addtocart", addToCart);

//get cart
router.get("/cart", fetchCartData);

//delete cart
router.delete("/deletecart/:cid", deleteCart);

//place order
router.post("/placeorder", placeOrder);

//get all orders
router.get("/orders", getOrders);

export default router;
