import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "./firebase";

type Birthday = {
  month: string;
  day: string;
  year: string;
};

type CreateUserProfileParams = {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  birthday?: Birthday;
};

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export async function isUsernameTaken(username: string) {
  const normalizedUsername = normalizeUsername(username);
  const usernameRef = doc(db, "usernames", normalizedUsername);
  const snapshot = await getDoc(usernameRef);

  return snapshot.exists();
}

export async function createUserProfile({
  uid,
  email,
  username,
  displayName,
  birthday,
}: CreateUserProfileParams) {
  const normalizedUsername = normalizeUsername(username);

  const userRef = doc(db, "users", uid);
  const usernameRef = doc(db, "usernames", normalizedUsername);

  const batch = writeBatch(db);

  batch.set(userRef, {
    uid,
    email,
    username: normalizedUsername,
    displayName,
    bio: "",
    photoURL: "",
    birthday: birthday ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  batch.set(usernameRef, {
    uid,
    username: normalizedUsername,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function getEmailByUsername(username: string) {
  const normalizedUsername = normalizeUsername(username);
  const usernameRef = doc(db, "usernames", normalizedUsername);
  const snapshot = await getDoc(usernameRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  if (!data.uid) {
    return null;
  }

  const userRef = doc(db, "users", data.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  const userData = userSnapshot.data();

  return userData.email as string;
}