import { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const imageRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [imageError, setImageError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setNameError('');
            setEmailError('');
            setPhoneError('');
            setPasswordError('');
            setConfirmPasswordError('');
            setImageError('');

            const formData = new FormData();
            formData.append('name', nameRef.current.value);
            formData.append('email', emailRef.current.value);
            formData.append('phone', phoneRef.current.value);
            formData.append('image', imageRef.current.files[0]);
            formData.append('password', passwordRef.current.value);
            formData.append('confirmPassword', confirmPasswordRef.current.value);

            const response = await axios.post('http://localhost:4000/api/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Registration successful!');
                nameRef.current.value = '';
                emailRef.current.value = '';
                phoneRef.current.value = '';
                imageRef.current.value = null;
                passwordRef.current.value = '';
                confirmPasswordRef.current.value = '';
                navigate('/')
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
            console.log(error.message);
        }
    };

    return (
        <div className="bg-yellow-300 flex justify-center items-center h-screen">
            <div className="border w-96 mx-auto p-6 rounded bg-white">
                <h1 className="text-center text-xl font-semibold mb-4">Sign Up</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <input ref={nameRef} type="text" className="border rounded w-full p-1 mb-1" placeholder="Name" name="name" />
                        {nameError && <span className="text-red-500">{nameError}</span>}
                    </div>
                    <div className="mb-4 flex flex-wrap">
                        <input ref={emailRef} type="text" className="border rounded w-full p-1 mb-1 mr-2" placeholder="Email" name="email" />
                        {emailError && <span className="text-red-500">{emailError}</span>}
                    </div>
                    <div className="mb-4 flex flex-wrap">
                        <input ref={phoneRef} type="text" className="border rounded w-full p-1 mb-1 mr-2" placeholder="Phone" name="phone" />
                        {phoneError && <span className="text-red-500">{phoneError}</span>}
                    </div>
                    <div className="mb-4">
                        <input ref={imageRef} type="file" className="border rounded w-full p-1 mb-1" name="image" />
                        {imageError && <span className="text-red-500">{imageError}</span>}
                    </div>
                    <div className="mb-4">
                        <input ref={passwordRef} type="password" className="border rounded w-full p-1 mb-1" placeholder="Password" name="password" />
                        {passwordError && <span className="text-red-500">{passwordError}</span>}
                    </div>
                    <div className="mb-4">
                        <input ref={confirmPasswordRef} type="password" className="border rounded w-full p-1 mb-1" placeholder="Confirm Password" name="confirmPassword" />
                        {confirmPasswordError && <span className="text-red-500">{confirmPasswordError}</span>}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 text-white bg-black rounded">Signup</button>
                    </div>
                    <div>
                        <p className="mt-4 text-center">Already have an account? <Link to='/'>Sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

