import { useEffect, useRef, useState } from "react";

const CANVAS_W = 1920;
const CANVAS_H = 1080;

/**
 * Scales a fixed 1920 × 1080 Figma-exported desktop canvas down to fit the
 * current viewport width on smaller screens. On desktop it renders at 1:1.
 */
export default function ScaledCanvas({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setScale(Math.min(1, vw / CANVAS_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scaledH = Math.round(CANVAS_H * scale);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: scaledH, overflow: "hidden" }}
    >
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
