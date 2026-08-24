import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./login.css";

function Register({ t = {} }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    village: "",
    role: "user",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 REGISTER BUTTON CLICKED", form);

    if (!form.name || !form.email || !form.password || !form.phone || !form.village) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await API.post("/users/register", form);
      const result = response.data;
      const token = result?.token || result?.data?.token || result?.user?.token;
      const user = result?.user || result?.data || result;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("lokartUser", JSON.stringify(user));
      }

      if (token) {
        const role = (user?.role || "user").toString().toLowerCase();
        navigate(role === "admin" ? "/admin" : "/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{t.registerTitle || "Create LokArt Account"}</h2>
        <p className="form-note">Join the premium rural marketplace.</p>

        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="form-error">{errorMessage}</div>}
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder={t.namePlaceholder || "Full Name"}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder || "Email Address"}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder={t.passwordPlaceholder || "Password"}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="phone"
              placeholder={t.phonePlaceholder || "Phone Number"}
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="village"
              placeholder={t.villagePlaceholder || "Village"}
              value={form.village}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">{t.roleCustomer || "Customer"}</option>
              <option value="artist">{t.roleArtist || "Artist / Worker"}</option>
            </select>
          </div>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : (t.register || "Register")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;