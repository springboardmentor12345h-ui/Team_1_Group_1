/*
========================================
🔧 SERVICE WORKER — sw.js
Place this file in: frontend/public/sw.js

Handles background browser push notifications
even when the tab is closed.
========================================
*/

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = {
      title: "CampusEventHub",
      message: event.data.text(),
      link: "/",
    };
  }

  const options = {
    body: payload.message,
    icon: payload.icon || "/logo192.png",
    badge: "/logo192.png",
    data: { link: payload.link || "/" },
    vibrate: [100, 50, 100],
    actions: [
      { action: "view", title: "View" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const link = event.notification.data?.link || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus();
            client.navigate(link);
            return;
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(link);
        }
      })
  );
});
