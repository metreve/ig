"use client";

import { useEffect, useState } from "react";

import {
  hasUserLikedPost,
  hasUserSavedPost,
  togglePostLike,
  togglePostSave,
} from "@/lib/posts";
import { useAuthStore } from "@/store/auth.store";

type UseLikePostParams = {
  postId: string;
  initialLikes: number;
};

export function useLikePost({ postId, initialLikes }: UseLikePostParams) {
  const user = useAuthStore((state) => state.user);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const [likeLoading, setLikeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    async function loadPostStatus() {
      if (!user) return;

      try {
        const [userLiked, userSaved] = await Promise.all([
          hasUserLikedPost(postId, user.uid),
          hasUserSavedPost(postId, user.uid),
        ]);

        setLiked(userLiked);
        setSaved(userSaved);
      } catch (error) {
        console.error("Failed to load post status:", error);
      }
    }

    loadPostStatus();
  }, [postId, user]);

  async function toggleLike() {
    if (!user || likeLoading) return;

    const previousLiked = liked;
    const previousLikes = likes;

    setLikeLoading(true);
    setLiked(!previousLiked);
    setLikes((current) => current + (previousLiked ? -1 : 1));

    try {
      await togglePostLike({
        postId,
        userId: user.uid,
        currentlyLiked: previousLiked,
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);

      setLiked(previousLiked);
      setLikes(previousLikes);
    } finally {
      setLikeLoading(false);
    }
  }

  async function toggleSave() {
    if (!user || saveLoading) return;

    const previousSaved = saved;

    setSaveLoading(true);
    setSaved(!previousSaved);

    try {
      await togglePostSave({
        postId,
        userId: user.uid,
        currentlySaved: previousSaved,
      });
    } catch (error) {
      console.error("Failed to toggle save:", error);

      setSaved(previousSaved);
    } finally {
      setSaveLoading(false);
    }
  }

  return {
    liked,
    saved,
    likes,
    toggleLike,
    toggleSave,
    likeLoading,
    saveLoading,
  };
}