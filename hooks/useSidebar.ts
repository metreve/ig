import { useState } from "react";

export function useSidebar() {
  const [hovered, setHovered] = useState(false);

  return {
    expanded: hovered,
    onEnter: () => setHovered(true),
    onLeave: () => setHovered(false),
  };
}