import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";



import { auth } from "./firebase";
import {
  createUserProfile,
  getEmailByUsername,
  isUsernameTaken,
  normalizeUsername,
} from "./users";


type RegisterParams = {
  email: string;
  password: string;
  username: string;
  displayName: string;
  birthday?: {
    month: string;
    day: string;
    year: string;
  };
};

type LoginParams = {
  identifier: string;
  password: string;
};

export async function registerUser({
  email,
  password,
  username,
  displayName,
  birthday,
}: RegisterParams) {
  const normalizedUsername = normalizeUsername(username);

  const usernameTaken = await isUsernameTaken(normalizedUsername);

  if (usernameTaken) {
    throw new Error("username-taken");
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserProfile({
    uid: credential.user.uid,
    email,
    username: normalizedUsername,
    displayName,
    birthday,
  });

  return credential.user;
}

export async function loginUser({ identifier, password }: LoginParams) {
  const trimmedIdentifier = identifier.trim();

  const emailToUse = trimmedIdentifier.includes("@")
    ? trimmedIdentifier
    : await getEmailByUsername(trimmedIdentifier);

  if (!emailToUse) {
    throw new Error("user-not-found");
  }

  const credential = await signInWithEmailAndPassword(
    auth,
    emailToUse,
    password
  );

  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}