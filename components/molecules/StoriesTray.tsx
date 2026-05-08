"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { stories } from "../../lib/mockData";
import { cn } from "../../lib/utils";

export default function StoriesTray() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
  };

  const scrollStories = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative mb-4 w-full max-w-[630px] px-3 py-4 sm:px-4">
      {canScrollLeft && (
        <button
          onClick={() => scrollStories("left")}
          className="absolute left-5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 transition hover:scale-105 dark:bg-zinc-900 dark:ring-zinc-700"
          aria-label="Scroll stories left"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full gap-4 overflow-x-hidden scroll-smooth"
      >
        {stories.map((story) => (
          <button
            key={story.id}
            className="group flex shrink-0 flex-col items-center gap-2"
          >
            <div
              className={cn(
                "relative flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]",
                story.isYou && "bg-zinc-300 dark:bg-zinc-700",
              )}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#0c1014]">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="h-[74px] w-[74px] rounded-full object-cover"
                />
              </div>

              {story.isYou && (
                <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-xs text-white dark:border-black">
                  +
                </div>
              )}
            </div>

            <span className="max-w-[74px] truncate text-xs text-black dark:text-white">
              {story.username}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollStories("right")}
        className="absolute right-5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-200 transition hover:scale-105 dark:bg-zinc-900 dark:ring-zinc-700"
        aria-label="Scroll stories right"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
