import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        setError("No authorization token found");
        setLoading(false);
        return;
    }

    fetch("https://linky-backend-uk3y.onrender.com/admin/orders", {
      method: "GET", // Explicitly set the method
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      setOrders(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    });
}, []);


  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <div>
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Created on</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>${order.created_at}</td>
              <td>{order.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
