import jwt from "jsonwebtoken";
import Login from "../models/Login.js";

async function authMiddleware(req, res, next) {
  let token;

  // console.log(req.headers.authorization.split(" ")[1]);
  if (req.headers?.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access denied. No token provided. Please log in.",
    });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Login.findById(decoded.id);

      if (!req.user) {
        console.log("User not found....");
        return res.status(401).json({
          status: "error",
          message: "Invalid or expired token. Please log in again.",
        });
      }

      next();
    } catch (error) {
      res.status(401);
      return res.json({ status: "error", message: "Not authorized" });
    }
  }
}

export default authMiddleware;
