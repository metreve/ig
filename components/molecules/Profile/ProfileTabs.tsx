import {
  ProfilePostsIcon,
  ProfileSavedIcon,
  ProfileRepostsIcon,
  ProfileTaggedIcon,
} from "@/components/atoms/InstagramIcons";

import type { ProfileTab } from "@/types/profile";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  isOwnProfile: boolean;
  onTabChange: (tab: ProfileTab) => void;
  onSavedClick: () => void;
};

export default function ProfileTabs({
  activeTab,
  isOwnProfile,
  onTabChange,
  onSavedClick,
}: ProfileTabsProps) {
  return (
    <div className="flex justify-around border-b border-zinc-200 dark:border-zinc-800 md:justify-center md:gap-24">
      <ProfileTabButton
        active={activeTab === "posts"}
        onClick={() => onTabChange("posts")}
      >
        <ProfilePostsIcon size={24} />
      </ProfileTabButton>

      {isOwnProfile && (
        <ProfileTabButton
          active={activeTab === "saved"}
          onClick={() => {
            onTabChange("saved");
            onSavedClick();
          }}
        >
          <ProfileSavedIcon size={24} />
        </ProfileTabButton>
      )}

      <ProfileTabButton
        active={activeTab === "reposts"}
        onClick={() => onTabChange("reposts")}
      >
        <ProfileRepostsIcon size={24} />
      </ProfileTabButton>

      <ProfileTabButton
        active={activeTab === "tagged"}
        onClick={() => onTabChange("tagged")}
      >
        <ProfileTaggedIcon size={24} />
      </ProfileTabButton>
    </div>
  );
}

function ProfileTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-center border-t md:w-auto ${
        active
          ? "border-black text-black dark:border-white dark:text-white"
          : "border-transparent text-zinc-500"
      }`}
    >
      {children}
    </button>
  );
}