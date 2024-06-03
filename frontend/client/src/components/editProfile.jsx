import Header from "./header";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const accessToken = useSelector((store) => store.user.accessToken);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                const decoded = jwtDecode(accessToken);
                const response = await axios.get(`http://localhost:4000/api/editprofile/${decoded.user._id}`);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setPhone(response.data.user.phone);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [accessToken]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setNameError('');
            setPhoneError('');

            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email',email)
            if (image) {
                formData.append('image', image);
            }
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios.post('http://localhost:4000/api/editprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.success) {
                toast.success('Profile updated successfully!');
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
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="border w-96 mx-auto p-6 rounded bg-white">
                <h1 className="text-center text-xl font-semibold mb-4">Edit Profile</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full p-1 mb-1"
                            placeholder="Name"
                            name="name"
                        />
                        {nameError && <span className="text-red-500">{nameError}</span>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded w-full p-1 mb-1"
                            placeholder="Email"
                            name="email"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded w-full p-1 mb-1"
                            placeholder="Phone"
                            name="phone"
                        />
                        {phoneError && <span className="text-red-500">{phoneError}</span>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border rounded w-full p-1 mb-1"
                            name="image"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 text-white bg-black rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
