"use client";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

import { useLikePost } from "../../hooks/useLikePost";
import type { Post as PostType } from "../../types/post";
import { cn } from "../../lib/utils";



export default function Post({ post }: { post: PostType }) {
  const {
    liked,
    saved,
    likes,
    toggleLike,
    toggleSave,
  } = useLikePost(post.likes);

  return (
    <article className="w-full border-zinc-200 pb-6 dark:border-zinc-800">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            <img
              src={post.avatar}
              alt={post.username}
              className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-black"
            />
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold">
              {post.username}
            </span>

            <span className="text-zinc-500">•</span>

            <span className="text-zinc-500">
              {post.timeAgo}
            </span>
          </div>
        </div>

        <button className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-hidden rounded-md">
        <img
          src={post.image}
          alt="Post"
          onDoubleClick={toggleLike}
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className="transition hover:scale-110"
          >
            <Heart
              size={26}
              className={cn(
                "transition",
                liked && "fill-red-500 text-red-500"
              )}
            />
          </button>

          <button className="transition hover:scale-110">
            <MessageCircle size={26} />
          </button>

          <button className="transition hover:scale-110">
            <Send size={26} />
          </button>
        </div>

        <button
          onClick={toggleSave}
          className="transition hover:scale-110"
        >
          <Bookmark
            size={26}
            className={cn(
              saved && "fill-white"
            )}
          />
        </button>
      </div>

      <div className="mt-3 text-sm font-semibold">
        {likes.toLocaleString()} likes
      </div>

      <div className="mt-2 text-sm">
        <span className="mr-2 font-semibold">
          {post.username}
        </span>

        <span>{post.caption}</span>
      </div>

      <button className="mt-2 text-sm text-zinc-500">
        View all {post.comments} comments
      </button>
    </article>
  );
}