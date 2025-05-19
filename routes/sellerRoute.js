import { Router } from "express";
import dashboardController from "../controllers/seller/dashboardController.js";
import upload from "../utils/multerConfig.js";
import addProductController from "../controllers/productControllers/addProductController.js";
import fetchProductbyId from "../controllers/productControllers/fetchProductbyId.js";
import fetchAllSellerProducts from "../controllers/productControllers/fetchAllSellerProducts.js";
import editProductController from "../controllers/productControllers/editProductController.js";
import deleteProductController from "../controllers/productControllers/deleteProductController.js";

const router = Router();

// Dashboard
router.get("/dashboard", dashboardController);

//fetch product by id
router.get("/fetchproduct/:id", fetchProductbyId);

//add product
router.post(
  "/submitproduct",
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "additionalImage1", maxCount: 1 },
    { name: "additionalImage2", maxCount: 1 },
    { name: "additionalImage3", maxCount: 1 },
  ]),
  addProductController
);

//edit product
router.patch(
  "/editproduct/:id",
  upload.fields([
    { name: "mainimage", maxCount: 1 },
    { name: "additionalImage1", maxCount: 1 },
    { name: "additionalImage2", maxCount: 1 },
    { name: "additionalImage3", maxCount: 1 },
  ]),
  editProductController
);

//fetch all products by seller id
router.get("/products", fetchAllSellerProducts);

//delete product
router.delete("/deleteproduct/:id", deleteProductController);

export default router;
