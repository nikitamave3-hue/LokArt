import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./marketplace.css";

const premiumFallbackImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
];

function Marketplace({ t = {} }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [villageFilter, setVillageFilter] = useState("All");
  const [sortOption, setSortOption] = useState("latest");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("lokartUser") || "null");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/products");
      const productData = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
          ? res.data
          : [];

      const cleanProducts = productData.map((item) => ({
        ...item,
        category:
          item.category?.toLowerCase() === "all"
            ? ""
            : item.category,
        village:
          item.village?.toLowerCase() === "all"
            ? ""
            : item.village,
      }));

      console.log("MARKETPLACE PRODUCTS:", cleanProducts);
      setProducts(cleanProducts);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Unable to load products. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const categoryList = products
      .map((item) => item.category)
      .filter(Boolean)
      .filter((category) => typeof category === "string" && category.trim() !== "" && category.toLowerCase() !== "all");

    return ["All", ...Array.from(new Set(categoryList))];
  }, [products]);

  const villages = useMemo(() => {
    const villageList = products
      .map((item) => item.village)
      .filter(Boolean)
      .filter((village) => typeof village === "string" && village.trim() !== "" && village.toLowerCase() !== "all");

    return ["All", ...Array.from(new Set(villageList))];
  }, [products]);

  const visibleProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter !== "All") {
      list = list.filter((item) => (item.category || "").toLowerCase() === categoryFilter.toLowerCase());
    }

    if (villageFilter !== "All") {
      list = list.filter((item) => (item.village || "").toLowerCase() === villageFilter.toLowerCase());
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (item) =>
          (item.name || item.title || "").toLowerCase().includes(term) ||
          (item.description || "").toLowerCase().includes(term) ||
          (item.category || "").toLowerCase().includes(term) ||
          (item.village || "").toLowerCase().includes(term)
      );
    }

    return list.sort((a, b) => {
      if (sortOption === "priceAsc") return (a.price || 0) - (b.price || 0);
      if (sortOption === "priceDesc") return (b.price || 0) - (a.price || 0);
      return new Date(b.createdAt || b.updatedAt || Date.now()) - new Date(a.createdAt || a.updatedAt || Date.now());
    });
  }, [products, categoryFilter, villageFilter, searchTerm, sortOption]);

  const handleBuy = async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setActionLoadingId(item._id || item.name);
      await API.post(
        "/orders",
        { productId: item._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/user-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to place order. Please try again.");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setActionLoadingId(item._id || item.name);
      await API.delete(`/products/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setActionLoadingId("");
    }
  };

  const getImageForProduct = (item, index) => {
    const image = item.image || "";
    const normalized = typeof image === "string" ? image.trim() : "";

    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      return normalized;
    }

    return premiumFallbackImages[index % premiumFallbackImages.length];
  };

  const handleImageError = (e, index) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      premiumFallbackImages[index % premiumFallbackImages.length];
  };

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <div className="marketplace-badge">Premium village marketplace</div>
        <h2 className="marketplace-title">{t.marketplaceTitle || "LokArt Marketplace"}</h2>
        <p className="marketplace-subtitle">{t.marketplaceSubtitle || "Discover handcrafted products and trusted local services from village artisans."}</p>
      </div>

      <div className="marketplace-controls">
        <input
          type="search"
          placeholder={t.marketplaceSearchPlaceholder || "Search products, categories, village..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="marketplace-search"
        />

        <div className="marketplace-filters">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((category, idx) => (
              <option key={`${category}-${idx}`} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)}>
            {villages.map((village, idx) => (
              <option key={`${village}-${idx}`} value={village}>
                {village}
              </option>
            ))}
          </select>

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">Newest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-box skeleton-image" />
              <div className="skeleton-box skeleton-text" />
              <div className="skeleton-box skeleton-text small" />
              <div className="skeleton-box skeleton-button" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {error ? (
            <div className="placeholder-grid">
              <div className="placeholder-card">
                <div className="placeholder-title">Server disconnected</div>
                <div className="placeholder-text">{error}</div>
              </div>
            </div>
          ) : (
            <>
              {visibleProducts.length === 0 && (
                <h3 className="empty">{t.marketplaceNoProducts || "No matching products found."}</h3>
              )}

              <div className="product-grid">
                {visibleProducts.map((item, index) => (
                  <div className="product-card" key={item._id || item.name}>
                    <img
                      src={getImageForProduct(item, index)}
                      alt={item.name || item.title || "Product"}
                      className="product-image"
                      loading="lazy"
                      onError={(e) => handleImageError(e, index)}
                    />

                    <div className="product-body">
                      <div className="product-chip">{item.category || "Handcrafted"}</div>
                      <h3 className="product-name">{item.name || item.title || "Untitled Product"}</h3>
                      <p className="product-desc">{item.description || "No description available."}</p>
                      <p className="product-price">₹ {item.price ?? 0}</p>
                      <p className="product-info">
                        <strong>Village:</strong> {item.village || "N/A"}
                      </p>
                      <p className="product-info">
                        <strong>Seller:</strong> {item.user?.name || item.seller || "Unknown"}
                      </p>

                      <button
                        className="buy-btn"
                        onClick={() => handleBuy(item)}
                        disabled={actionLoadingId === (item._id || item.name)}
                      >
                        {actionLoadingId === (item._id || item.name) ? "Processing..." : "🛒 Buy Now"}
                      </button>

                      {user && (item.user?._id === user._id || item.user === user._id) && (
                        <div className="action-buttons">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(item)}
                            disabled={actionLoadingId === (item._id || item.name)}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Marketplace;