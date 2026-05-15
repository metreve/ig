"use client";

import { useEffect, useState } from "react";

import PostModal from "@/components/organisms/PostModal";
import PostHeader from "@/components/molecules/Post/PostHeader";
import PostMedia from "@/components/molecules/Post/PostMedia";
import PostActions from "@/components/molecules/Post/PostActions";
import PostCaption from "@/components/molecules/Post/PostCaption";
import PostCommentsPreview from "@/components/molecules/Post/PostCommentsPreview";
import PostCommentForm from "@/components/molecules/Post/PostCommentForm";

import { useLikePost } from "@/hooks/useLikePost";
import { addPostComment, getPostComments } from "@/lib/posts";
import { useAuthStore } from "@/store/auth.store";
import type { Post as PostType } from "@/types/post";
import type { Comment } from "@/types/comment";

export default function Post({ post }: { post: PostType }) {
  const { liked, saved, likes, toggleLike, toggleSave } = useLikePost({
    postId: post.id,
    initialLikes: post.likesCount,
  });

  const user = useAuthStore((state) => state.user);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadComments() {
      try {
        const fetchedComments = await getPostComments(post.id);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    }

    loadComments();
  }, [post.id]);

  async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user || !commentText.trim() || submittingComment) return;

    const newCommentText = commentText.trim();
    const fallbackUsername = user.displayName || user.email?.split("@")[0] || "user";
    const fallbackAvatar = user.photoURL || "";

    try {
      setSubmittingComment(true);

      await addPostComment({
        postId: post.id,
        userId: user.uid,
        username: fallbackUsername,
        userAvatar: fallbackAvatar,
        text: newCommentText,
      });

      setComments((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          postId: post.id,
          userId: user.uid,
          username: fallbackUsername,
          userAvatar: fallbackAvatar,
          text: newCommentText,
          createdAt: new Date(),
        },
      ]);

      setCommentText("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  }

  return (
    <article className="w-full border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <PostHeader post={post} />

      <PostMedia post={post} onDoubleClick={toggleLike} />

      <PostActions
        liked={liked}
        saved={saved}
        onLike={toggleLike}
        onSave={toggleSave}
        onCommentOpen={() => setModalOpen(true)}
      />

      <PostCaption post={post} likes={likes} />

      <PostCommentsPreview
        comments={comments}
        onOpenComments={() => setModalOpen(true)}
      />

      <PostCommentForm
        commentText={commentText}
        submittingComment={submittingComment}
        onCommentTextChange={setCommentText}
        onCommentSubmit={handleCommentSubmit}
      />

      {modalOpen && (
        <PostModal
          post={post}
          comments={comments}
          commentText={commentText}
          submittingComment={submittingComment}
          liked={liked}
          saved={saved}
          likes={likes}
          onClose={() => setModalOpen(false)}
          onLike={toggleLike}
          onSave={toggleSave}
          onCommentTextChange={setCommentText}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </article>
  );
}