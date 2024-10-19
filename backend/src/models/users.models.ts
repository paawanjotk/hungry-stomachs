import { Schema, model } from "mongoose";
import { ORDER_MODEL_NAME, USER_MODEL_NAME } from "../constants/models";

export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  orders: Schema.Types.ObjectId[];
  address?: string;
  phone?: string;
}

const userSchema = new Schema<IUser>({
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
    type: [{ type: Schema.Types.ObjectId, ref: ORDER_MODEL_NAME }],
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

const User = model<IUser>(USER_MODEL_NAME, userSchema);

const UserModel = {
  createUser: async (user: Omit<IUser, "orders">) => {
    return await User.create(user);
  },
  getByEmail: async (userEmail: string) => {
    const user = await User.findOne({ email: userEmail });
    return user;
  },
  updateUser: async (userId: Schema.Types.ObjectId, update: Partial<IUser>) => {
    return await User.findByIdAndUpdate(userId, update, { new: true });
  },
};

export default UserModel;
