"use client";

import { useEffect, useState } from "react";

import StoriesTray from "../molecules/StoriesTray";
import Post from "./Post";
import { getPosts } from "@/lib/posts";
import type { Post as PostType } from "@/types/post";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <main className="flex w-full justify-center pb-[70px] md:pb-0 md:pl-20">
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-[630px] border-b border-zinc-200 px-2 dark:border-zinc-800 md:border-b-0 md:px-0">
          <StoriesTray />
        </div>

        <div className="flex w-full max-w-full flex-col gap-6 px-3 sm:max-w-[470px] sm:px-0">
          {loading ? (
            <p className="py-10 text-center text-sm text-zinc-500">
              Loading posts...
            </p>
          ) : posts.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-500">
              No posts yet. Create one first.
            </p>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
          )}
        </div>
      </div>
    </main>
  );
}