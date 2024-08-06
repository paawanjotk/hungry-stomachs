import {Schema, model} from "mongoose";
import { USER_MODEL_NAME } from "../constants/models.js";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'partner'],
        required: true,
        default: 'user'
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
}, { timestamps: true });

const User = model(USER_MODEL_NAME, userSchema);

const UserModel = {
    createUser: async(user) => {
        return await User.create(user);
    },
    getByEmail: async(userEmail) => {
        const user = await User.findOne({email: userEmail});
        return user;
    }
}

export default UserModel