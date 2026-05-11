"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";

import { createPost } from "@/lib/posts";
import { useAuthStore } from "@/store/auth.store";

export default function CreatePostClient() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidImageUrl(url: string) {
    try {
      const parsedUrl = new URL(url);

      return (
        parsedUrl.protocol === "https:" &&
        /\.(jpg|jpeg|png|webp|gif)$/i.test(parsedUrl.pathname)
      );
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    if (!imageUrl.trim()) {
      setError("Please enter an image URL.");
      return;
    }

    if (!isValidImageUrl(imageUrl.trim())) {
      setError("Please enter a valid HTTPS image URL ending in .jpg, .png, .webp, or .gif.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createPost({
        userId: user.uid,
        username: user.displayName || user.email?.split("@")[0] || "user",
        userAvatar: user.photoURL || "",
        caption,
        imageUrl: imageUrl.trim(),
      });

      router.push("/feed");
    } catch (err) {
      console.error(err);
      setError("Could not create post. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full justify-center px-4 pb-20 pt-8 md:pb-8 md:pl-20">
      <div className="w-full max-w-[600px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create new post</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Paste an image URL and add a caption.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111820]"
        >
          <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <h2 className="text-sm font-semibold">Post details</h2>
          </div>

          <div className="p-5">
            {!imageUrl ? (
              <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-center dark:border-zinc-700 dark:bg-[#0c1014]">
                <ImagePlus size={42} className="mb-3 text-zinc-500" />

                <span className="text-sm font-semibold">
                  Paste an image URL below
                </span>

                <span className="mt-1 text-xs text-zinc-500">
                  JPG, PNG, WEBP, or GIF
                </span>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl bg-black">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="aspect-square w-full object-cover"
                  onError={() => setError("Image preview failed. Try another image URL.")}
                />
              </div>
            )}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Image URL
              </label>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setError("");
                }}
                placeholder="https://example.com/image.jpg"
                className="h-11 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-700 dark:bg-[#0c1014]"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">
                Caption
              </label>

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                maxLength={2200}
                className="min-h-[120px] w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 dark:border-zinc-700 dark:bg-[#0c1014]"
              />

              <div className="mt-1 text-right text-xs text-zinc-500">
                {caption.length}/2200
              </div>
            </div>

            {error && (
              <p className="mt-4 text-center text-sm font-semibold text-red-500">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1877f2] text-sm font-bold text-white transition hover:bg-[#2d8cff] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}