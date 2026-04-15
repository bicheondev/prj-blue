import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useMusicContext } from "../../contexts/MusicContext";
import { PlayerBar } from "./MusicHomePage";
import imgSheetMusic from "figma:asset/5ea02acbb0827169d136686adceb8c8f4905c7c8.png";

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

export default function MusicSheetPage() {
  const navigate = useNavigate();
  const music = useMusicContext();
  const track = music.currentTrack;

  const activeLyricIndex = useMemo(() => {
    if (!track?.lyrics?.length || !track.duration) return 0;
    return Math.min(
      Math.floor((music.currentTime / track.duration) * track.lyrics.length),
      track.lyrics.length - 1
    );
  }, [music.currentTime, track]);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-[#e2e8f0] h-[64px] flex items-center justify-between px-6 md:px-[232px]">
        <p
          className="font-['Pretendard:Medium',sans-serif] text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap cursor-pointer"
          onClick={() => navigate("/music")}
        >
          ★Music
        </p>
        <nav className="hidden md:flex gap-[25px] items-center text-[#475569] text-[15px]">
          {NAV_ITEMS.map((item) => (
            <p
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer whitespace-nowrap ${
                item.label === "음악"
                  ? "font-['Pretendard:Bold',sans-serif]"
                  : "font-['Pretendard:Regular',sans-serif]"
              }`}
            >
              {item.label}
            </p>
          ))}
        </nav>
        <div className="hidden md:flex gap-[16px] items-center">
          <button
            onClick={() => navigate("/music/player")}
            className="flex items-center justify-center bg-[#f8fafc] rounded-full p-[8px] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
            title="플레이어로 이동"
          >
            <span className="material-symbols-rounded text-[#475569] text-[20px]">lyrics</span>
          </button>
          <button
            className="flex items-center justify-center bg-[#eff6ff] rounded-full p-[8px] cursor-pointer hover:bg-[#dbeafe] transition-colors"
            title="악보 보기"
          >
            <span className="material-symbols-rounded text-[#2563eb] text-[20px]">music_note</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex">
        {/* Left sidebar */}
        <aside className="hidden md:flex flex-col items-center py-[16px] w-[56px] border-r border-[#e2e8f0] bg-[#f8fafc] shrink-0 gap-[4px]">
          <button
            onClick={() => navigate("/music")}
            className="flex flex-col items-center gap-[2px] w-full px-[4px] py-[8px] rounded-[8px] hover:bg-[#e2e8f0] transition-colors"
          >
            <span className="material-symbols-rounded text-[#64748b] text-[20px]">home</span>
            <span className="font-['Pretendard:Regular',sans-serif] text-[#64748b] text-[10px]">홈</span>
          </button>
          <button className="flex flex-col items-center gap-[2px] w-full px-[4px] py-[8px] rounded-[8px] bg-[#e2e8f0]">
            <span className="material-symbols-rounded text-[#334155] text-[20px]">library_music</span>
            <span className="font-['Pretendard:Regular',sans-serif] text-[#334155] text-[10px]">악보</span>
          </button>
        </aside>

        {/* Sheet music area */}
        <div className="flex-1 flex flex-col md:flex-row gap-[40px] px-6 md:px-[80px] py-[40px] overflow-hidden">
          {/* Sheet music image */}
          <div className="flex-1 flex items-start justify-center">
            <div
              className="rounded-[10px] overflow-hidden shadow-[0px_0px_15px_0px_rgba(0,27,55,0.1),0px_15px_80px_-5px_rgba(78,89,104,0.2)] max-w-[500px] w-full"
              style={{ background: "rgba(49,130,246,0.05)" }}
            >
              <img
                alt="악보"
                src={imgSheetMusic}
                className="w-full object-contain rounded-[10px]"
              />
            </div>
          </div>

          {/* Lyrics list (right side) */}
          {track?.lyrics && track.lyrics.length > 0 && (
            <div className="w-full md:w-[280px] shrink-0 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-64px-80px)]" style={{ scrollbarWidth: "thin" }}>
              {track.lyrics.map((line, i) => (
                <div
                  key={i}
                  className={`py-[8px] px-[12px] rounded-[8px] transition-all ${
                    i === activeLyricIndex ? "bg-[#eff6ff] text-[#2563eb]" : "text-[#94a3b8]"
                  }`}
                >
                  <p className={`font-['Pretendard:${i === activeLyricIndex ? "SemiBold" : "Regular"}',sans-serif] text-[14px] leading-[1.4]`}>
                    {line}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Persistent bottom player bar */}
      <PlayerBar />
    </div>
  );
}
