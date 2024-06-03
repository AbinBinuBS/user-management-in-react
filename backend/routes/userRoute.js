import express from 'express';
import { createUser, loginUser, getUserData ,editProfile ,editProfileLoad} from '../controllers/userController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerValidator ,loginValidation ,editUserValidation} from '../helpers/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, '..', 'public', 'images'));
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const user_route = express.Router();

user_route.post('/create', upload.single('image'), registerValidator, createUser);
user_route.post('/login',loginValidation, loginUser);
user_route.post('/getuserdata',getUserData)
user_route.get('/editprofile/:userId', editProfile);
user_route.post('/editprofile', upload.single('image'), editUserValidation,editProfileLoad)

export default user_route;
