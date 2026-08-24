import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import "./Home.css";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      title: "Handmade Crafts",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600"
    },
    {
      title: "Home Decor",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
    },
    {
      title: "Paintings",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600"
    },
    {
      title: "Pottery",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600"
    },
    {
      title: "Wood Craft",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600"
    },
    {
      title: "Textiles",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setFeaturedProducts(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="home-page">
          {/* ================= HERO SECTION ================= */}

      <section className="hero container">

        <div className="hero-copy">

          <span className="eyebrow">
            Welcome To LokArt
          </span>

          <h1>
            Discover Handmade Products <br />
            From India's Local Artisans
          </h1>

          <p className="lede">
            Support local artists and skilled workers by purchasing authentic
            handmade products and booking trusted village services.
          </p>

          <div className="hero-actions">

            <Link to="/marketplace" className="btn btn-primary">
              Shop Now
            </Link>

            <Link to="/services" className="btn btn-secondary">
              Explore Services
            </Link>

          </div>

          <div className="stat-grid">

            <div className="stat-box">
              <strong>500+</strong>
              <span>Artisans</span>
            </div>

            <div className="stat-box">
              <strong>1200+</strong>
              <span>Products</span>
            </div>

            <div className="stat-box">
              <strong>250+</strong>
              <span>Village Services</span>
            </div>

          </div>

        </div>

        <div className="hero-card">

          <h2>Why Choose LokArt?</h2>

          <ul>
            <li>100% Handmade Products</li>
            <li>Support Rural Families</li>
            <li>Secure Online Payments</li>
            <li>Fast Delivery Across India</li>
            <li>Trusted Local Service Providers</li>
          </ul>

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="section-block">

        <div className="container">

          <div className="section-heading">

            <h2>Popular Categories</h2>

            <p>
              Explore India's beautiful handmade collections.
            </p>

          </div>

          <div className="card-grid">

            {categories.map((category, index) => (

              <div className="card" key={index}>

                <img
                  src={category.image}
                  alt={category.title}
                />

                <h3>{category.title}</h3>

                <p>
                  Discover beautiful handmade products crafted by local artisans.
                </p>

                <div className="hero-actions">

                  <Link
                    to="/marketplace"
                    className="btn btn-primary"
                  >
                    Explore
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
            {/* ================= FEATURED PRODUCTS ================= */}

      <section className="section-block">

        <div className="container">

          <div className="section-heading">
            <h2>Featured Products</h2>
            <p>
              Buy authentic handmade products directly from local artisans.
            </p>
          </div>

          {loading ? (

            <h3 style={{ textAlign: "center" }}>
              Loading Products...
            </h3>

          ) : (

            <div className="card-grid">

              {featuredProducts.length > 0 ? (

                featuredProducts.slice(0, 6).map((product) => (

                  <div
                    className="card"
                    key={product._id}
                  >

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/400x300?text=LokArt"
                      }
                      alt={product.name}
                    />

                    <h3>{product.name}</h3>

                    <p>
                      {product.description
                        ? product.description.substring(0, 90)
                        : "Beautiful handmade product from local artisan."}
                    </p>

                    <div className="product-meta">

                      <strong>
                        ₹{product.price}
                      </strong>

                      <span>
                        {product.category || "Handmade"}
                      </span>

                    </div>

                    <div className="hero-actions">

                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>

                      <Link
                        to="/payment"
                        className="btn btn-secondary"
                      >
                        Buy Now
                      </Link>

                    </div>

                  </div>

                ))

              ) : (

                <h3 style={{ textAlign: "center" }}>
                  No Products Found
                </h3>

              )}

            </div>

          )}

        </div>

      </section>
            {/* ================= FEATURED SERVICES ================= */}

      <section className="section-block">

        <div className="container">

          <div className="section-heading">
            <h2>Featured Services</h2>
            <p>Book trusted local workers from your nearby villages.</p>
          </div>

          <div className="card-grid">

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                alt="Carpenter"
              />

              <h3>Carpenter</h3>

              <p>
                Skilled carpenters for furniture, doors, windows and wooden
                interior work.
              </p>

              <div className="hero-actions">
                <Link to="/services" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
                alt="Electrician"
              />

              <h3>Electrician</h3>

              <p>
                Professional electricians for home wiring, repair and
                installations.
              </p>

              <div className="hero-actions">
                <Link to="/services" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                alt="Painter"
              />

              <h3>House Painter</h3>

              <p>
                Interior and exterior painting services by experienced workers.
              </p>

              <div className="hero-actions">
                <Link to="/services" className="btn btn-primary">
                  Book Now
                </Link>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE LOKART ================= */}

      <section className="section-block">

        <div className="container">

          <div className="section-heading">
            <h2>Why Choose LokArt?</h2>
            <p>Connecting villages with the digital world.</p>
          </div>

          <div className="trust-grid">

            <div className="feature-card">
              <h3>Trusted Sellers</h3>
              <p>Every artisan is verified before joining LokArt.</p>
            </div>

            <div className="feature-card">
              <h3>Secure Payments</h3>
              <p>Safe online payment experience for every customer.</p>
            </div>

            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Quick delivery of handmade products across India.</p>
            </div>

            <div className="feature-card">
              <h3>Support Rural India</h3>
              <p>Your purchase directly supports local families.</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section className="section-block">

        <div className="container">

          <div className="stat-grid">

            <div className="stat-box">
              <strong>500+</strong>
              <span>Registered Artisans</span>
            </div>

            <div className="stat-box">
              <strong>1500+</strong>
              <span>Happy Customers</span>
            </div>

            <div className="stat-box">
              <strong>25+</strong>
              <span>States Connected</span>
            </div>

          </div>

        </div>

      </section>
            {/* ================= TESTIMONIALS ================= */}

      <section className="section-block">

        <div className="container">

          <div className="section-heading">
            <h2>What Our Customers Say</h2>
            <p>Trusted by thousands of happy customers.</p>
          </div>

          <div className="card-grid">

            <div className="card">
              <h3 className="rating-stars">
               ⭐⭐⭐⭐⭐
              </h3>
              <p>
                "Amazing handmade products with excellent quality. I love supporting local artisans."
              </p>
              <strong style={{ padding: "20px" }}>- Priya Sharma</strong>
            </div>

            <div className="card">
              <h3 className="rating-stars">
               ⭐⭐⭐⭐⭐
              </h3>
              <p>
                "Booking local workers through LokArt is very easy and secure."
              </p>
              <strong style={{ padding: "20px" }}>- Rahul Verma</strong>
            </div>

            <div className="card">
              <h3>⭐⭐⭐⭐⭐</h3>
              <p>
                "Fast delivery and beautiful handcrafted products. Highly recommended!"
              </p>
              <strong style={{ padding: "20px" }}>- Neha Singh</strong>
            </div>

          </div>

        </div>

      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="section-block">

        <div className="container">

          <div className="hero-card" style={{ textAlign: "center" }}>

            <h2>Join LokArt Today</h2>

            <p style={{ margin: "20px 0" }}>
              Become a seller, book local workers, or discover unique handmade products from all over India.
            </p>

            <div className="hero-actions">

              <Link to="/register" className="btn btn-primary">
                Register Now
              </Link>

              <Link to="/marketplace" className="btn btn-secondary">
                Visit Marketplace
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;