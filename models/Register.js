import { Schema, model } from "mongoose";

const RegisterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/defaultUser.png",
    },
    login: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
  },
  { timestamps: true }
);

const Register = model("Register", RegisterSchema);

export default Register;
