
import AdminSideNav from './adminSidePanel'
import AnimateStart from "./animatedStart";
import { Routes, Route} from 'react-router-dom';
import AdminProducts from "./adminProducts";
import CreateProduct from "./adminCreatePost";
import Orders from "./adminOrders";
import Users from "./adminUsers";
import Login from "./login";



function AdminMainPage() {
    return (
        <AnimateStart>
            <div className="container mainpage">
                
                <div className="left-div ">
                    <AdminSideNav/>
                </div>
                <div className="mainDisp">
                <Routes>
                    {/* Define Routes for each page */}
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/product" element={<CreateProduct />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/" element={<h1>Admin HomePage</h1>} />
                </Routes>
                    
                    </div>

            </div>
        </AnimateStart>
    );
}

export default AdminMainPage;