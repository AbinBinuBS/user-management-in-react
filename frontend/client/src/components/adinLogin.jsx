import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItems,addAdminItems } from '../redux/tokenSlice';

const AdminLogin = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setEmailError('');
            setPasswordError('');
            const value = { email, password };
            const response = await axios.post('http://localhost:4000/admin/adminlogin', value);
            const userData = response.data;
            if (userData.success) {
                toast.success('Login successful!');
                console.log(userData);
                dispatch(addAdminItems({
                    isVerifiedAdmin: true,
                    adminAccessToken: userData.accessToken,
                    adminRefreshToken: userData.refreshToken
                }));
                
                
                
                navigate('/admindashboard');
            } else {
                if (response.data.validation) {
                    response.data.errors.forEach(error => {
                        switch (error.path) {
                            case 'name':
                                setNameError(error.msg);
                                break;
                            case 'phone':
                                setPhoneError(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                } else {
                    toast.error(response.data.message);
                }            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.log(error.message);
        }
    };
    return(
        <div className="bg-yellow-300 flex justify-center items-center h-screen">
        <div className="border w-72 mx-auto p-6 rounded bg-white">
            <div className="mb-4">
                <h1 className="text-center text-xl font-semibold">ADMIN LOGIN</h1>
            </div>
            <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
                    <label htmlFor="email" className="flex mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full p-1"
                        name="email"
                    />
                    {emailError && <span className="text-red-500">{emailError}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="flex mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded w-full p-1"
                        name="password"
                    />
                    {passwordError && <span className="text-red-500">{passwordError}</span>}
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 text-white bg-black rounded">Login</button>
                </div>
                <div>
                    <p>Are you a user ? <Link to='/' className="text-blue-500">User</Link></p>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AdminLogin