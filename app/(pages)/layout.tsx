"use client";

import { useEffect } from "react";
import Sidebar from "@/components/organisms/SideBar";
import MobileNav from "@/components/organisms/MobileNav";
import ProtectedRoute from "@/components/organisms/ProtectedRoute";
import { useUIStore } from "@/store/ui.store";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dark = useUIStore((state) => state.dark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white text-black transition-colors dark:bg-[#0c1014] dark:text-white">
        <Sidebar />
        {children}
        <MobileNav />
      </div>
    </ProtectedRoute>
  );
}