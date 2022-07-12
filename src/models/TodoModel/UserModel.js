import { boolean, string } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    uppercase: true,
    // match: /[a-z]/,
    default: "Binh",
  },
  last_name: {
    type: String,
    uppercase: true,
    // match: /[a-z]/,
    default: "Doan Thanh",
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary"],
  },
  address: {
    type: String,
    // match: /[a-z,1-9]/,
    uppercase: true,
  },
  university: {
    type: String,
    uppercase: true,
    // match: /[a-z]/,
    default: "Back Khoa DN",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("users", usersSchema);
