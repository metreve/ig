"use client";

import { useState } from "react";

export function useLikePost(initialLikes: number) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleSave = () => {
    setSaved((prev) => !prev);
  };

  return {
    liked,
    saved,
    likes,
    toggleLike,
    toggleSave,
  };
}