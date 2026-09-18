import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import NewDashboard from "./pages/NewDashboard";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NotificationProvider } from "./context/NotificationContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import translations from "./data/translations";

import {
  ProtectedRoute,
  AdminRoute,
  PublicOnlyRoute,
} from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import AddSkill from "./pages/AddSkill";
import CreateProfile from "./pages/CreateProfile";
import PostWork from "./pages/PostWork";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserOrders from "./pages/UserOrders";
import MyBookings from "./pages/MyBookings";
import SellProduct from "./pages/SellProduct";
import FindWork from "./pages/FindWork";
import Payment from "./pages/Payment";

import AdminLogin from "./pages/AdminLogin";

function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lokart-lang");
    return saved === "hi" ? "hi" : "en";
  });

  const [showSplash, setShowSplash] = useState(
    () => !localStorage.getItem("lokart-splash-seen")
  );

  useEffect(() => {
    localStorage.setItem("lokart-lang", lang);
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      localStorage.setItem("lokart-splash-seen", "true");
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  const navItems = [
    { key: "home", to: "/" },
    { key: "products", to: "/marketplace" },
    { key: "services", to: "/services" },
    { key: "sell", to: "/sell-product" },
    { key: "create", to: "/create-profile" },
    { key: "dashboard", to: "/dashboard" },
    { key: "postwork", to: "/post-work" },
    { key: "orders", to: "/user-orders" },
  ];

  const t = translations[lang] || translations.en;

  return (
    <NotificationProvider>
      <BrowserRouter>

        {/* Splash Screen */}
        {showSplash && (
          <div className="splash-screen">
            <div className="splash-content">
              <h1>LokArt</h1>
              <p>Gaon ki Shaan, Desh ki Pehchan</p>
            </div>
          </div>
        )}

        <div className="app-shell">

          {/* Header */}
          <Header
            navItems={navItems}
            t={t}
            lang={lang}
            setLang={setLang}
          />

          {/* Main Content */}
          <main>
            <Routes>

              {/* Public Pages */}
              <Route
                path="/"
                element={<Home t={t} />}
              />

              <Route
                path="/marketplace"
                element={<Marketplace t={t} />}
              />

              <Route
                path="/services"
                element={<Services t={t} />}
              />

              <Route
                path="/services/add-skill"
                element={<AddSkill />}
              />

              <Route
                path="/services/:service"
                element={<ServiceDetails />}
              />

              <Route
                path="/create-profile"
                element={<CreateProfile t={t} />}
              />

              <Route
                path="/find-work"
                element={<FindWork t={t} />}
              />

              {/* Login / Register */}
              <Route element={<PublicOnlyRoute />}>
                <Route
                  path="/login"
                  element={<Login t={t} />}
                />

                <Route
                  path="/register"
                  element={<Register t={t} />}
                />
              </Route>

              {/* Protected User Pages */}
              <Route element={<ProtectedRoute />}>

                <Route
                  path="/dashboard"
                  element={<Dashboard t={t} />}
                />

                <Route
                  path="/post-work"
                  element={<PostWork t={t} />}
                />

                <Route
                  path="/user-orders"
                  element={<UserOrders t={t} />}
                />

                <Route
                  path="/my-bookings"
                  element={<MyBookings />}
                />

                <Route
                  path="/orders"
                  element={<UserOrders t={t} />}
                />

              </Route>

                <Route
                  path="/sell-product"
                  element={<SellProduct t={t} />}
                />

              {/* Admin Login */}
              <Route
                path="/admin-login"
                element={<AdminLogin />}
              />

              {/* Admin Protected Area */}
              <Route element={<AdminRoute />}>

                <Route
                  path="/admin" element={<AdminDashboard />}
                />

              </Route>

              {/* Payment */}
              <Route
                path="/payment"
                element={<Payment />}
              />

              {/* Unknown URL */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Routes>
          </main>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            pauseOnFocusLoss={false}
            draggable
            limit={3}
            theme="light"
          />

          {/* Footer */}
          <Footer
            t={t}
            navItems={navItems}
          />

        </div>

      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;