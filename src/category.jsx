import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Category() {
  const { name } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://linky-backend-uk3y.onrender.com/products/${name}`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]); // Fetch products whenever category changes

  return (
    <div>
      <h2>Products in {name}</h2>
      {loading ? <p>Loading...</p> : 
        products.length > 0 ? (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><span style={{ color: "blue" }} >Loc: </span>{product.location}</p>
                <p style={{ color: "blue" }}>Ksh {product.price}</p>
              </div>
            ))}
          </div>
        ) : <p>No products found in this category.</p>
      }
    </div>
  );
}

export default Category;
