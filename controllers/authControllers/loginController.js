import { comparePassword } from "../../utils/hashAndCompare.js";
import { genToken } from "../../utils/genAndVerifyToken.js";
import Login from "../../models/Login.js";

export default async function loginController(req, res) {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ status: "username or password is missing" });
    }

    const user = await Login.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ status: "User not found" });
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ status: "Invalid password" });
    }

    const token = genToken(user._id, user.type);

    if (token) {
      res.status(200).json({
        status: "login successful",
        userType: user.type,
        token: token,
      });
    } else {
      res.status(400).json({ status: "login failed" });
    }
  } catch (error) {
    console.log("Error in loginController", error);
    res.status(500).json({ message: error.message });
  }
}
