import type { Post } from "@/types/post";

type PostMediaProps = {
  post: Post;
  onDoubleClick: () => void;
};

export default function PostMedia({ post, onDoubleClick }: PostMediaProps) {
  if (!post.imageUrl) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-md bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-900">
        Image unavailable
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md">
      <img
        src={post.imageUrl}
        alt={post.caption || "Post"}
        onDoubleClick={onDoubleClick}
        className="aspect-square w-full object-cover sm:rounded-sm"
      />
    </div>
  );
}