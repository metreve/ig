"use client";

import { useEffect } from "react";
import Feed from "../components/organisms/Feed";
import Sidebar from "../components/organisms/SideBar";
import MobileNav from "../components/organisms/MobileNav";
import { useUIStore } from "../store/ui.store";

export default function FeedClient() {
  const dark = useUIStore((state) => state.dark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-white text-black transition-colors dark:bg-black dark:text-white">
      <Sidebar />
      <Feed />
      <MobileNav />
    </div>
  );
}