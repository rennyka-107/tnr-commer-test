import LocalStorage from 'utils/LocalStorage';
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setNotification } from "../../store/notificationSlice";
import { store } from "../../store/store";

const firebaseConfig = {
  apiKey: "AIzaSyCBFln3YtKH_EruTFHeQN2iSE686DJWsT8",
  authDomain: "tnr-notification-service-853e0.firebaseapp.com",
  projectId: "tnr-notification-service-853e0",
  storageBucket: "tnr-notification-service-853e0.appspot.com",
  messagingSenderId: "1001041679463",
  appId: "1:1001041679463:web:d0fdd2fc178aa51d85f0c2",
  measurementId: "G-CVN2TGF3VM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();
const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const token = await LocalStorage.get("fcm_token");
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
            console.log(currentToken, "current token")
            LocalStorage.set("fcm_token", currentToken);
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
