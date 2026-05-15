import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  writeBatch,
  collectionGroup,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Post } from "@/types/post";

type CreatePostParams = {
  userId: string;
  username: string;
  userAvatar: string;
  caption: string;
  imageUrl: string;
};

import {
  limit,
} from "firebase/firestore";

export async function createPost({
  userId,
  username,
  userAvatar,
  caption,
  imageUrl,
}: CreatePostParams) {
  if (!db) throw new Error("Firestore is not initialized.");

  const postRef = await addDoc(collection(db, "posts"), {
    userId,
    username,
    userAvatar,
    caption,
    imageUrl,
    likesCount: 0,
    commentsCount: 0,
    savesCount: 0,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "posts", postRef.id), {
    id: postRef.id,
  });

  return postRef.id;
}

export async function getPosts(): Promise<Post[]> {
  if (!db) throw new Error("Firestore is not initialized.");

  const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      userId: data.userId,
      username: data.username,
      userAvatar: data.userAvatar,
      caption: data.caption,
      imageUrl: data.imageUrl,
      likesCount: data.likesCount ?? 0,
      commentsCount: data.commentsCount ?? 0,
      savesCount: data.savesCount ?? 0,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });
}

export async function hasUserLikedPost(postId: string, userId: string) {
  if (!db) throw new Error("Firestore is not initialized.");

  const likeRef = doc(db, "posts", postId, "likes", userId);
  const snapshot = await getDoc(likeRef);

  return snapshot.exists();
}

export async function togglePostLike({
  postId,
  userId,
  currentlyLiked,
}: {
  postId: string;
  userId: string;
  currentlyLiked: boolean;
}) {
  if (!db) throw new Error("Firestore is not initialized.");

  const postRef = doc(db, "posts", postId);
  const likeRef = doc(db, "posts", postId, "likes", userId);

  if (currentlyLiked) {
    await deleteDoc(likeRef);
    await updateDoc(postRef, {
      likesCount: increment(-1),
    });

    return false;
  }

  await setDoc(likeRef, {
    userId,
    createdAt: serverTimestamp(),
  });

  await updateDoc(postRef, {
    likesCount: increment(1),
  });

  return true;
}


import type { Comment } from "@/types/comment";

export async function addPostComment({
  postId,
  userId,
  username,
  userAvatar,
  text,
}: {
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
}) {
  if (!db) throw new Error("Firestore is not initialized.");

  const commentsRef = collection(db, "posts", postId, "comments");

  await addDoc(commentsRef, {
    postId,
    userId,
    username,
    userAvatar,
    text,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "posts", postId), {
    commentsCount: increment(1),
  });
}

export async function updateUserPostAuthorData({
  userId,
  username,
  userAvatar,
}: {
  userId: string;
  username: string;
  userAvatar: string;
}) {
  if (!db) throw new Error("Firestore is not initialized.");

  const postsQuery = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(postsQuery);

  const batch = writeBatch(db);

  snapshot.docs.forEach((postDoc) => {
    batch.update(doc(db, "posts", postDoc.id), {
      username,
      userAvatar,
    });
  });

  await batch.commit();
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  if (!db) throw new Error("Firestore is not initialized.");

  const commentsQuery = query(
    collection(db, "posts", postId, "comments"),
    orderBy("createdAt", "asc"),
    limit(20)
  );

  const snapshot = await getDocs(commentsQuery);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      postId,
      userId: data.userId,
      username: data.username,
      userAvatar: data.userAvatar,
      text: data.text,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });
}


export async function getPostsByUserId(userId: string): Promise<Post[]> {
  if (!db) throw new Error("Firestore is not initialized.");

  const postsQuery = query(
    collection(db, "posts"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(postsQuery);

  const posts = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      userId: data.userId,
      username: data.username,
      userAvatar: data.userAvatar,
      caption: data.caption,
      imageUrl: data.imageUrl,
      likesCount: data.likesCount ?? 0,
      commentsCount: data.commentsCount ?? 0,
      savesCount: data.savesCount ?? 0,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });

  return posts.sort((a, b) => {
    const aTime = a.createdAt?.getTime() ?? 0;
    const bTime = b.createdAt?.getTime() ?? 0;

    return bTime - aTime;
  });
}

export async function hasUserSavedPost(postId: string, userId: string) {
  if (!db) throw new Error("Firestore is not initialized.");

  const saveRef = doc(db, "users", userId, "savedPosts", postId);
  const snapshot = await getDoc(saveRef);

  return snapshot.exists();
}

export async function togglePostSave({
  postId,
  userId,
  currentlySaved,
}: {
  postId: string;
  userId: string;
  currentlySaved: boolean;
}) {
  if (!db) throw new Error("Firestore is not initialized.");

  const postRef = doc(db, "posts", postId);

  const userSaveRef = doc(db, "users", userId, "savedPosts", postId);
  const postSaveRef = doc(db, "posts", postId, "saves", userId);

  const batch = writeBatch(db);

  if (currentlySaved) {
    batch.delete(userSaveRef);
    batch.delete(postSaveRef);

    batch.update(postRef, {
      savesCount: increment(-1),
    });

    await batch.commit();
    return false;
  }

  batch.set(userSaveRef, {
    postId,
    userId,
    createdAt: serverTimestamp(),
  });

  batch.set(postSaveRef, {
    postId,
    userId,
    createdAt: serverTimestamp(),
  });

  batch.update(postRef, {
    savesCount: increment(1),
  });

  await batch.commit();
  return true;
}

export async function getSavedPostsByUserId(userId: string): Promise<Post[]> {
  if (!db) throw new Error("Firestore is not initialized.");

  const savedQuery = query(collection(db, "users", userId, "savedPosts"));

  const savedSnapshot = await getDocs(savedQuery);

  if (savedSnapshot.empty) {
    return [];
  }

  const posts = await Promise.all(
    savedSnapshot.docs.map(async (savedDoc) => {
      const data = savedDoc.data();
      const postId = data.postId || savedDoc.id;

      const postSnap = await getDoc(doc(db, "posts", postId));

      if (!postSnap.exists()) return null;

      const postData = postSnap.data();

      return {
        id: postSnap.id,
        userId: postData.userId,
        username: postData.username,
        userAvatar: postData.userAvatar,
        caption: postData.caption,
        imageUrl: postData.imageUrl,
        likesCount: postData.likesCount ?? 0,
        commentsCount: postData.commentsCount ?? 0,
        savesCount: postData.savesCount ?? 0,
        createdAt: postData.createdAt?.toDate?.() ?? null,
      } as Post;
    })
  );

  return posts
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => {
      const aTime = a.createdAt?.getTime() ?? 0;
      const bTime = b.createdAt?.getTime() ?? 0;

      return bTime - aTime;
    });
}