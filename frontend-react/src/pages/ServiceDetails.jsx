import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

function ServiceDetails() {
  const { service } = useParams();
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [form, setForm] = useState({
    artist: "",
    userName: "",
    phone: "",
    address: "",
    bookingDate: "",
    notes: "",
  });

  useEffect(() => {
    if (!showBooking) return;

    const loadArtists = async () => {
      try {
        setLoadingArtists(true);

        const response = await API.get("/artists");

        const allArtists = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const categoryMap = {
          "pottery & clay work": "pottery",
          "pickle & papad": "pickle-papad",
          "embroidery & stitching": "embroidery-stitching",
          "folk art": "folk-art",
          "bamboo & basket work": "bamboo-basket",
          "handmade jewellery": "handmade-jewellery",
          "handmade crafts": "pottery",
          "local food products": "local-food",
          "other local skills": "other",
        };

        const selectedCategory =
          categoryMap[service.toLowerCase()] || service.toLowerCase();

        const filteredArtists = allArtists.filter(
          (artist) =>
            artist.category?.trim().toLowerCase() === selectedCategory
        );

        console.log("SERVICE:", service);
        console.log("SELECTED CATEGORY:", selectedCategory);
        console.log("ALL ARTISTS:", allArtists);
        console.log("FILTERED ARTISTS:", filteredArtists);

        setArtists(filteredArtists);
      } catch (error) {
        console.error("ARTISTS LOAD ERROR:", error);
        alert(
          error?.response?.data?.message ||
          "Unable to load service providers."
        );
      } finally {
        setLoadingArtists(false);
      }
    };

    loadArtists();
  }, [showBooking]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      alert("Please login first to book a service.");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await API.post("/bookings/create", {
        artist: form.artist,
        serviceName: data.title,
        userName: form.userName,
        phone: form.phone,
        address: form.address,
        bookingDate: form.bookingDate,
        notes: form.notes,
      });

      if (response.data?.success) {
        alert("🎉 Service booking created successfully!");
        setShowBooking(false);
        navigate("/user-orders");

        setForm({
          artist: "",
          userName: "",
          phone: "",
          address: "",
          bookingDate: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      alert(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to create booking."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const serviceData = {
    "pottery & clay work": {
      title: "Pottery & Clay Work",
      icon: "🏺",
      description: "गाँव के कुम्हारों द्वारा हाथ से बनाए गए मिट्टी के सामान।",
      services: [
        "मिट्टी के बर्तन",
        "कुल्हड़ और दीये",
        "Decorative clay items",
        "Traditional pottery work",
      ],
    },

    "handmade crafts": {
      title: "Handmade Crafts",
      icon: "🧺",
      description: "हाथ से बनाए गए पारंपरिक और खूबसूरत हस्तशिल्प।",
      services: [
        "Handmade decorative items",
        "Traditional crafts",
        "Home decoration items",
        "Custom handmade work",
      ],
    },

    "pickle & papad": {
      title: "Pickle & Papad",
      icon: "🥭",
      description: "गाँव के घरों में बनाए गए स्थानीय खाद्य पदार्थ।",
      services: [
        "घर का बना अचार",
        "पापड़",
        "मसाले",
        "Traditional food products",
      ],
    },

    "embroidery & stitching": {
      title: "Embroidery & Stitching",
      icon: "🧵",
      description: "स्थानीय महिलाओं और कारीगरों द्वारा किया गया हाथ का काम।",
      services: [
        "Embroidery work",
        "Clothes stitching",
        "Traditional designs",
        "Custom stitching",
      ],
    },

    "folk art": {
      title: "Folk Art",
      icon: "🎨",
      description: "गाँव की पारंपरिक कला, चित्रकारी और सजावटी सामान।",
      services: [
        "Traditional paintings",
        "Folk art",
        "Decorative artwork",
        "Custom artwork",
      ],
    },

    "bamboo & basket work": {
      title: "Bamboo & Basket Work",
      icon: "🎋",
      description: "बांस, लकड़ी और प्राकृतिक सामग्री से बने सामान।",
      services: [
        "Bamboo baskets",
        "Traditional baskets",
        "Handmade bamboo products",
        "Custom basket work",
      ],
    },

    "handmade jewellery": {
      title: "Handmade Jewellery",
      icon: "💍",
      description: "स्थानीय कारीगरों द्वारा बनाए गए अनोखे handmade jewellery items।",
      services: [
        "Handmade jewellery",
        "Traditional jewellery",
        "Custom jewellery",
        "Decorative accessories",
      ],
    },

    "local food products": {
      title: "Local Food Products",
      icon: "🌾",
      description: "सांगरी, मसाले और गाँव में बनाए जाने वाले अन्य स्थानीय खाद्य उत्पाद।",
      services: [
        "सांगरी",
        "Local spices",
        "Traditional food products",
        "Homemade products",
      ],
    },

    "other local skills": {
      title: "Other Local Skills",
      icon: "✋",
      description: "गाँव के लोगों का कोई भी खास हुनर या handmade काम।",
      services: [
        "Local skilled work",
        "Traditional skills",
        "Handmade work",
        "Custom local services",
      ],
    },
  };

  const data = serviceData[service];

  if (!data) {
    return (
      <div className="container section-block">
        <h1>Service Not Found</h1>
        <Link to="/services">← Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="container section-block service-details">
      <Link to="/services" className="back-link">
        ← Back to Services
      </Link>

      <div className="service-details-card">
        <div className="service-details-icon">{data.icon}</div>

        <h1>{data.title}</h1>

        <p className="service-description">{data.description}</p>

        <h2>Available Services</h2>

        <div className="service-list">
          {data.services.map((item) => (
            <div className="service-item" key={item}>
              ✅ {item}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="service-contact-button"
          onClick={() => setShowBooking(true)}
        >
          Contact Service Provider
        </button>

        {showBooking && (
          <div className="booking-form-box">
            <h2>Book This Service</h2>

            <form onSubmit={handleBooking}>
              <label>Service Provider</label>

              <select
                name="artist"
                value={form.artist}
                onChange={handleChange}
                required
                disabled={loadingArtists}
              >
                <option value="">
                  {loadingArtists
                    ? "Loading providers..."
                    : "Select Service Provider"}
                </option>

                {artists.map((artist) => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name} - {artist.category}
                  </option>
                ))}
              </select>

              <label>Your Name</label>

              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10 digit phone number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />

              <label>Service Address</label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter service address"
                required
              />

              <label>Booking Date</label>

              <input
                type="date"
                name="bookingDate"
                value={form.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <label>Extra Notes</label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any extra requirements..."
              />

              <div className="booking-actions">
                <button
                  type="submit"
                  className="service-contact-button"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  type="button"
                  className="back-link"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
