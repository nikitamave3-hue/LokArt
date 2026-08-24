import { useState, useEffect } from "react";
import "./postWork.css";

import { getPosts, savePosts } from "../utils/storage";
import useSyncStorage from "../hooks/useSyncStorage";

export default function PostWork({ t = {} }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  // LOAD POSTS FROM STORAGE
  const loadPosts = () => {
    setPosts(getPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // LIVE SYNC ACROSS PAGES
  useSyncStorage(loadPosts);

  // SUBMIT POST
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      time: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);
    savePosts(updatedPosts);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="postwork-container">

      {/* HEADER */}
      <h1>{t.postWorkTitle || "➕ Post Your Work"}</h1>
      {t.postWorkSubtitle && <p className="subheading">{t.postWorkSubtitle}</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="postwork-form">

        <input
          type="text"
          placeholder={t.postWorkTitlePlaceholder || "Work Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder={t.postWorkDescriptionPlaceholder || "Work Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">{t.postWorkSubmit || "Post Work"}</button>

      </form>

      {/* POSTS LIST */}
      <h2>{t.postWorkRecent || "📌 Recent Posts"}</h2>

      <div className="post-list">

        {posts.length === 0 ? (
          <p className="empty">{t.postWorkNoPosts || "No posts yet"}</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">

              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <small>🕒 {post.time}</small>

            </div>
          ))
        )}

      </div>

    </div>
  );
}