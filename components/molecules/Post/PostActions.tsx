import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";

import { cn } from "@/lib/utils";

type PostActionsProps = {
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
  onCommentOpen: () => void;
};

export default function PostActions({
  liked,
  saved,
  onLike,
  onSave,
  onCommentOpen,
}: PostActionsProps) {
  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onLike} className="transition hover:scale-110">
          <Heart
            size={26}
            className={cn("transition", liked && "fill-red-500 text-red-500")}
          />
        </button>

        <button onClick={onCommentOpen} className="transition hover:scale-110">
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
  );
}