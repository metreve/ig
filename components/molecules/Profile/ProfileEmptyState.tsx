import Link from "next/link";
import { Camera } from "lucide-react";

import type { ProfileTab } from "@/types/profile";

type ProfileEmptyStateProps = {
  activeTab: ProfileTab;
  isOwnProfile: boolean;
};

export default function ProfileEmptyState({
  activeTab,
  isOwnProfile,
}: ProfileEmptyStateProps) {
  const title =
    activeTab === "posts"
      ? isOwnProfile
        ? "Share Photos"
        : "No posts yet"
      : activeTab === "saved"
        ? "No saved posts yet"
        : activeTab === "reposts"
          ? "No reposts yet"
          : "No tagged posts";

  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-current">
        <Camera size={34} />
      </div>

      <h2 className="mt-5 text-3xl font-bold">{title}</h2>

      {isOwnProfile && activeTab === "posts" && (
        <>
          <p className="mt-4 text-sm font-medium">
            When you share photos, they will appear on your profile.
          </p>

          <Link href="/create" className="mt-6 text-sm font-semibold text-[#1877f2]">
            Share your first photo
          </Link>
        </>
      )}
    </section>
  );
}