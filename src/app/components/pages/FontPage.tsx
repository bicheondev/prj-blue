import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { KP_FONTS } from "../../../data/fonts";
import type { KPFont } from "../../../data/types";

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

function FontCard({ font, testText, onDownload }: { font: KPFont; testText: string; onDownload: () => void }) {
  return (
    <div className="bg-white flex flex-col gap-[10px] h-[255px] items-start relative rounded-[10px] w-[235px] shrink-0 border border-[#e2e8f0]">
      {/* Font name header */}
      <div className="h-[83px] relative w-full border-b border-[#e2e8f0]">
        <div className="flex flex-col items-start p-[18px] size-full">
          <div
            className="flex flex-col gap-[4px] items-start leading-normal text-[#334155] w-full"
            style={{ fontFamily: font.fontFamily }}
          >
            <p className="text-[20px] w-full truncate">{font.displayName}</p>
            <p className="text-[14px] w-full text-[#64748b]">{font.series}</p>
          </div>
        </div>
      </div>

      {/* Test text preview */}
      <div className="flex-1 flex items-start px-[18px] py-[8px] w-full overflow-hidden">
        <p
          className="text-[18px] leading-normal text-[#334155] break-words"
          style={{ fontFamily: font.fontFamily }}
        >
          {testText || "동해 물과 백두산이"}
        </p>
      </div>

      {/* Download footer */}
      <div className="w-full px-[18px] py-[12px] flex items-center justify-between">
        <button
          onClick={onDownload}
          className="cursor-pointer hover:opacity-70 transition-opacity text-[#94a3b8] flex items-center gap-[6px]"
          title="다운로드"
        >
          <span className="material-symbols-rounded text-[20px]">download</span>
        </button>
        {font.preinstalledOnRedStar && (
          <div className="bg-[#fee2e2] flex items-center justify-center px-[8px] py-[3px] rounded-full">
            <p className="font-['Pretendard:Bold',sans-serif] text-[#dc2626] text-[11px] whitespace-nowrap">붉은별 선탑재</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FontPage() {
  const navigate = useNavigate();
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
    window.open(font.downloadUrl, "_blank", "noopener,noreferrer");
    toast.success(`${font.displayName} 다운로드 중...`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-[#e2e8f0] h-[64px] flex items-center justify-between px-8 md:px-[232px]">
        <p
          className="font-['Pretendard:Medium',sans-serif] text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap cursor-pointer"
          onClick={() => navigate("/font")}
        >
          ★Font
        </p>
        <nav className="hidden md:flex gap-[25px] items-center text-[#475569] text-[15px]">
          {NAV_ITEMS.map((item) => (
            <p
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer whitespace-nowrap ${
                item.label === "폰트"
                  ? "font-['Pretendard:Bold',sans-serif]"
                  : "font-['Pretendard:Regular',sans-serif]"
              }`}
            >
              {item.label}
            </p>
          ))}
        </nav>
        <div className="hidden md:flex gap-[16px] items-center font-['Pretendard:Regular',sans-serif] text-[#475569] text-[15px]">
          <p className="cursor-pointer whitespace-nowrap">도움말</p>
          <p className="cursor-pointer whitespace-nowrap">설정</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="sticky top-[64px] z-10 bg-white border-b border-[#e2e8f0] px-8 md:px-[232px] py-[20px] flex flex-wrap gap-[12px] items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="폰트 검색"
          className="bg-[#f8fafc] px-[18px] py-[12px] rounded-[8px] font-['Pretendard:Medium',sans-serif] text-[#334155] text-[17px] outline-none placeholder:text-[#94a3b8] w-[200px]"
        />
        <input
          type="text"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="테스트 문구"
          className="bg-[#f8fafc] px-[18px] py-[12px] rounded-[8px] font-['Pretendard:Medium',sans-serif] text-[#334155] text-[17px] outline-none placeholder:text-[#94a3b8] flex-1 min-w-[200px] max-w-[400px]"
        />
        <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[14px] ml-auto whitespace-nowrap">
          {filteredFonts.length}개 폰트
        </p>
      </div>

      {/* Font grid */}
      <main className="flex-1 px-8 md:px-[232px] py-[32px]">
        {filteredFonts.length === 0 ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[16px]">
              검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-[24px]">
            {filteredFonts.map((font) => (
              <FontCard
                key={font.id}
                font={font}
                testText={testText}
                onDownload={() => handleDownload(font)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] px-8 py-[24px]">
        <p className="font-['Pretendard:Medium',sans-serif] text-[#94a3b8] text-[14px] text-center">
          본 사이트는 북한 정부 또는 조선노동당과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다. 간첩 신고는 국번 없이 111
        </p>
        <p className="font-['Pretendard:Medium',sans-serif] text-[#94a3b8] text-[14px] text-center mt-[4px]">
          모든 폰트의 저작권은 조선콤퓨터쎈터(Korea Computer Center)에게 있습니다.
        </p>
      </footer>
    </div>
  );
}
