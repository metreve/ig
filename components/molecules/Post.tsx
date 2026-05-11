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

function formatPostTime(date: Date | null) {
  if (!date) return "now";

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  return `${days}d`;
}

export default function Post({ post }: { post: PostType }) {
  const { liked, saved, likes, toggleLike, toggleSave } = useLikePost({
  postId: post.id,
  initialLikes: post.likesCount,
});

  return (
    <article className="w-full border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
            {post.userAvatar ? (
              <img
                src={post.userAvatar}
                alt={post.username}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-[#0c1014]"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-xs font-bold text-zinc-700 dark:border-[#0c1014] dark:bg-zinc-700 dark:text-zinc-200">
                {post.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold">{post.username}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-500">
              {formatPostTime(post.createdAt)}
            </span>
          </div>
        </div>

        <button className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-[#161b22]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="overflow-hidden rounded-md">
        <img
          src={post.imageUrl}
          alt="Post"
          onDoubleClick={toggleLike}
          className="aspect-square w-full rounded-sm object-cover"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="transition hover:scale-110">
            <Heart
              size={26}
              className={cn("transition", liked && "fill-red-500 text-red-500")}
            />
          </button>

          <button className="transition hover:scale-110">
            <MessageCircle size={26} />
          </button>

          <button className="transition hover:scale-110">
            <Send size={26} />
          </button>
        </div>

        <button onClick={toggleSave} className="transition hover:scale-110">
          <Bookmark size={26} className={cn(saved && "fill-current")} />
        </button>
      </div>

      <div className="mt-3 text-sm font-semibold">
        {likes.toLocaleString()} likes
      </div>

      {post.caption && (
        <div className="mt-2 text-sm">
          <span className="mr-2 font-semibold">{post.username}</span>
          <span>{post.caption}</span>
        </div>
      )}

      <button className="mt-2 text-sm text-zinc-500">
        View all {post.commentsCount} comments
      </button>
    </article>
  );
}