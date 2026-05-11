"use client";

import Link from "next/link";
import { Bell, Compass, Menu, Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/lib/auth";

import { cn } from "../../lib/utils";
import { useUIStore } from "../../store/ui.store";
import {
  DashboardIcon,
  HomeOutlineIcon,
  InstagramLogoIcon,
  MessagesIcon,
  MetaIcon,
  ReelsFilledIcon,
  SearchIcon,
  NotificationsIcon,
} from "../atoms/InstagramIcons";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: HomeOutlineIcon },
  { label: "Reels", href: "#", icon: ReelsFilledIcon },
  { label: "Messages", href: "#", icon: MessagesIcon, badge: 4 },
  { label: "Search", href: "#", icon: SearchIcon },
  { label: "Explore", href: "#", icon: Compass },
  { label: "Notifications", href: "#", icon: NotificationsIcon },
  { label: "Create", href: "/create", icon: Plus },
  { label: "Dashboard", href: "#", icon: DashboardIcon },
];

export default function Sidebar() {
  const router = useRouter();
  const toggleDark = useUIStore((state) => state.toggleDark);
  const [activeItem, setActiveItem] = useState("Home");

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }
  return (
    <aside className="group/sidebar fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col bg-white px-3 py-6 text-zinc-950 transition-all duration-300 hover:w-[245px] dark:bg-[#0c1014] dark:text-white md:flex">
      <div className="mb-28 flex h-10 items-center px-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center">
          <InstagramLogoIcon size={24} />
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
                isActive && "font-bold",
              )}
            >
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                <Icon
                  size={24}
                  strokeWidth={isActive ? 3 : 2}
                  className={cn(
                    "transition-transform duration-200 group-hover/item:scale-110",
                    isActive && "scale-[1.04]",
                  )}
                />

                {item.badge && (
                  <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white ring-2 ring-white dark:ring-black">
                    {item.badge}
                  </span>
                )}
              </span>

              <span
                className={cn(
                  "ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100",
                  isActive && "font-bold",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <Link
          href="#"
          onClick={() => setActiveItem("Profile")}
          className={cn(
            "group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
            activeItem === "Profile" && "font-bold",
          )}
        >
          <img
            src="https://i.pravatar.cc/32?img=1"
            alt="profile"
            className={cn(
              "h-7 w-7 shrink-0 rounded-full object-cover transition-transform duration-200 group-hover/item:scale-110",
              activeItem === "Profile" && "ring-2 ring-black dark:ring-white",
            )}
          />

          <span className="ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
            Profile
          </span>
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-[#161b22]"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center">
          <LogOut
            size={24}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover/item:scale-110"
          />
        </span>

        <span className="ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
          Log out
        </span>
      </button>

      <div className="mt-auto flex flex-col gap-2">
        <button
          onClick={toggleDark}
          className="group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">
            <Menu
              size={26}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover/item:scale-110"
            />
          </span>

          <span className="ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
            More
          </span>
        </button>

        <button
          onClick={() => setActiveItem("Also from Meta")}
          className={cn(
            "group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
            activeItem === "Also from Meta" && "font-bold",
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">
            <MetaIcon
              size={24}
              className={cn(
                "transition-transform duration-200 group-hover/item:scale-110",
                activeItem === "Also from Meta" && "scale-[1.04]",
              )}
            />
          </span>

          <span className="ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
            Also from Meta
          </span>
        </button>
      </div>
    </aside>
  );
}
