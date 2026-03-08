import { BASE_URL } from "./api";

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/*
========================================
🔔 NOTIFICATION API CALLS
========================================
*/

// Fetch all notifications + unread count
export const fetchNotifications = async () => {
  const res = await fetch(`${BASE_URL}/api/notifications`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json(); // { notifications, unreadCount }
};

// Mark single notification as read
export const markNotificationRead = async (id) => {
  const res = await fetch(`${BASE_URL}/api/notifications/${id}/read`, {
    method: "PUT",
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json();
};

// Mark all notifications as read
export const markAllNotificationsRead = async () => {
  const res = await fetch(`${BASE_URL}/api/notifications/read-all`, {
    method: "PUT",
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to mark all as read");
  return res.json();
};

// Delete a notification
export const deleteNotificationById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/notifications/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete notification");
  return res.json();
};

// Get VAPID public key for browser push setup
export const fetchVapidPublicKey = async () => {
  const res = await fetch(`${BASE_URL}/api/notifications/vapid-public-key`);
  if (!res.ok) throw new Error("Failed to fetch VAPID key");
  const data = await res.json();
  return data.vapidPublicKey;
};

// Save browser push subscription to backend
export const savePushSubscription = async (subscription) => {
  const res = await fetch(`${BASE_URL}/api/notifications/subscribe`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ subscription }),
  });
  if (!res.ok) throw new Error("Failed to save push subscription");
  return res.json();
};

/*
========================================
🌐 BROWSER PUSH NOTIFICATION SETUP
========================================
*/
export const setupBrowserPush = async () => {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("⚠️ Browser push not supported");
      return false;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("⚠️ Push notification permission denied");
      return false;
    }

    const vapidPublicKey = await fetchVapidPublicKey();
    if (!vapidPublicKey) return false;

    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    await savePushSubscription(subscription);
    console.log("✅ Browser push notifications enabled");
    return true;
  } catch (error) {
    console.error("❌ Browser push setup failed:", error.message);
    return false;
  }
};

// Helper: convert base64 VAPID key to Uint8Array
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};
