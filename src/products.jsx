import ProductItems from "./ProductItems";
import watch from './assets/products/watch.jpeg'
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
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
    })

   

    return (
        <div className="products">
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            <ProductItems image={watch} title="Product 1" description="Description 1" price="ksh 800" location="Nairobi" />
            {products.map((product) => (
                <ProductItems key={product.id} image={product.image} title={product.name} description={product.description} price={product.price} location={product.location}/>
            ))}
        </div>
    );
}

export default Products