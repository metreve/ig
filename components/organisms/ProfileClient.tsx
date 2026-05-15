"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProfileHeader from "@/components/molecules/Profile/ProfileHeader";
import ProfileTabs from "@/components/molecules/Profile/ProfileTabs";
import ProfilePostGrid from "@/components/molecules/Profile/ProfilePostGrid";
import ProfileEmptyState from "@/components/molecules/Profile/ProfileEmptyState";

import { getUserByUsername } from "@/lib/users";
import { getPostsByUserId, getSavedPostsByUserId } from "@/lib/posts";
import { useAuthStore } from "@/store/auth.store";
import type { Post } from "@/types/post";
import type { ProfileTab, ProfileUser } from "@/types/profile";

export default function ProfileClient({ username }: { username: string }) {
  const authUser = useAuthStore((state) => state.user);

  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
  const [loading, setLoading] = useState(true);

  const isOwnProfile = authUser?.uid === profile?.uid;

  const visiblePosts =
    activeTab === "posts" ? posts : activeTab === "saved" ? savedPosts : [];

  async function loadSavedPosts() {
    if (!profile || !authUser || authUser.uid !== profile.uid) return;

    try {
      const fetchedSavedPosts = await getSavedPostsByUserId(profile.uid);
      setSavedPosts(fetchedSavedPosts);
    } catch (error) {
      console.error("Failed to load saved posts:", error);
    }
  }

  useEffect(() => {
    if (!username) return;

    async function loadProfile() {
      try {
        setLoading(true);

        const fetchedProfile = await getUserByUsername(username);

        if (!fetchedProfile) {
          setProfile(null);
          return;
        }

        const typedProfile = fetchedProfile as ProfileUser;

        setProfile(typedProfile);

        const fetchedPosts = await getPostsByUserId(typedProfile.uid);
        setPosts(fetchedPosts);

        if (authUser?.uid === typedProfile.uid) {
          const fetchedSavedPosts = await getSavedPostsByUserId(typedProfile.uid);
          setSavedPosts(fetchedSavedPosts);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [username, authUser?.uid]);

  if (loading) {
    return (
      <main className="flex w-full justify-center px-4 py-10 md:pl-20">
        <p className="text-sm text-zinc-500">Loading profile...</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex w-full justify-center px-4 py-10 md:pl-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Sorry, this page isn&apos;t available.
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            The profile may have been removed or the username does not exist.
          </p>

          <Link
            href="/feed"
            className="mt-4 inline-block text-sm font-semibold text-[#1877f2]"
          >
            Go back to feed
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-white px-0 pb-[70px] pt-0 text-black dark:bg-[#0c1014] dark:text-white md:px-4 md:pb-20 md:pt-10 md:pl-20">
      <div className="mx-auto max-w-[1080px]">
        <ProfileHeader
          profile={profile}
          postsCount={posts.length}
          isOwnProfile={isOwnProfile}
        />

        <ProfileTabs
          activeTab={activeTab}
          isOwnProfile={isOwnProfile}
          onTabChange={setActiveTab}
          onSavedClick={loadSavedPosts}
        />

        {visiblePosts.length > 0 ? (
          <ProfilePostGrid posts={visiblePosts} />
        ) : (
          <ProfileEmptyState
            activeTab={activeTab}
            isOwnProfile={isOwnProfile}
          />
        )}

        <footer className="mt-20 pb-10 text-center text-xs text-zinc-500">
          © 2026 Instagram from Meta
        </footer>
      </div>
    </main>
  );
}