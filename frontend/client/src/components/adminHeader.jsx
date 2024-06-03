import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdminPersistedData } from '../redux/adminpersisted';

const AdminHeader = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        clearAdminPersistedData();
    };

    return (
        <div className="h-20 bg-black flex items-center justify-between px-6">
            <div className="text-white text-xl font-bold">
                <Link to='/admindashboard'>Home</Link>
            </div>
            <div className="flex space-x-6">
                <h1 onClick={handleLogout} className="text-white hover:text-gray-300 cursor-pointer">Logout</h1>
            </div>
        </div>
    );
};

export default AdminHeader;
