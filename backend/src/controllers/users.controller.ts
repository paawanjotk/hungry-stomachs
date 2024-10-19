import UserModel from "../models/users.models";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
import jwt from "jsonwebtoken";

const generateJwt = (user: any) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY environment variable is not set");
  }
  const payload = { email: user.email };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY environment variable is not set");
  }
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, async (err: unknown, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      if (!user) {
        return res.sendStatus(403);
      }
      const existingUser = await UserModel.getByEmail(
        (user as jwt.JwtPayload).email
      );
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
  createUser: async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const userExists = await UserModel.getByEmail(email);

      if (userExists) {
        res
          .status(403)
          .json({ success: false, message: "User already exists." });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      req.body.password = hashPass;

      const user = await UserModel.createUser(req.body);

      const token = generateJwt(user);
      res.status(201).json({
        success: true,
        result: user,
        message: "User has been created successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.getByEmail(email);
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User does not exist, please register",
        });
        return;
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        res.status(404).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = generateJwt(user);
      res.json({
        result: user,
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  getUser: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      result: req.user,
    });
  },
  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, address, phone } = req.body as {
        name: string;
        email: string;
        address?: string;
        phone?: string;
      };
      const updatedUser = await UserModel.updateUser(req.user._id, {
        name,
        email,
        address,
        phone,
      });
      res.status(200).json({
        result: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
export default UserController;
