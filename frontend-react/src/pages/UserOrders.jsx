import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSessionValidity } from "../components/ProtectedRoute";
import API from "../api/api";
import { getProductImageUrl } from "../utils/productImage";
import potteryImage from "../assets/home/pottery.png";
import handmadeCraftsImage from "../assets/home/handmade-crafts.png";
import woodCraftImage from "../assets/home/wood-craft.png";
import "./userOrders.css";

const orderFallbackImages = [
  potteryImage,
  handmadeCraftsImage,
  woodCraftImage,
];

function UserOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleImageError = (event, index) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = orderFallbackImages[index % orderFallbackImages.length];
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError("");
        setLoading(true);

        if (!checkSessionValidity().isValid) {
          setError("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        const { data } = await API.get("/orders");
        setOrders(data?.data || []);
      } catch (err) {
        setError(
          err.response?.status === 401
            ? "Please log in to view your orders."
            : "Unable to load orders. Please check if the server is running."
        );
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
            <div className="placeholder-title">
              {error === "Please log in to view your orders."
                ? "Login required"
                : "Unable to load orders"}
            </div>
            <div className="placeholder-text">{error}</div>
            {error === "Please log in to view your orders." && (
              <button
                type="button"
                onClick={() => navigate("/login", { state: { from: "/user-orders" } })}
              >
                Login
              </button>
            )}
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

          {orders.map((order, index) => (
            <div className="order-card" key={order._id}>

              <img
                src={getProductImageUrl(order.product, index)}
                alt={order.product?.name || "Order item"}
                onError={(event) => handleImageError(event, index)}
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