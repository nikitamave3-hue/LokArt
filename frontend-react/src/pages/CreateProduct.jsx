import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreateProduct({ t = {} }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    village: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      // 🔥 API Call
      const res = await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product Created Successfully 🚀");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        village: "",
        stock: "",
      });

      setImage(null);

      navigate("/marketplace");

    } catch (error) {
      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      } else if (error.request) {
        alert("Server se response nahi aaya.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{t.sell || "🛒 Sell Product"}</h2>
        <p className="form-note">{t.createProductNote || "List your product for local buyers and artisans."}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              name="name"
              placeholder={t.productNamePlaceholder || "Product Name"}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <textarea
              name="description"
              placeholder={t.productDescriptionPlaceholder || "Product Description"}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              name="price"
              type="number"
              placeholder={t.productPricePlaceholder || "Price"}
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              name="category"
              placeholder={t.productCategoryPlaceholder || "Category"}
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              name="village"
              placeholder={t.villagePlaceholder || "Village"}
              value={form.village}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              name="stock"
              placeholder={t.productStockPlaceholder || "Stock"}
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="submit-btn" type="submit">
            {t.createProductButton || "🚀 Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;