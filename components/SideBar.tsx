"use client";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home",          href: "/feed", icon: "home" },
  { label: "Reels",         href: "#",     icon: "reels" },
  { label: "Messages",      href: "#",     icon: "messages" },
  { label: "Search",        href: "#",     icon: "search" },
  { label: "Explore",       href: "#",     icon: "explore" },
  { label: "Notifications", href: "#",     icon: "notifications" },
  { label: "Create",        href: "#",     icon: "create" },
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="m21.762 8.786-7-6.68a3.994 3.994 0 0 0-5.524 0l-7 6.681A4.017 4.017 0 0 0 1 11.68V19c0 2.206 1.794 4 4 4h3.005a1 1 0 0 0 1-1v-7.003a2.997 2.997 0 0 1 5.994 0V22a1 1 0 0 0 1 1H19c2.206 0 4-1.794 4-4v-7.32a4.02 4.02 0 0 0-1.238-2.894Z"/>
      </svg>
    ),
    reels: (
      <svg aria-label="Reels" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><path d="M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Zm-.993 3.04-5.25 3a.74.74 0 0 1-.748-.003.74.74 0 0 1-.374-.649V9a.74.74 0 0 1 .374-.65.737.737 0 0 1 .748-.002l5.25 3c.341.196.378.521.378.652s-.037.456-.378.651Z"></path></svg>
    ),
    messages: (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
        <path d="M22.91 2.388a.859.859 0 0 0-.969-.969l-21 5.15a.748.748 0 0 0-.138 1.395l9.116 4.346 4.346 9.116a.748.748 0 0 0 1.395-.138l5.15-21.001a.859.859 0 0 0-.9.101z" strokeLinejoin="round"/>
        <line x1="10.02" y1="13.987" x2="14.619" y2="9.388" strokeLinecap="round"/>
      </svg>
    ),
    search: (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
        <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5z"/>
        <line x1="16.511" y1="16.511" x2="22" y2="22" strokeLinecap="round"/>
      </svg>
    ),
    explore: (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
        <polygon points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"/>
        <circle cx="12.001" cy="12.005" r="10.5"/>
      </svg>
    ),
    notifications: (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="currentColor" strokeWidth="2">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.564-.438-.095-1.791-1.321-4.303-3.564C5.152 14.081 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z"/>
      </svg>
    ),
    create: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"/>
      </svg>
    ),
    more: (
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor"/>
        <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
        <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor"/>
      </svg>
    ),
    meta: (
      <svg aria-label="Also from Meta" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Also from Meta</title><path d="M9.5 11h5c1.379 0 2.5-1.122 2.5-2.5v-5C17 2.122 15.879 1 14.5 1h-5A2.503 2.503 0 0 0 7 3.5v5C7 9.878 8.12 11 9.5 11ZM9 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM8.499 13h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Zm11.5-7.5h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Z"></path></svg>
    ),
  };
  return <>{icons[name] ?? null}</>;
}

export default function Sidebar({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(false);

  const expanded = hovered;


  return (
    <nav
      className={`sidebar${expanded ? " sidebar--expanded" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        
          <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
            <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"/>
          </svg>
        
      </div>

      {/* Nav items */}
      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.icon}>
            <Link
              href={item.href}
              className={`sidebar-item${active === item.icon ? " active" : ""}`}
              onClick={() => setActive(item.icon)}
            >
              <Icon name={item.icon} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </li>
        ))}

        {/* Profile */}
        <li>
          <Link href="#" className="sidebar-item" onClick={() => setActive("profile")}>
            <img src="https://i.pravatar.cc/24?img=1" alt="profile" width={24} height={24} style={{ borderRadius: "50%", flexShrink: 0 }} />
            <span className="sidebar-label">Profile</span>
          </Link>
        </li>
      </ul>

      {/* Bottom buttons */}
      <div className="sidebar-bottom">
        <a className="sidebar-item" onClick={onToggleDark}>
          <Icon name="more" />
          <span className="sidebar-label">More</span>
        </a>
        <a className="sidebar-item">
          <Icon name="meta" />
          <span className="sidebar-label">Also from Meta</span>
        </a>
      </div>
    </nav>
  );
}