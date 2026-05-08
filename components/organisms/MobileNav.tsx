
"use client";

import Link from "next/link";
import { Bell, Compass, CompassIcon, Menu, Plus, User } from "lucide-react";
import {
  DashboardIcon,
  HomeOutlineIcon,
  InstagramLogoIcon,
  MessagesIcon,
  MetaIcon,
  ReelsFilledIcon,
  SearchIcon,
  NotificationsIcon,
  ReelsIcon
} from "../atoms/InstagramIcons";

const items = [
  {
    href: "/",
    icon: HomeOutlineIcon,
  },
  {
    href: "#",
    icon: CompassIcon,
  },
  {
    href: "#",
    icon: ReelsIcon,
  },

  {
    href: "#",
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
  {
    href: "#",
    icon: User,
  },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-zinc-200 bg-white px-2 py-3 dark:border-zinc-800 dark:bg-black md:hidden">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <Link
            key={index}
            href={item.href}
            className="transition hover:scale-110"
          >
            <Icon size={28} />
          </Link>
        );
      })}
    </nav>
  );
}