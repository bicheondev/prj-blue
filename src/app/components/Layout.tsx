import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { MusicProvider } from "../contexts/MusicContext";
import { Toaster } from "./ui/sonner";

const NAV_ITEMS = [
  { label: "사전", path: "/" },
  { label: "음악", path: "/music" },
  { label: "폰트", path: "/font" },
  { label: "뉴스", path: "/news" },
  { label: "번역", path: "/translate" },
  { label: "문헌", path: "/paper" },
  { label: "스토어", path: "/store" },
  { label: "KCTV", path: "/kctv" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "P" || target.tagName === "SPAN") {
        const text = target.textContent?.trim();
        const navItem = NAV_ITEMS.find((item) => item.label === text);
        if (navItem) {
          e.preventDefault();
          e.stopPropagation();
          navigate(navItem.path);
        }
        // Handle "도움말" and "설정" - no navigation
        if (text === "도움말" || text === "설정") {
          e.preventDefault();
        }
        // Handle logo clicks
        if (text?.includes("Dictionary") || text?.includes("Music") || text?.includes("Font") || text?.includes("Store") || text?.includes("Translate") || text?.includes("Paper") || text?.includes("News")) {
          // Already handled by nav items above
        }
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [navigate, location]);

  return (
    <MusicProvider>
      <div ref={containerRef} className="size-full">
        <Outlet />
        <Toaster />
      </div>
    </MusicProvider>
  );
}
