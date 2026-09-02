import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Dashboard({ t = {} }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("lokart_posts")) || [];
    const savedMessages = JSON.parse(localStorage.getItem("lokart_messages")) || [];

    setPosts(savedPosts);
    setMessages(savedMessages);
  }, []);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>{t.dashboardTitle || "📊 LokArt Control Center"}</h1>
        <p>{t.dashboardSubtitle || "Manage your platform activity in one place"}</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h2>{posts.length}</h2>
          <p>{t.totalPostsLabel || "📌 Total Posts"}</p>
        </div>

        <div className="stat-card">
          <h2>{messages.length}</h2>
          <p>{t.messagesLabel || "💬 Messages"}</p>
        </div>

        <div className="stat-card">
          <h2>{posts.length + messages.length}</h2>
          <p>{t.activityLabel || "⚡ Activity"}</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="section">

        <h2>{t.quickActionsTitle || "⚡ Quick Actions"}</h2>

        <div className="action-grid">
          <button className="action-btn" onClick={() => navigate("/post-work")}>{t.actionPostWork || "➕ Post Work"}</button>
          <button className="action-btn" onClick={() => navigate("/sell-product")}>{t.actionSellProduct || "🛒 Sell Product"}</button>
          <button className="action-btn" onClick={() => navigate("/find-work")}>{t.actionFindWorker || "👷 Find Worker"}</button>
          <WhatsAppButton />
        </div>

      </div>

      {/* POSTS PREVIEW */}
      <div className="section">

        <h2>{t.recentPostsTitle || "📌 Recent Posts"}</h2>

        {posts.length === 0 ? (
          <p className="empty">{t.noPostsYet || "No posts yet"}</p>
        ) : (
          posts.slice(0, 3).map((post) => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))
        )}

      </div>

      {/* MESSAGES PREVIEW */}
      <div className="section">

        <h2>{t.recentMessagesTitle || "💬 Recent Messages"}</h2>

        {messages.length === 0 ? (
          <p className="empty">{t.noMessagesYet || "No messages yet"}</p>
        ) : (
          messages.slice(-3).map((msg) => (
            <div key={msg.id} className="card">
              <p>{msg.text}</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}// test change
