import { useNotification } from "../context/NotificationContext";

function NotificationDropdown() {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    enableNotifications,
  } = useNotification();

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications</h3>

        <button
          type="button"
          onClick={enableNotifications}
        >
          Enable Notifications
        </button>

        {notifications.some((item) => !item.read) && (
          <button
            type="button"
            onClick={markAllAsRead}
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="notification-empty">
          No notifications
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-item ${
              item.read ? "read" : "unread"
            }`}
          >
            <h4>{item.title}</h4>

            <p>{item.message}</p>

            <small>{item.time}</small>

            <div className="notification-actions">
              {!item.read && (
                <button
                  type="button"
                  onClick={() => markAsRead(item.id)}
                >
                  Read
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteNotification(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationDropdown;