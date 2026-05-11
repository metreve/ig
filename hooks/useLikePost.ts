"use client";

import { useEffect, useState } from "react";

import { hasUserLikedPost, togglePostLike } from "@/lib/posts";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkLikeStatus() {
      if (!user) return;

      try {
        const userLiked = await hasUserLikedPost(postId, user.uid);
        setLiked(userLiked);
      } catch (error) {
        console.error("Failed to check like status:", error);
      }
    }

    checkLikeStatus();
  }, [postId, user]);

  async function toggleLike() {
    if (!user || loading) return;

    const previousLiked = liked;
    const previousLikes = likes;

    setLoading(true);

    // Optimistic UI update
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

      // Revert if Firebase fails
      setLiked(previousLiked);
      setLikes(previousLikes);
    } finally {
      setLoading(false);
    }
  }

  function toggleSave() {
    setSaved((value) => !value);
  }

  return {
    liked,
    saved,
    likes,
    toggleLike,
    toggleSave,
    loading,
  };
}