import { Link, useNavigate } from "react-router-dom"

function AdminSideNav(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return(
        <div className="sidebr  ">
            <h3 className="mb-3 mt-3">Welcome Eric</h3>

            <Link to="/admin/products">
                <div className="sb-items mb-3">
                    <p>Products</p>
                </div>
            </Link>

            <Link to="/admin/product">
                <div className="sb-items mb-3">
                    <p>create post</p>
                </div>
            </Link>
            
            <Link to="/admin/orders">
                <div className="sb-items mb-3">
                    <p>check orders</p>
                </div>
            </Link>
            
            <Link to="/admin/users">
                <div className="sb-items mb-3">
                    <p>users</p>
                </div>
            </Link>
            

            <div className="sb-items mb-3" style={{cursor:"pointer"}} onClick={handleLogout} >
                <p>Logout</p>
            </div>
            
           
        </div>
    )
}

export default AdminSideNav