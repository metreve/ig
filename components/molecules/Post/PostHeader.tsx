import { MoreHorizontal } from "lucide-react";

import type { Post } from "@/types/post";
import { formatPostTime } from "./postUtils";

type PostHeaderProps = {
  post: Post;
};

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {post.userAvatar ? (
          <img
            src={post.userAvatar}
            alt={post.username}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            {post.username.charAt(0).toUpperCase()}
          </div>
        )}

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
  );
}