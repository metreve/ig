"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { stories } from "@/lib/mockData";
import { getUserProfile } from "@/lib/users";
import { useAuthStore } from "@/store/auth.store";

type StoryItem = {
  id: number | string;
  username: string;
  avatar: string;
  isYou?: boolean;
};

export default function StoriesTray() {
  const user = useAuthStore((state) => state.user);
  const trayRef = useRef<HTMLDivElement | null>(null);

  const [profileUsername, setProfileUsername] = useState("yourname");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const profile = await getUserProfile(user.uid);

      if (profile?.username) {
        setProfileUsername(profile.username);
      }

      if (profile?.photoURL) {
        setProfilePhotoURL(profile.photoURL);
      }
    }

    loadProfile();
  }, [user]);

  const storyItems: StoryItem[] = [
    {
      id: "you",
      username: profileUsername,
      avatar: profilePhotoURL,
      isYou: true,
    },
    ...stories.filter((story) => !story.isYou),
  ];

  function scrollStories(direction: "left" | "right") {
    trayRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative w-full">
      <button
        onClick={() => scrollStories("left")}
        className="absolute left-2 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 dark:bg-[#262a2f]"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={trayRef}
        className="flex gap-4 overflow-hidden px-10 py-4"
      >
        {storyItems.map((story) => (
          <div
            key={story.id}
            className="relative flex w-[74px] shrink-0 cursor-pointer flex-col items-center gap-1"
          >
            <div className="relative rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              {story.avatar ? (
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="h-[66px] w-[66px] rounded-full border-2 border-white object-cover dark:border-[#0c1014]"
                />
              ) : (
                <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-xl font-semibold text-zinc-700 dark:border-[#0c1014] dark:bg-zinc-700 dark:text-zinc-200">
                  {story.username.charAt(0).toUpperCase()}
                </div>
              )}

              {story.isYou && (
                <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#1877f2] text-xs font-bold text-white dark:border-[#0c1014]">
                  +
                </div>
              )}
            </div>

            <span className="max-w-[74px] truncate text-center text-xs">
              {story.isYou ? "Your story" : story.username}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollStories("right")}
        className="absolute right-2 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 dark:bg-[#262a2f]"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}