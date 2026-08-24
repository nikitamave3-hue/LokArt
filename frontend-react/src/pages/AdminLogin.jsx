import "./adminlogin.css";
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setErrorMessage("");

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await API.post("/users/login", {
        email: form.email.trim(),
        password: form.password,
      });

      console.log("ADMIN LOGIN RESPONSE:", res.data);

      const user =
        res.data?.user ||
        res.data?.data?.user ||
        res.data?.data ||
        res.data;

      const token =
        res.data?.token ||
        res.data?.data?.token ||
        user?.token;

      const role = String(user?.role || "").trim().toLowerCase();

      console.log("ADMIN USER:", user?.email);
      console.log("ADMIN ROLE:", role);

      if (role !== "admin") {
        setErrorMessage("Access Denied (Admin Only)");
        return;
      }

      if (!token) {
        setErrorMessage("Login successful but token was not received");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem(
        "lokartUser",
        JSON.stringify({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          village: user.village,
          role: "admin",
        })
      );

      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      setErrorMessage(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <h2>🛠️ Admin Login</h2>

        <form onSubmit={loginHandler}>
          {errorMessage && (
            <div className="form-error">{errorMessage}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
