import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.nav}>

      <h2 style={styles.logo}>📦 LokArt</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/post-work">Post Work</Link>
        <Link to="/messages">Messages</Link>
      </div>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#111",
    color: "white",
    alignItems: "center"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px"
  }
};