import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdYLhT91KvCjiX2iNO92f9b2ihCq0nY4c",
  authDomain: "job-finder-app-69d39.firebaseapp.com",
  projectId: "job-finder-app-69d39",
  storageBucket: "job-finder-app-69d39.appspot.com",
  messagingSenderId: "514652286441",
  appId: "1:514652286441:web:c0f3f58c0d24ca6852af78",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
