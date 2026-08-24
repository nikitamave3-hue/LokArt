import "../styles/notification.css";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell({ onClick }) {
  const { notifications } = useNotification();

  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const handleClick = () => {
    setOpen((prev) => !prev);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="notification-wrapper">
      <button
        type="button"
        className="notification-bell"
        onClick={handleClick}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <FaBell size={22} />

        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount}
          </span>
        )}
      </button>

      {open && <NotificationDropdown />}
    </div>
  );
}

export default NotificationBell;