import express from 'express';
import { adminLogin ,displayUser, deleteUser } from '../controllers/adminController.js';
import {loginValidation} from '../helpers/validation.js'



 
const admin_route = express.Router();

admin_route.post('/adminlogin', loginValidation,adminLogin)
admin_route.get('/displayuser',displayUser)
admin_route.delete('/deleteuser/:userId',deleteUser)

export default admin_route
