import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./userOrders.css";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError("");
        setLoading(true);
        const { data } = await API.get("/orders");
        setOrders(data?.data || []);
      } catch (err) {
        setError("Unable to load orders. Please check if the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>

      {loading ? (
        <div className="placeholder-grid">
          <div className="placeholder-card">
            <div className="placeholder-title">Loading orders...</div>
          </div>
        </div>
      ) : error ? (
        <div className="placeholder-grid">
          <div className="placeholder-card">
            <div className="placeholder-title">Unable to load orders</div>
            <div className="placeholder-text">{error}</div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="placeholder-grid">
          <div className="placeholder-card">
            <div className="placeholder-title">No orders yet</div>
            <div className="placeholder-text">Buy a product from the marketplace to see your orders here.</div>
          </div>
        </div>
      ) : (
        <div className="orders-grid">

          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <img
                src={order.product?.image || "https://via.placeholder.com/300x220?text=LokArt"}
                alt={order.product?.name || "Order item"}
              />

              <div className="order-info">

                <h3>{order.product?.name || "Order item"}</h3>

                <p>💰 Price: ₹{order.totalPrice ?? 0}</p>

                <p>📦 Qty: {order.quantity || 1}</p>

                <p>
                  🚚 Status: {" "}
                  <span className={`status ${(order.status || "pending").toLowerCase()}`}>
                    {order.status || "Pending"}
                  </span>
                </p>

                <p className="date">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default UserOrders;