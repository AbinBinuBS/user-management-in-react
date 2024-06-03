import { useEffect, useState } from "react"
import Header from "./header"
import axios from 'axios'
import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
const Profile = () => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const [userData,setUserData] = useState({})
    useEffect(() => {
        const helperFunction = async () => {
            try {
                console.log(accessToken);
               const decoded =jwtDecode(accessToken)
               const response = await axios.post('http://localhost:4000/api/getuserdata',{email:decoded.user.email})
               setUserData(response.data.user)
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        };

        helperFunction();
    }, [accessToken ]);
    console.log(userData);
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8 max-w-md">
                <img src={userData.image} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Welcome to Home</h2>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                            <h5 className="text-lg">Name: {userData.name}</h5>
                        </div>
                        <div className="flex items-center">
                            <h5 className="text-lg">Email: {userData.email}</h5>
                        </div>
                        <div className="flex items-center">
                            <h5 className="text-lg">Phone: {userData.phone}</h5>
                        </div>
                        <div className="flex items-center">
                            <span><Link to='/edituser'>Edit</Link> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
