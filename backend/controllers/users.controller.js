import UserModel from "../models/users.models.js";
import bcrypt from "bcrypt";

const UserController = {
    createUser : async(req, res) =>{
        const userExists = await UserModel.getByEmail(req.body.email)
        if(userExists) return res.json("User already exists.")
        const salt  = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPass;
        return res.json({
            result : await UserModel.createUser(req.body),
        })
    },
    LoginUserByEmail : async(req, res)=>{
        const user = await UserModel.getByEmail(req.body.email)
        if(!user) {
            res.send({
                success:false,
                message:"User does not exist, please register"
            })
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
            return res.send({
                success:false,
                message: 'Invalid password'
            })
        }
        res.send({
            success: true,
            message: 'User has been logged in successfully'
        })
    }

}
export default UserController