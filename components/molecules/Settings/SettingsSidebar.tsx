import {
  AtSign,
  EyeOff,
  IdCard,
  MessageCircle,
  Search,
  UserRound,
} from "lucide-react";

import {
  AccountsCenterIcon,
  AccountStatusIcon,
  BlockedIcon,
  CloseFriendsIcon,
  CommentsSettingsIcon,
  DashboardSettingsIcon,
  HelpIcon,
  HiddenWordsIcon,
  NotificationsIcon,
  PrivacyCenterIcon,
  PrivacyIcon,
  SharingReuseIcon,
} from "@/components/atoms/SettingsIcons";

import SettingsGroup from "./SettingsGroup";

export default function SettingsSidebar() {
  return (
    <aside className="hidden h-screen w-[360px] shrink-0 overflow-y-auto border-r border-zinc-200 px-8 py-8 dark:border-zinc-800 lg:block">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mt-6 flex h-11 items-center gap-3 rounded-full bg-zinc-100 px-4 dark:bg-[#262a2f]">
        <Search size={18} className="text-zinc-500" />
        <span className="text-sm text-zinc-500">Search</span>
      </div>

      <div className="mt-8 space-y-8">
        <SettingsGroup
          title="Your account"
          items={[
            {
              label: "Accounts Center",
              description:
                "Password, security, personal details, connected experiences, ad preferences",
              icon: AccountsCenterIcon,
            },
          ]}
        />

        <SettingsGroup
          title="How you use Instagram"
          active="Edit profile"
          items={[
            { label: "Edit profile", icon: UserRound },
            { label: "Notifications", icon: NotificationsIcon },
          ]}
        />

        <SettingsGroup
          title="For professionals"
          items={[
            { label: "Professional account", icon: IdCard },
            {
              label: "Creator tools and controls",
              icon: DashboardSettingsIcon,
            },
          ]}
        />

        <SettingsGroup
          title="Who can see your content"
          items={[
            { label: "Account privacy", icon: PrivacyIcon },
            { label: "Close Friends", icon: CloseFriendsIcon },
            { label: "Blocked", icon: BlockedIcon },
            { label: "Hide story", icon: EyeOff },
          ]}
        />

        <SettingsGroup
          title="How others can interact with you"
          items={[
            { label: "Messages and story replies", icon: MessageCircle },
            { label: "Tags and mentions", icon: AtSign },
            { label: "Comments", icon: CommentsSettingsIcon },
            { label: "Sharing and reuse", icon: SharingReuseIcon },
            { label: "Restricted accounts", icon: EyeOff },
            { label: "Hidden Words", icon: HiddenWordsIcon },
          ]}
        />

        <SettingsGroup
          title="More info and support"
          items={[
            { label: "Help", icon: HelpIcon },
            { label: "Privacy Center", icon: PrivacyCenterIcon },
            { label: "Account Status", icon: AccountStatusIcon },
          ]}
        />
      </div>
    </aside>
  );
}