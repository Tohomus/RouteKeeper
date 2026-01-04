import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/* Create user profile */
export const createUserProfile = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;

    await setDoc(userRef, {
      email,
      ...additionalData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

/* Get user profile */
export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};

/* Update user profile */
export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(
    userRef,
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
};
