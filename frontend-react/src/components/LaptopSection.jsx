import React from "react";
import "./LaptopSection.css";

const categories = [
  "Laptop",
  "Branded Laptop",
  "Laptop Battery",
  "Laptop Adaptor",
  "Laptop RAM",
  "Laptop Cooling Pad",
  "Laptop Spares",
  "Laptop Accessories",
  "Laptop Screen",
  "Laptop Keyboard",
  "Laptop Base | Panel | Touchpad",
  "Laptop Display Cable",
];

const products = [
  {
    id: "P8903",
    itemCode: "HIBZDG",
    name: "A+ Products LCD Cleaner Gel 100ml Premium",
    price: "₹28",
    image: "https://via.placeholder.com/250",
  },
  {
    id: "P4771",
    itemCode: "DVPIMQ",
    name: "Aarvex Laptop RAM 16GB DDR4 2666Mhz",
    price: "₹7,875",
    image: "https://via.placeholder.com/250",
  },
  {
    id: "P7866",
    itemCode: "GLIGNG",
    name: "Aarvex Laptop RAM 16GB DDR4 3200Mhz",
    price: "₹8,400",
    image: "https://via.placeholder.com/250",
  },
  {
    id: "A2412",
    itemCode: "JKORLO",
    name: "Aarvex Laptop RAM 16GB DDR5 4800Mhz",
    price: "₹15,950",
    image: "https://via.placeholder.com/250",
  },
  {
    id: "P685",
    itemCode: "LYQYA",
    name: "Aarvex Laptop RAM 4GB DDR3 1600Mhz",
    price: "₹780",
    image: "https://via.placeholder.com/250",
  },
];

function LaptopSection() {
  return (
    <div className="laptop-section">
      <div className="category-bar">
        {categories.map((category, index) => (
          <button
            key={index}
            className={index === 0 ? "active-tab" : "tab"}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <div className="product-meta">
              <span>Product ID: {product.id}</span>
              <span>Item CD: {product.itemCode}</span>
            </div>

            <div className="price-stock">
              <span className="price">{product.price}</span>
              <span className="stock">In Stock</span>
            </div>

            <div className="cart-row">
              <input type="number" min="1" defaultValue="1" />

              <button className="cart-btn">
                ADD TO CART
              </button>

              <button className="wish-btn">
                ♡
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LaptopSection;