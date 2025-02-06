/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "./assets/logo1.png";
import axios from "axios";
import AnimateStart from "./animatedStart";

function Signup({ setShowLogin }) {
    const [jina, setJina] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        console.log("Form submitted with value:", jina, email, role, password);
        let data = {
              name: jina,
              email: email,
              role: role,
              password: password
        }
        axios.post("https://linky-backend-uk3y.onrender.com/signup", data, {
          headers: {
              "Content-Type": "application/json"
          },
          withCredentials: true // Ensures cookies are included if needed
      })
      .then((response) => {
          console.log(response.data);
          setShowLogin(true);
      })
      .catch((error) => {
          console.error("signup error:", error.response.data);
          const errorMessage = error.response.data.message;
          if (errorMessage === "Email already exists") {
              setShowLogin(true);
          }
          alert(errorMessage);
      });
      setEmail('');
      setPassword('');
      setJina('');
      setRole('');
    };

    return (
      <AnimateStart>
        <div className="data">
          <main className="form-signin m-auto">
            <form>
              <img className="mb-4" src={logo} alt="" width="72" height="57"/>
              <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

              <div className="form-floating mb-2" >
                <input value={jina} onChange={(e) => setJina(e.target.value)} type="name" className="form-control" id="floating" placeholder="firstname secondname"/>
                <label htmlFor="floatingInput">Name</label>
              </div>
          
              <div className="form-floating mb-2">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-2">
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <select value="" disabled>select role</select>
                  <option value="buyer">Buyer</option>
                  <option value="admin">Admin</option>
                </select>
                <label htmlFor="floatingSelect">Role</label>
              </div>
              <div className="form-floating">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
          
              <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <button className="btn  btn-primary w-100 py-2 mb-2 "  onClick={handleSubmit}>Sign in</button>
              <p>Already have an account? <button type="button" className="btn btn-primary" style={{cursor: 'pointer'}} onClick={() => setShowLogin(true)}>Login</button></p>
              <p className="mt-5 mb-3 text-body-secondary">© 2024–2025</p>
            </form>
          </main>
        </div>
      </AnimateStart>
    )
}



export default Signup