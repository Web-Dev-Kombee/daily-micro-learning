import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { ref, set, get, child } from "firebase/database";
import { User } from "../types";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  updateUserProfile: (profile: User) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth State Changed:", {
        user: user ? { uid: user.uid, email: user.email } : null,
        isAuthenticated: !!user,
      });

      try {
        if (user) {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserProfile(snapshot.val() as User);
          } else {
            const initialProfile: User = {
              id: user.uid,
              email: user.email || "",
              displayName: user.displayName || "",
              selectedTopics: [],
              reminderTime: "",
              streak: 0,
              lastLoginDate: new Date(),
              preferences: {
                darkMode: false,
                notifications: true,
              },
            };

            await set(userRef, initialProfile);
            setUserProfile(initialProfile);
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    // Implement sign in logic
    await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(auth.currentUser);
  };

  const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
    setCurrentUser(auth.currentUser);
  };

  const signUp = async (email: string, password: string) => {
    // Implement sign up logic
    await createUserWithEmailAndPassword(auth, email, password);
    setCurrentUser(auth.currentUser);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const updateUserProfile = async (profile: User) => {
    if (!currentUser) {
      throw new Error("No authenticated user to update profile for.");
    }

    try {
      await set(ref(db, `users/${currentUser.uid}`), {
        ...profile,
        lastUpdated: new Date().toISOString(),
      });
      setUserProfile(profile);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signIn,
    signOut,
    signUp,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
