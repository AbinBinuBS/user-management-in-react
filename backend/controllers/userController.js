import userModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult  } from 'express-validator';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: "dbz5sr2y8", 
    api_key: "449469717916577", 
    api_secret: "2Szt3YeVdIJU6Dg0ienhi8fwl98" 
});

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
        }
        const { name, email, phone, password, confirmPassword } = req.body;
        if(password != confirmPassword ){
            return res.status(200).json({success:false, validation: false ,message:"password and confirmPassword do not match"})
        }

        const result = await cloudinary.uploader.upload(req.file.path);
      
        const userData = await userModel.find({ email: email })
        const mobileDta = await userModel.find({ phone: phone })
        console.log(userData)
        if(userData.length){
            return res.status(200).json({success:false, message:'User Already Exist'})
        } else if(mobileDta.length){
            return res.status(200).json({success:false, message:'Mobile Already Exist'})
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                name,
                email,
                phone,
                image: result.secure_url,
                password: hashPassword
            });
            const userData = await newUser.save();
            res.status(200).json({ success: true, message: 'User created successfully', user: userData });
        }
      
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


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

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
        }
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email:email });
       
        if (!user ) {
            return res.status(200).json({ success: false, message: "Invalid Username or Password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if ( !validPassword) {
            return res.status(200).json({ success: false, message: "Invalid Username or Password" });
        }

        if(!user.is_varified){
            return res.status(200).json({ success: false, message: "Check your mail" });
        }

        const accessToken = await generateAccessToken({ user: user });
        const refreshToken = await generateRefreshToken({ user: user })
        console.log("Generated access token:", accessToken);
        return res.status(200).json({ success: true, message: "Login successful", accessToken , refreshToken,email});

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const getUserData = async(req,res) =>{
    try{
        const {email} = req.body;
        const userData = await userModel.findOne({email})
        if(userData){
            return res.status(200).json({success:true,message:"user send successfully " , user:userData})
        }
        return res.status(200).json({success:false,message:"user not found " })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

const editProfile = async(req,res)=>{
    try{
        const userId = req.params.userId
        const userData = await userModel.findOne({_id:userId})
        if(userData){
            return res.status(200).json({success:true,message:'user found',user:userData})
        }
        return res.status(200).json({success:false,message:"user not found " })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

const editProfileLoad = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(200).json({ success: false, validation:true ,message: 'Validation errors', errors: errors.array() });
        }
        const { name, phone, email } = req.body;
        const image = req.file;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const checkPhone = await userModel.findOne({ phone, _id: { $ne: user._id } });
        console.log("checkPhone",checkPhone);
        if(checkPhone){
            return res.status(200).json({ success: false, validation:false ,message: 'Phone number already exist' });
        }
        user.name = name;
        user.phone = phone;
        if (image) {
            const imageUrl = await cloudinary.uploader.upload(image.path);
            user.image = imageUrl.secure_url;
        }
        await user.save();
        res.json({ success: true, message: 'Profile updated successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the profile.' });
    }
};


export default editProfileLoad;


export { createUser, loginUser, getUserData ,editProfile ,editProfileLoad};
