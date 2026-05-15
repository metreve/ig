import type { Post } from "@/types/post";

type PostCaptionProps = {
  post: Post;
  likes: number;
};

export default function PostCaption({ post, likes }: PostCaptionProps) {
  return (
    <>
      <div className="mt-3 text-sm font-semibold">
        {likes.toLocaleString()} likes
      </div>

      {post.caption && (
        <div className="mt-2 text-sm">
          <span className="mr-2 font-semibold">{post.username}</span>
          <span>{post.caption}</span>
        </div>
      )}
    </>
  );
}