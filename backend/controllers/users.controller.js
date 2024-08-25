import UserModel from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (user) => {
  const secret = process.env.SECRET_KEY;
  const payload = { email: user.email };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
export const authenticateJwt = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, async (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      const existingUser = await UserModel.getByEmail(user.email);
      if (!existingUser) {
        console.log("User not found");
        return res.sendStatus(403);
      }
      req.user = existingUser;
      next();
    });
  } else {
    console.log("No token provided");
    res.sendStatus(401);
  }
};
const UserController = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userExists = await UserModel.getByEmail(email);

      if (userExists)
        return res
          .status(403)
          .json({ success: false, message: "User already exists." });

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      req.body.password = hashPass;

      const user = await UserModel.createUser(req.body);

      const token = generateJwt(user);
      return res.status(201).json({
        success: true,
        result: user,
        message: "User has been created successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist, please register",
        });
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(404).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = generateJwt(user);
      return res.json({
        result: user,
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  getUser: async (req, res) => {
    return res.status(200).json({
      result: req.user,
    });
  },
  updateUser: async (req, res) => {
    try {
      const { name, email, address, phone } = req.body;
      const updatedUser = await UserModel.updateUser(req.user._id, {
        name,
        email,
        address,
        phone,
      });
      return res.status(200).json({
        result: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
export default UserController;

/**
 * 
 * const response = await login() // api
 * 
 * if(response.status == 201) localSToarge.set(respons.token)
 * 
 * 
 * fecthc("http://localhost:8000/sign-in", {
 * method: "POST",
 * headers: {
 * "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
* }
 * 
 * 
 * 
 * 
 * 
 */
