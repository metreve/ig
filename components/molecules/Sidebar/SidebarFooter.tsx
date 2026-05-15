import { LogOut, Menu } from "lucide-react";

import { MetaIcon } from "@/components/atoms/InstagramIcons";
import { cn } from "@/lib/utils";

type SidebarFooterProps = {
  activeItem: string;
  onDarkToggle: () => void;
  onLogout: () => void;
  onMetaClick: () => void;
};

export default function SidebarFooter({
  activeItem,
  onDarkToggle,
  onLogout,
  onMetaClick,
}: SidebarFooterProps) {
  return (
    <>
      <button
        onClick={onLogout}
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
          onClick={onDarkToggle}
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
          onClick={onMetaClick}
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
    </>
  );
}