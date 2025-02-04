import { useState } from "react";
import Sidebar from "./sidebar";
import Products from "./products";
import AnimateStart from "./animatedStart";
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from "./category";
import Login from "./login";
import Signup from "./signup";

function MainPage() {
    const [showLogin, setShowLogin] = useState(true); // controls visibility of Login/Signup
    const [isLoggedIn, setIsLoggedIn] = useState(true); // controls whether the user is logged in or not

    return (
        <AnimateStart>
            <div className="container mainpage">
                <div className="left-div">
                <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                </div>

                {/* Main Content */}
                <div className="mainDisp">
                    {/* Routes handling for login/signup and products */}
                    <Routes>
                        {/* Redirect to Products if logged in */}
                        <Route path="/" element={isLoggedIn ? <Products /> : <Navigate to="/login" />} />

                        {/* If showLogin is true, render Login, else render Signup */}
                        <Route 
                            path="/login" 
                            element={showLogin ? <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/signup" />} 
                        />

                        <Route 
                            path="/signup" 
                            element={!showLogin ? <Signup setShowLogin={setShowLogin} /> : <Navigate to="/login" />} 
                        />

                        {/* Category Page */}
                        <Route path="/category/:name" element={isLoggedIn ? <Category /> : <Navigate to="/login" />} />

                        {/* Default Redirect */}
                        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
                    </Routes>
                </div>
            </div>
        </AnimateStart>
    );
}

export default MainPage;
