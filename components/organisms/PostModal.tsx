"use client";

import { X } from "lucide-react";

import type { Post as PostType } from "@/types/post";
import type { Comment } from "@/types/comment";

import PostModalImage from "@/components/molecules/post-modal/PostModalImage";
import PostModalHeader from "@/components/molecules/post-modal/PostModalHeader";
import PostModalComments from "@/components/molecules/post-modal/PostModalComments";
import PostModalActions from "@/components/molecules/post-modal/PostModalActions";
import PostModalCommentForm from "@/components/molecules/post-modal/PostModalCommentForm";

type PostModalProps = {
  post: PostType;
  comments: Comment[];
  commentText: string;
  submittingComment: boolean;
  liked: boolean;
  saved: boolean;
  likes: number;
  onClose: () => void;
  onLike: () => void;
  onSave: () => void;
  onCommentTextChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PostModal({
  post,
  comments,
  commentText,
  submittingComment,
  liked,
  saved,
  likes,
  onClose,
  onLike,
  onSave,
  onCommentTextChange,
  onCommentSubmit,
}: PostModalProps) {
  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-[999] flex bg-black/80 text-white"
    >
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onClose}
        className="absolute right-5 top-5 z-50 rounded-full p-2 transition hover:bg-white/10"
        aria-label="Close post"
      >
        <X size={32} />
      </button>

      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="mx-auto flex h-screen w-full max-w-[1460px] items-center justify-center p-0 md:px-20 md:py-6"
      >
        <div className="flex h-full w-full flex-col overflow-hidden bg-black md:grid md:max-h-[900px] md:grid-cols-[minmax(0,1fr)_460px] md:rounded-sm">
          <PostModalImage post={post} />

          <aside className="flex min-h-0 flex-1 flex-col border-l-0 border-[#2f3336] bg-[#1f2024] md:border-l">
            <PostModalHeader post={post} />

            <PostModalComments post={post} comments={comments} />

            <PostModalActions
              post={post}
              liked={liked}
              saved={saved}
              likes={likes}
              onLike={onLike}
              onSave={onSave}
            />

            <PostModalCommentForm
              commentText={commentText}
              submittingComment={submittingComment}
              onCommentTextChange={onCommentTextChange}
              onCommentSubmit={onCommentSubmit}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}