"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CreatePostForm from "@/components/molecules/create-post/CreatePostForm";

import { getUserProfile } from "@/lib/users";
import { createPost } from "@/lib/posts";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { useAuthStore } from "@/store/auth.store";

export default function CreatePostClient() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [profileUsername, setProfileUsername] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const profile = await getUserProfile(user.uid);

        if (profile?.username) {
          setProfileUsername(profile.username);
        }

        if (profile?.photoURL) {
          setProfilePhotoURL(profile.photoURL);
        }
      } catch (error) {
        console.error("Failed to load create profile:", error);
      }
    }

    loadProfile();
  }, [user]);

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  function handleImageChange(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setImage(file);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    if (!image) {
      setError("Please choose an image.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const imageUrl = await uploadImageToCloudinary(image);

      await createPost({
        userId: user.uid,
        username: profileUsername || user.email?.split("@")[0] || "user",
        userAvatar: profilePhotoURL || "",
        caption,
        imageUrl,
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
            Upload a photo and add a caption.
          </p>
        </div>

        <CreatePostForm
          caption={caption}
          previewUrl={previewUrl}
          loading={loading}
          error={error}
          onCaptionChange={setCaption}
          onImageChange={handleImageChange}
          onImageRemove={() => setImage(null)}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}