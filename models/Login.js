import { Schema, model } from "mongoose";

const LoginSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["admin", "seller", "user"],
    default: "user",
  },
});

const Login = model("Login", LoginSchema);

export default Login;
