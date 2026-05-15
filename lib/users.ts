import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
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

import { deleteDoc, updateDoc } from "firebase/firestore";

type UpdateUserProfileParams = {
  uid: string;
  oldUsername: string;
  newUsername: string;
  displayName: string;
  bio: string;
  photoURL: string;
};

export async function updateUserProfile({
  uid,
  oldUsername,
  newUsername,
  displayName,
  bio,
  photoURL,
}: UpdateUserProfileParams) {
  if (!db) throw new Error("Firestore is not initialized.");

  const normalizedOldUsername = normalizeUsername(oldUsername);
  const normalizedNewUsername = normalizeUsername(newUsername);

  const userRef = doc(db, "users", uid);
  const oldUsernameRef = doc(db, "usernames", normalizedOldUsername);
  const newUsernameRef = doc(db, "usernames", normalizedNewUsername);

  if (normalizedOldUsername !== normalizedNewUsername) {
    const usernameSnap = await getDoc(newUsernameRef);

    if (usernameSnap.exists()) {
      throw new Error("username-taken");
    }
  }

  const batch = writeBatch(db);

  batch.update(userRef, {
    username: normalizedNewUsername,
    displayName,
    bio,
    photoURL,
    updatedAt: serverTimestamp(),
  });

  if (normalizedOldUsername !== normalizedNewUsername) {
    batch.delete(oldUsernameRef);

    batch.set(newUsernameRef, {
      uid,
      username: normalizedNewUsername,
      createdAt: serverTimestamp(),
    });
  }

  await batch.commit();
}

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

export async function getUserByUsername(username: string) {
  if (!db) throw new Error("Firestore is not initialized.");

  const normalizedUsername = normalizeUsername(username);

  const usernameRef = doc(db, "usernames", normalizedUsername);
  const usernameSnap = await getDoc(usernameRef);

  if (usernameSnap.exists()) {
    const usernameData = usernameSnap.data();

    if (usernameData.uid) {
      const userRef = doc(db, "users", usernameData.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        return {
          uid: data.uid,
          email: data.email,
          username: data.username,
          displayName: data.displayName,
          bio: data.bio,
          photoURL: data.photoURL,
          createdAt: data.createdAt?.toDate?.() ?? null,
        };
      }
    }
  }

  const usersQuery = query(
    collection(db, "users"),
    where("username", "==", normalizedUsername)
  );

  const usersSnapshot = await getDocs(usersQuery);

  if (usersSnapshot.empty) {
    return null;
  }

  const userDoc = usersSnapshot.docs[0];
  const data = userDoc.data();

  return {
    uid: data.uid,
    email: data.email,
    username: data.username,
    displayName: data.displayName,
    bio: data.bio,
    photoURL: data.photoURL,
    createdAt: data.createdAt?.toDate?.() ?? null,
  };
}