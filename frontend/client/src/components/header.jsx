import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPersistedData } from '../redux/crearPersistedData';

const Header = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        clearPersistedData();
    };

    return (
        <div className="h-20 bg-black flex items-center justify-between px-6">
            <div className="text-white text-xl font-bold">
                <Link to='/home'>Home</Link>
            </div>
            <div className="flex space-x-6">
                <h1 className="text-white hover:text-gray-300 cursor-pointer"><Link to='/profile'>Profile</Link></h1>
                <h1 onClick={handleLogout} className="text-white hover:text-gray-300 cursor-pointer">Logout</h1>
            </div>
        </div>
    );
};

export default Header;
