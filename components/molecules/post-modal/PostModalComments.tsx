import { Heart } from "lucide-react";

import type { Post } from "@/types/post";
import type { Comment } from "@/types/comment";
import { formatPostTime } from "./postModalUtils";

type PostModalCommentsProps = {
  post: Post;
  comments: Comment[];
};

export default function PostModalComments({
  post,
  comments,
}: PostModalCommentsProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
      {post.caption && (
        <div className="mb-5 flex gap-3">
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

          <div className="text-sm leading-relaxed">
            <span className="mr-2 font-bold">{post.username}</span>
            <span>{post.caption}</span>

            <div className="mt-2 text-xs text-zinc-400">
              {formatPostTime(post.createdAt)}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {comment.userAvatar ? (
              <img
                src={comment.userAvatar}
                alt={comment.username}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
                {comment.username.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-sm">
              <span className="mr-2 font-bold">{comment.username}</span>
              <span>{comment.text}</span>

              <div className="mt-2 flex gap-3 text-xs font-semibold text-zinc-400">
                <span>{formatPostTime(comment.createdAt)}</span>
                <button>Reply</button>
              </div>
            </div>

            <button className="text-zinc-400 transition hover:text-white">
              <Heart size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}