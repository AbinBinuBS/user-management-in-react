import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String, 
    },
    password: {
        type: String,
        required: true
    },
    is_varified:{
        type:Boolean,
        default:true
    },
    is_admin:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
