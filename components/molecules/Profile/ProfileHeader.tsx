import Link from "next/link";
import { Plus, Settings } from "lucide-react";

import type { ProfileUser } from "@/types/profile";

type ProfileHeaderProps = {
  profile: ProfileUser;
  postsCount: number;
  isOwnProfile: boolean;
};

export default function ProfileHeader({
  profile,
  postsCount,
  isOwnProfile,
}: ProfileHeaderProps) {
  return (
    <section className="border-b border-zinc-200 px-4 pb-6 dark:border-zinc-800 md:px-0 md:pb-10">
      <div className="mb-8 flex items-center justify-between md:hidden">
        <button className="rounded-full p-1">
          <Settings size={26} />
        </button>

        <div className="flex items-center gap-1 text-base font-semibold">
          {profile.username}
          <span className="text-lg leading-none">⌄</span>
        </div>

        <button className="relative rounded-full p-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-current text-sm font-bold">
            @
          </span>
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
            5
          </span>
        </button>
      </div>

      <div className="md:hidden">
        <div className="flex items-center gap-7">
          <ProfileAvatar profile={profile} mobile />

          <div className="grid flex-1 grid-cols-3 text-center text-sm">
            <ProfileStat value={postsCount} label="posts" />
            <ProfileStat value={497} label="followers" />
            <ProfileStat value={330} label="following" />
          </div>
        </div>

        <ProfileBio profile={profile} />

        <ProfileButtons isOwnProfile={isOwnProfile} />
      </div>

      <div className="hidden md:flex md:flex-col">
        <div className="flex flex-col gap-8 md:flex-row md:gap-28">
          <div className="flex justify-center md:w-[300px] md:justify-center">
            <ProfileAvatar profile={profile} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-xl font-normal">{profile.username}</h1>

              {isOwnProfile ? (
                <>
                  <Link
                    href="/settings/profile"
                    className="rounded-lg bg-zinc-100 px-8 py-2 text-sm font-semibold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]"
                  >
                    Edit profile
                  </Link>

                  <button className="rounded-lg bg-zinc-100 px-8 py-2 text-sm font-semibold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]">
                    View archive
                  </button>

                  <button className="rounded-full p-1 transition hover:bg-zinc-100 dark:hover:bg-[#262a2f]">
                    <Settings size={23} />
                  </button>
                </>
              ) : (
                <>
                  <button className="rounded-lg bg-[#1877f2] px-8 py-2 text-sm font-semibold text-white transition hover:bg-[#2d8cff]">
                    Follow
                  </button>

                  <button className="rounded-lg bg-zinc-100 px-8 py-2 text-sm font-semibold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]">
                    Message
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 flex gap-10 text-sm">
              <span>
                <strong>{postsCount}</strong> posts
              </span>
              <span>
                <strong>0</strong> followers
              </span>
              <span>
                <strong>0</strong> following
              </span>
            </div>

            <ProfileBio profile={profile} desktop />
          </div>
        </div>
      </div>

      {isOwnProfile && (
        <div className="mt-8 flex md:mt-10 md:pl-[260px]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-zinc-300 dark:border-zinc-700 md:h-20 md:w-20">
              <Plus
                size={36}
                className="text-zinc-500 md:h-[42px] md:w-[42px]"
              />
            </div>

            <span className="text-xs font-semibold">New</span>
          </div>
        </div>
      )}
    </section>
  );
}

function ProfileAvatar({
  profile,
  mobile = false,
}: {
  profile: ProfileUser;
  mobile?: boolean;
}) {
  const sizeClass = mobile
    ? "h-[92px] w-[92px] text-3xl"
    : "h-[150px] w-[150px] text-5xl";

  if (profile.photoURL) {
    return (
      <img
        src={profile.photoURL}
        alt={profile.username}
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-full bg-zinc-300 font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200`}
    >
      {profile.username.charAt(0).toUpperCase()}
    </div>
  );
}

function ProfileStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-bold">{value}</div>
      <div className="leading-tight">{label}</div>
    </div>
  );
}

function ProfileBio({
  profile,
  desktop = false,
}: {
  profile: ProfileUser;
  desktop?: boolean;
}) {
  return (
    <div className={desktop ? "mt-5 text-sm" : "mt-4 text-sm"}>
      <div className={desktop ? "font-semibold" : "font-bold"}>
        {profile.displayName}
      </div>

      {profile.bio && (
        <p className={desktop ? "mt-3 whitespace-pre-line leading-snug" : "mt-1 whitespace-pre-line leading-snug"}>
          {profile.bio}
        </p>
      )}
    </div>
  );
}

function ProfileButtons({ isOwnProfile }: { isOwnProfile: boolean }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {isOwnProfile ? (
        <>
          <Link
            href="/settings/profile"
            className="rounded-lg bg-zinc-100 py-2 text-center text-sm font-bold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]"
          >
            Edit profile
          </Link>

          <button className="rounded-lg bg-zinc-100 py-2 text-sm font-bold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]">
            View archive
          </button>
        </>
      ) : (
        <>
          <button className="rounded-lg bg-[#1877f2] py-2 text-sm font-bold text-white transition hover:bg-[#2d8cff]">
            Follow
          </button>

          <button className="rounded-lg bg-zinc-100 py-2 text-sm font-bold transition hover:bg-zinc-200 dark:bg-[#262a2f] dark:hover:bg-[#30343a]">
            Message
          </button>
        </>
      )}
    </div>
  );
}