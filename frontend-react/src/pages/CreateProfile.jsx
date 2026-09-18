import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Dashboard.css";

export default function CreateProfile({ t = {} }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    skills: "",
    business: "",
    experience: "",
    whatsapp: "",
    location: "",
    description: "",
    phone: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("lokartUser");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setUser(parsed.user || parsed);
    } catch (error) {
      console.error("PROFILE USER LOAD ERROR:", error);
    }
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        category: form.category.trim(),
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        business: form.business.trim(),
        experience: Number(form.experience) || 0,
        whatsapp: form.whatsapp.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        phone: form.phone.trim(),
        user: user._id,
      };

      const artistsResponse = await API.get("/artists");

      const artists = Array.isArray(artistsResponse.data)
        ? artistsResponse.data
        : artistsResponse.data?.data || [];

      const existingArtist = artists.find(
        (artist) =>
          artist.user?._id === user._id ||
          artist.user === user._id
      );

      let response;

      if (existingArtist) {
        response = await API.put(
          `/artists/${existingArtist._id}`,
          payload
        );
        alert("✅ Artisan profile updated successfully!");
      } else {
        response = await API.post("/artists", payload);
        alert("🎉 Artisan profile created successfully!");
      }

      navigate("/services");
    } catch (error) {
      console.error("ARTIST SAVE ERROR:", error);

      alert(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to save artisan profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="card">
          <h2>Welcome to LokArt</h2>
          <p>Please login or register to create your artisan profile.</p>

          <div className="actions" style={{ gap: "12px", marginTop: "20px" }}>
            <button
              className="btn"
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Create Your Artisan Profile</h1>
        <p>
          अपना हुनर और स्थानीय काम LokArt पर जोड़ें।
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
          />

          <label>Skill / Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select your category</option>
            <option value="pottery">Pottery & Clay Work</option>
            <option value="handmade-crafts">Handmade Crafts</option>
            <option value="pickle-papad">Pickle & Papad</option>
            <option value="embroidery-stitching">Embroidery & Stitching</option>
            <option value="folk-art">Folk Art</option>
            <option value="bamboo-basket">Bamboo & Basket Work</option>
            <option value="handmade-jewellery">Handmade Jewellery</option>
            <option value="local-food">Local Food Products</option>
            <option value="other">Other Local Skills</option>
          </select>

          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Example: Clay pots, Diyas, Decoration"
          />

          <label>Business Name</label>
          <input
            type="text"
            name="business"
            value={form.business}
            onChange={handleChange}
            placeholder="Your business name (optional)"
          />

          <label>Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            min="0"
            placeholder="0"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="10 digit phone number"
          />

          <label>WhatsApp Number</label>
          <input
            type="tel"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="10 digit WhatsApp number (optional)"
          />

          <label>Village / Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Village / City"
          />

          <label>About Your Work</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell customers about your work..."
            rows="4"
          />

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? "Creating Profile..." : "Create Artisan Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}
