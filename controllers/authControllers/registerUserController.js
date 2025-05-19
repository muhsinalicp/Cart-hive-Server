import Joi from "joi";
import { hashPassword } from "../../utils/hashAndCompare.js";
import Register from "../../models/Register.js";
import { uploadToS3 } from "../../utils/s3.js";
import Login from "../../models/Login.js";
export default async function registerUserController(req, res) {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(2).required(),
      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      email: Joi.string().email().required(),
      address: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { username, password, name, phone, email, address } = req.body;

    const existingUser = await Login.findOne({ username });
    const existingEmail = await Register.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: "done", message: "User already exists" });
    }

    if (existingEmail) {
      return res
        .status(400)
        .json({ status: "done", message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const loginData = {
      username,
      password: hashedPassword,
    };

    const login = await Login.create(loginData);

    const userData = {
      name,
      phone,
      email,
      address,
      login: login._id,
    };

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      userData.image = imageUrl;
    }

    await Register.create(userData);

    return res
      .status(201)
      .json({ status: "done", message: "User registered successfully" });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Username or email already exists",
      });
    }
    console.log("Error in registerUserController", error);
    res.status(500).json({ message: error.message });
  }
}
