import Navbar from "./navbar";
import MainPage from "./mainpage";
import AdminMainPage from "./adminHome";
import { useEffect, useState } from "react";
import {   useNavigate } from "react-router-dom";

function Homepage() {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setUserRole(role);
        } else {
            navigate("/login"); // Redirect if not logged in
        }
    }, []);

    return (
            <div className="homepage">
                <Navbar />
                {userRole === "admin" ? <AdminMainPage /> : <MainPage />}
            </div>
        
    );
}

export default Homepage;
