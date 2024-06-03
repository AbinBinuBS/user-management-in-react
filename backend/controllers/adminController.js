
import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import { body, validationResult  } from 'express-validator';
import jwt from 'jsonwebtoken';


const generateAccessToken = async (user) => {
    try {
        return jwt.sign(user, "my_access_key_token", { expiresIn: "2h" });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

const generateRefreshToken = async (user) => {
    try {
        return jwt.sign(user, "my_access_key_token", { expiresIn: "1y" });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};



const adminLogin =  async(req,res)=>{
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
        }
        const { email, password } = req.body;
        console.log('1111111111111',req.body);
        const admin = await userModel.findOne({ email });
        if (!admin) {
            return res.status(200).json({ success: false, message: "Admin not found" });
        }
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!admin || !validPassword) {
            return res.status(200).json({ success: false, message: "Invalid Username or Password" });
        }
        

        if(!admin.is_varified){
            return res.status(200).json({ success: false, message: "Check your mail" });
        }

        if(!admin.is_admin){
            return res.status(200).json({ success: false, message: "You have no access" });
        }
        const accessToken = await generateAccessToken({ user: admin });
        const refreshToken = await generateRefreshToken({ user: admin })
        console.log("Generated access token:", accessToken);
        return res.status(200).json({ success: true, message: "Login successful", accessToken , refreshToken});

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


const displayUser = async(req,res)=>{
    try{
        const userData = await userModel.find({is_admin:false})
        return res.status(200).json({ success: true, message: "user found ", user:userData});
    }catch(error){
        console.log(error);
    }
}

const deleteUser = async(req,res)=>{
    try{
        const userId = req.params.userId
        const deleteData = await userModel.findByIdAndDelete({_id:userId})
        if(deleteData){
            return res.status(200).json({success:true,message:"deleted successfully"})
        }
        return res.status(200).json({success:false,message:" failed to delete"})
    }catch(error){
        console.log(error);
    }
}



export { adminLogin ,displayUser,deleteUser}