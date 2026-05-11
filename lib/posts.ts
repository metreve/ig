
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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

export async function createPost({
  userId,
  username,
  userAvatar,
  caption,
  imageUrl,
}: CreatePostParams) {
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
  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

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