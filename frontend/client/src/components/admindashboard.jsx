import { useEffect, useState } from 'react';
import AdminHeader from './adminHeader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/tokenSlice';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [userData, setUserDataState] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/displayuser');
                const users = response.data.user;
                if (Array.isArray(users)) {
                    setUserDataState(users);
                } else {
                    setUserDataState([]);
                    console.error('API response is not an array:', users);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditUser = (user) => {
        dispatch(setUserData(user));
        navigate('/admineditprofile');
    };

    const handleDeleteUser = async (userId) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (confirmResult.isConfirmed) {
            try {
                console.log(userId);
                await axios.delete(`http://localhost:4000/admin/deleteuser/${userId}`);
               
                const response = await axios.get('http://localhost:4000/admin/displayuser');
                const users = response.data.user;
                if (Array.isArray(users)) {
                    setUserDataState(users);
                } else {
                    setUserDataState([]);
                    console.error('API response is not an array:', users);
                }
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire('Error!', 'Failed to delete user.', 'error');
            }
        }
    };

    const filteredUsers = userData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    );

    return (
        <div>
            <AdminHeader />
            <div className="container mx-auto mt-8 px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">User Management</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded py-2 px-4 mr-4"
                        />
                        <Link to="/adduser" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add User
                        </Link>
                    </div>
                </div>
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left border-b">Image</th>
                            <th className="py-2 px-4 text-left border-b">Name</th>
                            <th className="py-2 px-4 text-left border-b">Email</th>
                            <th className="py-2 px-4 text-left border-b">Phone</th>
                            <th className="py-2 px-4 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 text-left border-b"><img className='w-20' src={user.image} alt="" /></td>
                                    <td className="py-2 px-4 text-left border-b">{user.name}</td>
                                    <td className="py-2 px-4 text-left border-b">{user.email}</td>
                                    <td className="py-2 px-4 text-left border-b">{user.phone}</td>
                                    <td className="py-2 px-4 text-left border-b">
                                        <button onClick={() => handleEditUser(user)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"> Edit  </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-2 px-4 text-center border-b">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
