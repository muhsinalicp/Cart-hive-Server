import Login from "../../models/Login.js";
import Store from "../../models/Store.js";
import { hashPassword } from "../../utils/hashAndCompare.js";

export default async function registerSellerController(req, res) {
  try {
    const { storeName, storeDesc, phone, username, password } = req.body;

    if (!storeName || !storeDesc || !phone || !username || !password) {
      return res.json({
        status: "error",
        message: "Please fill all the fields",
      });
    }

    const hashedPassword = await hashPassword(password);
    const loginData = {
      username,
      password: hashedPassword,
      type: "seller",
    };
    const login = await Login.create(loginData);

    let sellerData = {
      storeName,
      storeDesc,
      phone,
      login: login._id,
    };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      sellerData.image = imageUrl;
    }

    await Store.create(sellerData);

    return res
      .status(201)
      .json({ status: "done", message: "Seller registered successfully" });
  } catch (error) {
    console.log("Error in registerSellerController", error);
    res.status(500).json({ message: error.message });
  }
}
