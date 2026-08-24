import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("lokartUser");
    localStorage.removeItem("token");

    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout} style={styles.btn}>
      🚪 Logout
    </button>
  );
}

const styles = {
  btn: {
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};