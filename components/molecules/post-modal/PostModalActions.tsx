import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Post } from "@/types/post";
import { formatPostTime } from "./postModalUtils";

type PostModalActionsProps = {
  post: Post;
  liked: boolean;
  saved: boolean;
  likes: number;
  onLike: () => void;
  onSave: () => void;
};

export default function PostModalActions({
  post,
  liked,
  saved,
  likes,
  onLike,
  onSave,
}: PostModalActionsProps) {
  return (
    <div className="border-t border-[#2f3336] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onLike} className="transition hover:scale-110">
            <Heart
              size={26}
              className={cn(
                "transition",
                liked && "fill-red-500 text-red-500",
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

        <button onClick={onSave} className="transition hover:scale-110">
          <Bookmark size={26} className={cn(saved && "fill-current")} />
        </button>
      </div>

      <div className="mt-3 text-sm font-bold">
        {likes.toLocaleString()} likes
      </div>

      <div className="mt-1 text-xs text-zinc-400">
        {formatPostTime(post.createdAt)} ago
      </div>
    </div>
  );
}