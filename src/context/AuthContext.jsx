import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  firebaseAuth,
  isFirebaseConfigured,
  signInWithGooglePopup,
  signOutFromFirebase,
} from "../lib/firebase";

const AUTH_STORAGE_KEY = "questrazr-auth";

const defaultProfile = {
  fullName: "QuestRazr User",
  email: "demo@questrazr.app",
  headline: "Aspiring builder",
  location: "Hyderabad, India",
  bio: "Ready to learn, build, and grow step by step.",
};

const AuthContext = createContext(null);

function loadStoredAuth() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return { isAuthenticated: false, provider: null, profile: defaultProfile };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      isAuthenticated: Boolean(parsedValue.isAuthenticated),
      provider: parsedValue.provider ?? null,
      profile: { ...defaultProfile, ...(parsedValue.profile ?? {}) },
    };
  } catch {
    return { isAuthenticated: false, provider: null, profile: defaultProfile };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => loadStoredAuth());

  useEffect(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setAuthState((current) => ({
          isAuthenticated: true,
          provider: "google",
          profile: {
            ...defaultProfile,
            ...current.profile,
            fullName: user.displayName || current.profile.fullName,
            email: user.email || current.profile.email,
          },
        }));
        return;
      }

      setAuthState((current) =>
        current.provider === "google"
          ? { ...current, isAuthenticated: false, provider: null }
          : current,
      );
    });

    return unsubscribe;
  }, []);

  function signIn(payload = {}) {
    setAuthState((current) => ({
      isAuthenticated: true,
      provider: "local",
      profile: {
        ...defaultProfile,
        ...current.profile,
        ...payload,
      },
    }));
  }

  async function signOut() {
    if (authState.provider === "google") {
      await signOutFromFirebase();
    }

    setAuthState((current) => ({
      ...current,
      isAuthenticated: false,
      provider: null,
    }));
  }

  async function signInWithGoogle() {
    const result = await signInWithGooglePopup();
    const user = result.user;

    setAuthState((current) => ({
      isAuthenticated: true,
      provider: "google",
      profile: {
        ...defaultProfile,
        ...current.profile,
        fullName: user.displayName || current.profile.fullName,
        email: user.email || current.profile.email,
      },
    }));

    return result;
  }

  function updateProfile(updates) {
    setAuthState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        ...updates,
      },
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        isGoogleAuthAvailable: isFirebaseConfigured,
        profile: authState.profile,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
