import { Schema, model } from "mongoose";
import { USER_MODEL_NAME } from "../constants/models.js";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    default: [],
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
});

const User = model(USER_MODEL_NAME, userSchema);

const UserModel = {
  createUser: async (user) => {
    return await User.create(user);
  },
  getByEmail: async (userEmail) => {
    const user = await User.findOne({ email: userEmail });
    return user;
  },
  updateUser: async (userId, update) => {
    return await User.findByIdAndUpdate(userId, update, { new: true });
  }
};

export default UserModel;
