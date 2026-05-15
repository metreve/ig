import Link from "next/link";

type SidebarProfileLinkProps = {
  href: string;
  username: string;
  photoURL: string;
};

export default function SidebarProfileLink({
  href,
  username,
  photoURL,
}: SidebarProfileLinkProps) {
  return (
    <Link
      href={href}
      className="group/item flex h-12 items-center rounded-lg px-3 text-[16px] transition hover:bg-zinc-100 dark:hover:bg-[#161b22]"
    >
      {photoURL ? (
        <img
          src={photoURL}
          alt="Profile"
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-xs font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
          {username.charAt(0).toUpperCase() || "U"}
        </div>
      )}

      <span className="ml-5 whitespace-nowrap opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
        Profile
      </span>
    </Link>
  );
}