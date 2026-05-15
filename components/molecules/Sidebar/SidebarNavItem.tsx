import Link from "next/link";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type SidebarIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

type SidebarNavItemProps = {
  label: string;
  href: string;
  icon: ComponentType<SidebarIconProps>;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
};

export default function SidebarNavItem({
  label,
  href,
  icon: Icon,
  active = false,
  badge,
  onClick,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-zinc-900",
        active && "font-bold",
      )}
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        <Icon
          size={24}
          strokeWidth={active ? 3 : 2}
          className={cn(
            "transition-transform duration-200 group-hover/item:scale-110",
            active && "scale-[1.04]",
          )}
        />

        {badge && (
          <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white ring-2 ring-white dark:ring-black">
            {badge}
          </span>
        )}
      </span>

      <span
        className={cn(
          "ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100",
          active && "font-bold",
        )}
      >
        {label}
      </span>
    </Link>
  );
}