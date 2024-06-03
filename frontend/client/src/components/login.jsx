import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItems ,addEmail} from '../redux/tokenSlice';

const Login = () => {
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
            const response = await axios.post('http://localhost:4000/api/login', value);
            const userData = response.data;
            if (userData.success) {
                toast.success('Login successful!');
                console.log(userData);
                dispatch(addItems({
                    isVerifiedUser: true,
                    accessToken: userData.accessToken,
                    refreshToken: userData.refreshToken
                }));
                console.log(userData.email);
                dispatch((addEmail(userData.email)))
                
                
                navigate('/home');
            } else {
                if (response.data.validation) {
                    response.data.errors.forEach(error => {
                        switch (error.path) {
                            case 'name':
                                setNameError(error.msg);
                                break;
                            case 'email':
                                setEmailError(error.msg);
                                break;
                            case 'phone':
                                setPhoneError(error.msg);
                                break;
                            case 'password':
                                setPasswordError(error.msg);
                                break;
                            case 'confirmPassword':
                                setConfirmPasswordError(error.msg);
                                break;
                            case 'image':
                                setImageError(error.msg);
                                break;
                            default:
                                break;
                        }
                    });
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.log(error.message);
        }
    };

    return (
        <div className="bg-yellow-300 flex justify-center items-center h-screen">
            <div className="border w-72 mx-auto p-6 rounded bg-white">
                <div className="mb-4">
                    <h1 className="text-center text-xl font-semibold">Sign In</h1>
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
                        <p>New to this website? <Link to='/register' className="text-blue-500">Signup</Link></p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">Or <Link to='/admin/login' className="text-blue-500 hover:underline">login as admin</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
