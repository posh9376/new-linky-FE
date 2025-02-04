import AdminProductItems from './adminProductsItem';
import axios from "axios";
import { useEffect, useState } from 'react';

function AdminProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://linky-backend-uk3y.onrender.com/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to fetch products");
        }
    };

    const handleDelete = async (productId) => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) throw new Error('No authorization token found');

            const response = await axios.delete(`https://linky-backend-uk3y.onrender.com/admin/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                // ✅ Remove deleted product from state
                setProducts(products.filter(product => product.id !== productId));
                console.log('Product deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting product:', error.response?.data || error.message);
            alert(error.response?.data?.msg || "Failed to delete product");
        }
    };

    return (
        <div className="products">
            {products.map((product) => (
                <AdminProductItems 
                    key={product.id} 
                    image={product.image} 
                    title={product.title} 
                    description={product.description} 
                    price={product.price} 
                    location={product.location} 
                    handleDelete={() => handleDelete(product.id)}
                />
            ))}
        </div>
    );
}

export default AdminProducts;
