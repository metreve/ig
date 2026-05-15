"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import EditProfileForm from "@/components/molecules/Settings/EditProfileForm";
import SettingsSidebar from "@/components/molecules/Settings/SettingsSidebar";

import { getUserProfile, updateUserProfile } from "@/lib/users";
import { updateUserPostAuthorData } from "@/lib/posts";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { useAuthStore } from "@/store/auth.store";

type ProfileData = {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  photoURL: string;
};

export default function EditProfileClient() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (image) return URL.createObjectURL(image);
    return photoURL || "";
  }, [image, photoURL]);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setLoadingProfile(false);
        return;
      }

      try {
        const data = await getUserProfile(user.uid);

        if (!data) {
          setError("Profile not found.");
          return;
        }

        const profileData = data as ProfileData;

        setProfile(profileData);
        setDisplayName(profileData.displayName || "");
        setUsername(profileData.username || "");
        setBio(profileData.bio || "");
        setPhotoURL(profileData.photoURL || "");
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoadingProfile(false);
      }
    }

    loadProfile();
  }, [user]);

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

    if (!user || !profile) {
      setError("You must be logged in.");
      return;
    }

    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
      setError("Username cannot be empty.");
      return;
    }

    if (!displayName.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    if (!usernameRegex.test(normalizedUsername)) {
      setError(
        "Username can only contain letters, numbers, periods, and underscores.",
      );
      return;
    }

    if (normalizedUsername.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      let finalPhotoURL = photoURL;

      if (image) {
        finalPhotoURL = await uploadImageToCloudinary(image);
      }

      await updateUserProfile({
        uid: user.uid,
        oldUsername: profile.username,
        newUsername: normalizedUsername,
        displayName: displayName.trim(),
        bio: bio.trim(),
        photoURL: finalPhotoURL,
      });

      await updateUserPostAuthorData({
        userId: user.uid,
        username: normalizedUsername,
        userAvatar: finalPhotoURL,
      });

      router.push(`/profile/${normalizedUsername}`);
    } catch (err) {
      console.error("Failed to update profile:", err);

      if (err instanceof Error && err.message === "username-taken") {
        setError("That username is already taken.");
      } else {
        setError("Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loadingProfile) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-white text-black dark:bg-[#0c1014] dark:text-white md:pl-20">
        <p className="text-sm text-zinc-500">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-white text-black dark:bg-[#0c1014] dark:text-white md:pl-20">
      <div className="flex h-screen w-full">
        <SettingsSidebar />

        <section className="h-screen flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-[650px] xl:ml-[260px]">
            <h1 className="mb-8 text-2xl font-bold">Edit profile</h1>

            <EditProfileForm
              username={username}
              displayName={displayName}
              bio={bio}
              previewUrl={previewUrl}
              saving={saving}
              error={error}
              onUsernameChange={setUsername}
              onDisplayNameChange={setDisplayName}
              onBioChange={setBio}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </div>
    </main>
  );
}