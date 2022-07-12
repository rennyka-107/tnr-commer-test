import useNotification from "hooks/useNotification";
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setNotification } from "../../store/notificationSlice";
import { store } from "../../store/store";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();
const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      const dispatch = store.dispatch as Function;
      dispatch(setNotification(payload));
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            localforage.setItem("fcm_token", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "NOTIFICACION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICACIONAn error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
