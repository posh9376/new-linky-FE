/* eslint-disable react/prop-types */
import logo from './assets/logo1.png';
import { useState } from 'react';
import axios from 'axios';
import AnimateStart from './animatedStart';
import { useNavigate } from 'react-router-dom';

function Login({ setShowLogin, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleShowLogin = () => {
        setShowLogin(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        console.log("Form submitted with value:", email, password);

        try {
            const response = await axios.post("https://linky-backend-uk3y.onrender.com/login", { email, password }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            const { access_token, user } = response.data; // Expecting { access_token, user }
            console.log("Login successful:", response.data);

            // Store user details in localStorage
            localStorage.setItem("token", access_token);
            localStorage.setItem("userRole", user.role); // Store role (admin/user)
            localStorage.setItem("userName", user.name); // Store user name
            localStorage.setItem("userId", user.id); // Store user ID

            setIsLoggedIn(true);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin"); // Redirect admin
            } else {
                navigate("/"); // Redirect regular user
            }
        } catch (error) {
            console.error("Login error:", error.response?.data);
            let errorMessage = error.response?.data?.message || "Login failed";
            alert(errorMessage);

            if (errorMessage === "User not found, please sign up") {
                setShowLogin(false);
            }
        }

        setEmail('');
        setPassword('');
    };

    return (
        <AnimateStart>
            <div className="data">
                <main className="form-signin m-auto">
                    <form>
                        <img className="mb-4" src={logo} alt="Logo" width="72" height="57"/>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating mb-2">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="name@example.com"/>
                            <label>Email address</label>
                        </div>

                        <div className="form-floating mb-2">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>
                            <label>Password</label>
                        </div>

                        <button className="btn btn-primary w-100 py-2 mb-2" onClick={handleSubmit}>Log in</button>
                        <p>Don&apos;t have an account? <button type="button" className="btn btn-primary" style={{ cursor: 'pointer' }} onClick={handleShowLogin}>Sign up</button></p>
                        <p className="mt-5 mb-3 text-body-secondary">© 2024–2025</p>
                    </form>
                </main>
            </div>
        </AnimateStart>
    );
}

export default Login;
