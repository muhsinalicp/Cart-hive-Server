import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import AuthRoute from "./routes/AuthRoute.js";
import SellerRoute from "./routes/sellerRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import UserRoute from "./routes/userRoute.js";
import UserProtRoute from "./routes/userProtRoute.js";
const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.static("public"));

connectDB(process.env.MONGO_URL);

app.use("/api/auth", AuthRoute);
app.use("/api/seller", authMiddleware, SellerRoute);
app.use("/api/user", UserRoute);
app.use("/api/user", authMiddleware, UserProtRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
