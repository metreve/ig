"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, Plus } from "lucide-react";

import {
  DashboardIcon,
  HomeOutlineIcon,
  InstagramLogoIcon,
  MessagesIcon,
  NotificationsIcon,
  ReelsFilledIcon,
  SearchIcon,
} from "@/components/atoms/InstagramIcons";

import SidebarNavItem from "@/components/molecules/Sidebar/SidebarNavItem";
import SidebarProfileLink from "@/components/molecules/Sidebar/SidebarProfileLink";
import SidebarFooter from "@/components/molecules/Sidebar/SidebarFooter";

import { logoutUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/users";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";

const navItems = [
  { label: "Home", href: "/feed", icon: HomeOutlineIcon },
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

  const user = useAuthStore((state) => state.user);
  const toggleDark = useUIStore((state) => state.toggleDark);

  const [activeItem, setActiveItem] = useState("Home");
  const [profileUsername, setProfileUsername] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const profileHref = profileUsername ? `/profile/${profileUsername}` : "/feed";

  useEffect(() => {
    async function loadSidebarProfile() {
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
        console.error("Failed to load sidebar profile:", error);
      }
    }

    loadSidebarProfile();
  }, [user]);

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
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.label}
            label={item.label}
            href={item.href}
            icon={item.icon}
            badge={item.badge}
            active={activeItem === item.label}
            onClick={() => setActiveItem(item.label)}
          />
        ))}

        <SidebarProfileLink
          href={profileHref}
          username={profileUsername}
          photoURL={profilePhotoURL}
        />
      </nav>

      <SidebarFooter
        activeItem={activeItem}
        onDarkToggle={toggleDark}
        onLogout={handleLogout}
        onMetaClick={() => setActiveItem("Also from Meta")}
      />
    </aside>
  );
}