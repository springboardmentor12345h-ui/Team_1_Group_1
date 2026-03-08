import webpush from "web-push";

/*
========================================
🌐 WEB PUSH SERVICE
Handles browser push notification subscriptions
and sending push messages to users.

SETUP REQUIRED:
1. Run: npx web-push generate-vapid-keys
2. Add to .env:
   VAPID_PUBLIC_KEY=your_public_key
   VAPID_PRIVATE_KEY=your_private_key
   VAPID_EMAIL=mailto:your@email.com
========================================
*/

// Lazy initialization — only runs when actually needed
// This ensures .env is fully loaded before setVapidDetails is called
const getWebPush = () => {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || "mailto:admin@campuseventhub.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  return webpush;
};

/*
  sendPushNotification(subscription, payload)
  - subscription : the push subscription object stored in DB
  - payload      : { title, message, link }
*/
export const sendPushNotification = async (subscription, payload) => {
  if (!subscription) return;
  try {
    await getWebPush().sendNotification(
      subscription,
      JSON.stringify({
        title: payload.title,
        message: payload.message,
        link: payload.link || "/",
        icon: "/logo192.png",
      })
    );
  } catch (error) {
    // Subscription expired or invalid — caller should handle cleanup
    if (error.statusCode === 410) {
      console.warn("⚠️ Push subscription expired (410). Should be removed from DB.");
      throw error;
    }
    console.error("❌ Push notification failed:", error.message);
  }
};

/*
  getVapidPublicKey()
  Returns the public VAPID key to send to the frontend
  so it can subscribe to push notifications.
*/
export const getVapidPublicKey = () => process.env.VAPID_PUBLIC_KEY;