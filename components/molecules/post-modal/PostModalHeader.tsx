import { MoreHorizontal } from "lucide-react";

import type { Post } from "@/types/post";

type PostModalHeaderProps = {
  post: Post;
};

export default function PostModalHeader({ post }: PostModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#2f3336] px-4 py-4">
      <div className="flex items-center gap-3">
        {post.userAvatar ? (
          <img
            src={post.userAvatar}
            alt={post.username}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
            {post.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="text-sm">
          <span className="font-bold">{post.username}</span>
          <span className="mx-1 text-zinc-400">•</span>
          <button className="font-bold text-[#8ab4ff]">Follow</button>
        </div>
      </div>

      <button className="rounded-full p-2 transition hover:bg-white/10">
        <MoreHorizontal size={22} />
      </button>
    </div>
  );
}