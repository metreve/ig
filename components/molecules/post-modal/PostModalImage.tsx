import type { Post } from "@/types/post";

type PostModalImageProps = {
  post: Post;
};

export default function PostModalImage({ post }: PostModalImageProps) {
  return (
    <div className="flex h-[45vh] items-center justify-center bg-black md:h-auto">
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.caption || "Post"}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
          Image unavailable
        </div>
      )}
    </div>
  );
}