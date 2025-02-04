/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import phone from "./assets/phone-225-svgrepo-com.svg";
import laptop from "./assets/laptop1-svgrepo-com.svg";
import home from "./assets/home-1-svgrepo-com (1).svg";
import clothes from "./assets/clothes-fashion-tshirt-svgrepo-com.svg";
import car from "./assets/car-svgrepo-com.svg";
import login from "./assets/login-svgrepo-com.svg";
import filter from "./assets/filter-lines-svgrepo-com.svg";

function Sidebar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("userRole"); 
    localStorage.removeItem("authToken"); 

    
    setIsLoggedIn(false);

    // Redirect to home or login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h3>What are you hunting for?</h3>

      <Link to="/products" className="sb-items">
        <img src={filter} alt="All Products" />
        <p>All Products</p>
      </Link>

      <Link to="/category/laptops" className="sb-items">
        <img src={laptop} alt="Laptops" />
        <p>Laptops</p>
      </Link>

      <Link to="/category/phones" className="sb-items">
        <img src={phone} alt="Phones and Tablets" />
        <p>Phones and Tablets</p>
      </Link>

      <Link to="/category/home" className="sb-items">
        <img src={home} alt="Home and Kitchen" />
        <p>Home and Kitchen</p>
      </Link>

      <Link to="/category/clothes" className="sb-items">
        <img src={clothes} alt="Clothes" />
        <p>Clothes</p>
      </Link>

      <Link to="/category/car-accessories" className="sb-items">
        <img src={car} alt="Car Accessories" />
        <p>Car Accessories</p>
      </Link>

      {isLoggedIn ? (
        <div className="sb-items" style={{ cursor: "pointer" }} onClick={handleLogout}>
          <img src={login} alt="Logout" />
          <p>Logout</p>
        </div>
      ) : (
        <Link to="/login" className="sb-items">
          <img src={login} alt="Login" />
          <p>Login</p>
        </Link>
      )}
    </div>
  );
}

export default Sidebar;
