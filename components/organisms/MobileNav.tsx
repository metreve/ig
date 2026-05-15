"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  DashboardIcon,
  HomeOutlineIcon,
  MessagesIcon,
  ReelsIcon,
  SearchIcon,
} from "../atoms/InstagramIcons";

import { getUserProfile } from "@/lib/users";
import { useAuthStore } from "@/store/auth.store";

const navItems = [
  {
    href: "/feed",
    icon: HomeOutlineIcon,
  },
  {
    href: "#",
    icon: SearchIcon,
  },
  {
    href: "#",
    icon: ReelsIcon,
  },
  {
    href: "/create",
    icon: Plus,
  },
  {
    href: "#",
    icon: MessagesIcon,
  },
  {
    href: "#",
    icon: DashboardIcon,
  },
];

export default function MobileNav() {
  const user = useAuthStore((state) => state.user);

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
        console.error("Failed to load mobile profile:", error);
      }
    }

    loadProfile();
  }, [user]);

  const profileHref = profileUsername ? `/profile/${profileUsername}` : "/feed";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[58px] items-center justify-around border-t border-zinc-200 bg-white px-2 dark:border-zinc-800 dark:bg-[#0c1014] md:hidden">
      {navItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.href}
            className="flex h-11 w-11 items-center justify-center rounded-full transition active:scale-90"
          >
            <Icon size={27} />
          </Link>
        );
      })}

      <Link
        href={profileHref}
        className="flex h-11 w-11 items-center justify-center rounded-full transition active:scale-90"
      >
        {profilePhotoURL ? (
          <img
            src={profilePhotoURL}
            alt="Profile"
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            {profileUsername.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </Link>
    </nav>
  );
}