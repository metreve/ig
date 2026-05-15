import type { Post } from "@/types/post";

type ProfilePostGridProps = {
  posts: Post[];
};

export default function ProfilePostGrid({ posts }: ProfilePostGridProps) {
  return (
    <section className="mt-1 grid grid-cols-3 gap-[2px] md:gap-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900"
        >
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.caption || "Post"}
              className="h-full w-full object-cover transition hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
              No image
            </div>
          )}
        </div>
      ))}
    </section>
  );
}