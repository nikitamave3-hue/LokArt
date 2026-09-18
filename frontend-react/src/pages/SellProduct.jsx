import "./SellProduct.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function SellProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    village: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setMessage("");
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name.trim()) {
      setError("Product Name भरना जरूरी है।");
      return;
    }

    if (!product.price || Number(product.price) <= 0) {
      setError("Valid Price डालना जरूरी है।");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        if (value !== "") {
          formData.append(key, value);
        }
      });

      if (image) {
        formData.append("image", image);
      }

      await API.post("/products", formData);

      setMessage("✅ Product successfully listed!");

      setTimeout(() => {
        navigate("/marketplace");
      }, 1200);
    } catch (err) {
      console.error("SELL PRODUCT ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Product upload नहीं हो पाया। Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "calc(100vh - 100px)",
      padding: "45px 20px 70px",
      background:
        "linear-gradient(135deg, #FFF0DF 0%, #FFFAF6 50%, #FFF0DF 100%)",
      boxSizing: "border-box",
    },

    container: {
      maxWidth: "950px",
      width: "100%",
      margin: "0 auto",
    },

    badge: {
      display: "inline-block",
      background: "#FFF0DF",
      color: "#B86A28",
      padding: "8px 18px",
      borderRadius: "30px",
      fontWeight: "700",
      marginBottom: "12px",
    },

    title: {
      color: "#4A2A15",
      fontSize: "38px",
      margin: "0 0 10px",
      fontWeight: "800",
    },

    subtitle: {
      color: "#5b3b27",
      fontSize: "16px",
      margin: 0,
    },

    card: {
      background: "#ffffff",
      borderRadius: "22px",
      padding: "32px",
      boxShadow: "0 12px 35px rgba(91,47,24,.14)",
      border: "1px solid #F4D4B2",
    },

    sectionTitle: {
      color: "#4A2A15",
      marginTop: 0,
      marginBottom: "25px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "20px",
    },

    field: {
      marginBottom: "20px",
    },

    label: {
      display: "block",
      marginBottom: "7px",
      color: "#4A2A15",
      fontWeight: "700",
      fontSize: "14px",
    },

    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "13px 15px",
      border: "1px solid #F4D4B2",
      borderRadius: "10px",
      background: "#FFFFFF",
      color: "#4A2A15",
      fontSize: "15px",
      outline: "none",
    },

    textarea: {
      width: "100%",
      boxSizing: "border-box",
      padding: "13px 15px",
      border: "1px solid #F4D4B2",
      borderRadius: "10px",
      background: "#FFFFFF",
      color: "#4A2A15",
      fontSize: "15px",
      outline: "none",
      resize: "vertical",
    },

    uploadBox: {
      border: "2px dashed #E8A95B",
      borderRadius: "14px",
      padding: "22px",
      background: "#FFFAF6",
    },

    preview: {
      display: "block",
      width: "240px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "14px",
      marginTop: "15px",
      border: "2px solid #E8A95B",
    },

    actions: {
      display: "flex",
      justifyContent: "space-between",
      gap: "15px",
      marginTop: "30px",
    },

    backButton: {
      padding: "13px 22px",
      border: "none",
      borderRadius: "10px",
      background: "#F4D4B2",
      color: "#4A2A15",
      fontWeight: "700",
      cursor: "pointer",
    },

    submitButton: {
      padding: "13px 28px",
      border: "none",
      borderRadius: "10px",
      background: "#ff7a00",
      color: "#ffffff",
      fontWeight: "700",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
    },

    message: {
      padding: "13px",
      marginBottom: "20px",
      borderRadius: "10px",
      background: "#effaf1",
      color: "#247a35",
      fontWeight: "600",
    },

    error: {
      padding: "13px",
      marginBottom: "20px",
      borderRadius: "10px",
      background: "#fff0f0",
      color: "#b42318",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div style={styles.badge}>
            🌾 LokArt Marketplace
          </div>

          <h1 style={styles.title}>
            Sell Your Product
          </h1>

          <p style={styles.subtitle}>
            Apne gaon ki handmade aur local products ko LokArt par sell karein.
          </p>
        </div>

        <div className="sell-product-card" style={styles.card}>
          <h2 style={styles.sectionTitle}>
            🛍️ Product Details
          </h2>

          {error && (
            <div style={styles.error}>
              ❌ {error}
            </div>
          )}

          {message && (
            <div style={styles.message}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div style={styles.grid}>

              <div style={styles.field}>
                <label style={styles.label}>
                  Product Name *
                </label>

                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  placeholder="e.g. Handmade Pottery"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Price (₹) *
                </label>

                <input
                  style={styles.input}
                  type="number"
                  name="price"
                  min="1"
                  placeholder="e.g. 500"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Category
                </label>

                <select
                  style={styles.input}
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Category
                  </option>
                  <option value="Handicraft">
                    Handicraft
                  </option>
                  <option value="Pottery">
                    Pottery
                  </option>
                  <option value="Jewellery">
                    Jewellery
                  </option>
                  <option value="Clothing">
                    Clothing
                  </option>
                  <option value="Food">
                    Food
                  </option>
                  <option value="Decor">
                    Home Decor
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Stock
                </label>

                <input
                  style={styles.input}
                  type="number"
                  name="stock"
                  min="0"
                  placeholder="e.g. 10"
                  value={product.stock}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Village
              </label>

              <input
                style={styles.input}
                type="text"
                name="village"
                placeholder="Your village name"
                value={product.village}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Product Description
              </label>

              <textarea
                style={styles.textarea}
                name="description"
                rows="5"
                placeholder="Product ke baare mein detail..."
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                🖼️ Product Image
              </label>

              <div style={styles.uploadBox}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

                {preview ? (
                  <img
                    src={preview}
                    alt="Product Preview"
                    style={styles.preview}
                  />
                ) : (
                  <p
                    style={{
                      color: "#5b3b27",
                      marginBottom: 0,
                    }}
                  >
                    Product की साफ image upload करें।
                  </p>
                )}
              </div>
            </div>

            <div style={styles.actions}>

              <button
                type="button"
                onClick={() => navigate("/marketplace")}
                style={styles.backButton}
              >
                ← Marketplace
              </button>

              <button
                type="submit"
                disabled={loading}
                style={styles.submitButton}
              >
                {loading
                  ? "⏳ Listing..."
                  : "🚀 List Product"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SellProduct;
