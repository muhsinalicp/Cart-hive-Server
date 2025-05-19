import { Router } from "express";
import registerUserController from "../controllers/authControllers/registerUserController.js";
import upload from "../utils/multerConfig.js";
import loginController from "../controllers/authControllers/loginController.js";
import registerSellerController from "../controllers/authControllers/registerSellerController.js";
const router = Router();

// Register User
router.post("/register", upload.single("image"), registerUserController);

// Register Seller
router.post(
  "/registerseller",
  upload.single("image"),
  registerSellerController
);

// Login
router.post("/login", loginController);

export default router;
