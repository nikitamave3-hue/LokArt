import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  requestNotificationPermission,
  listenForForegroundMessages,
} from "../firebaseNotifications";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to LokArt 🎉",
      message: "Your account is ready.",
      read: false,
      time: "Just now",
    },
  ]);

  useEffect(() => {
    const unsubscribe = listenForForegroundMessages((payload) => {
      const title =
        payload.notification?.title || "LokArt Notification";

      const message =
        payload.notification?.body ||
        "You have a new notification.";

      addNotification(title, message, "info");
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const enableNotifications = async () => {
    const token = await requestNotificationPermission();

    if (token) {
      console.log("LOKART FCM TOKEN:", token);
      toast.success("Notifications enabled successfully!");
    }

    return token;
  };

  const addNotification = (
    title,
    message,
    type = "success"
  ) => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      read: false,
      time: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [
      newNotification,
      ...prev,
    ]);

    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      toast.info(message);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        enableNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
};

