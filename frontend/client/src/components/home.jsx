import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "./header";


const Home = () => {
   const email = useSelector((state)=>state.emailData)
   console.log("11111111111111111111",email);

    return (
        <div>
        <Header />
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-yellow-300 p-10 rounded-md shadow-md">
                <h1 className="text-center text-2xl font-bold">Welcome to Dashboard</h1>
            </div>
        </div>
    </div>
    );
};

export default Home;
