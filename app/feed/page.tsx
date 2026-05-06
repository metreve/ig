"use client";
import { useState } from "react";
import Sidebar from "../../components/SideBar";
import Feed from "@/components/Feed";
import RightSidebar from "../../components/RightSideBar";

export default function FeedPage() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`ig-layout${dark ? " dark" : ""}`}>
      <Sidebar dark={dark} onToggleDark={() => setDark((v) => !v)} />
      <Feed />
      {/* <RightSidebar /> */}
    </div>
  );
}