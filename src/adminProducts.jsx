import AdminProductItems from './adminProductsItem';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("https://linky-backend-uk3y.onrender.com/products")
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error.response.data);
            alert(error.response.data.message);
          });
      }, []);

    const handleDelete = (id) => {
        console.log(id);
        
        axios.delete(`https://online-store-backend-1-qgn9.onrender.com/admin/product/${id}`)
          .then(() => {
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting product:", error.response.data);
            alert(error.response.data.message);
          });
      };

    return (
        <div className="products">
            {products.map((product) => (
                <AdminProductItems key={product.id} image={product.image} title={product.title} description={product.description} price={product.price} location={product.location} handleDelete={() => handleDelete(product.id)}/>
            ))}
            
        </div>
    );
}

export default AdminProducts