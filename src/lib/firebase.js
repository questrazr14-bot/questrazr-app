import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let authInstance = null;
let googleProviderInstance = null;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  googleProviderInstance = new GoogleAuthProvider();
}

export const firebaseAuth = authInstance;

export async function signInWithGooglePopup() {
  if (!authInstance || !googleProviderInstance) {
    throw new Error("Firebase Google auth is not configured yet.");
  }

  return signInWithPopup(authInstance, googleProviderInstance);
}

export async function signOutFromFirebase() {
  if (!authInstance) {
    return;
  }

  await signOut(authInstance);
}
