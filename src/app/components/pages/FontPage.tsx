import { useState, useMemo } from "react";
import { toast } from "sonner";
import Desktop from "../../../imports/Desktop3";
import { KP_FONTS } from "../../../data/fonts";
import type { KPFont } from "../../../data/types";

export default function FontPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [testText, setTestText] = useState("동해 물과 백두산이");

  const filteredFonts = useMemo(() => {
    if (!searchQuery.trim()) return KP_FONTS;
    const q = searchQuery.toLowerCase();
    return KP_FONTS.filter(
      (f) =>
        f.displayName.toLowerCase().includes(q) ||
        f.fontFamily.toLowerCase().includes(q) ||
        f.series.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleDownload = (font: KPFont) => {
    toast.info("폰트 다운로드는 준비 중입니다.", {
      description: font.displayName,
    });
  };

  return (
    <div className="size-full overflow-auto">
      <div className="relative w-[1920px] h-[1080px] mx-auto">
        <Desktop
          fonts={filteredFonts}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          testText={testText}
          onTestTextChange={setTestText}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
