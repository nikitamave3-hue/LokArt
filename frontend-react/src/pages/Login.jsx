import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./login.css";

function Login({ t = {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setErrorMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await API.post("/users/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const data = response?.data || {};

      const payload = data?.data || data;

      const token =
        payload?.token ||
        data?.token ||
        payload?.data?.token;

      const user =
        payload?.user ||
        payload?.data?.user ||
        payload?.data ||
        payload;

      if (!token) {
        throw new Error("Login response did not contain a token.");
      }

      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem(
          "lokartUser",
          JSON.stringify(user)
        );
      }

      const userRole = String(
        user?.role || payload?.role || "user"
      ).toLowerCase();

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed. Please try again.";

      setErrorMessage(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>
          {t.loginTitle || "LokArt Login"}
        </h2>

        <p className="form-note">
          Welcome back to the village marketplace.
        </p>

        <form onSubmit={handleLogin}>

          {errorMessage && (
            <div className="form-error">
              {errorMessage}
            </div>
          )}

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder={
                t.emailPlaceholder || "Email Address"
              }
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder={
                t.passwordPlaceholder || "Password"
              }
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? t.loginLoading || "Logging in..."
              : t.login || "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;