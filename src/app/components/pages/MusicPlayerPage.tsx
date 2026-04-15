import { useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { useMusicContext } from "../../contexts/MusicContext";
import { PlayerBar } from "./MusicHomePage";

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

function LyricLine({ text, blurAmount, isActive }: { text: string; blurAmount: number; isActive: boolean }) {
  return (
    <div
      className={`py-[10px] transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}
      style={{ filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined }}
    >
      <p
        className={`font-['Pretendard:Bold',sans-serif] text-[28px] md:text-[36px] leading-[1.3] whitespace-pre-wrap transition-colors ${
          isActive ? "text-[#334155]" : "text-[#64748b]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export default function MusicPlayerPage() {
  const navigate = useNavigate();
  const music = useMusicContext();
  const lyricsRef = useRef<HTMLDivElement>(null);
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
        <div className="hidden md:flex gap-[16px] items-center font-['Pretendard:Regular',sans-serif] text-[#475569] text-[15px]">
          <button
            onClick={() => navigate("/music/sheet")}
            className="flex items-center justify-center bg-[#eff6ff] rounded-full p-[8px] cursor-pointer hover:bg-[#dbeafe] transition-colors"
            title="악보 보기"
          >
            <span className="material-symbols-rounded text-[#2563eb] text-[20px]">lyrics</span>
          </button>
        </div>
      </header>

      {/* Content area */}
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
            <span className="font-['Pretendard:Regular',sans-serif] text-[#334155] text-[10px]">플레이어</span>
          </button>
        </aside>

        {/* Player content */}
        <div className="flex-1 flex flex-col md:flex-row gap-[40px] md:gap-[80px] px-6 md:px-[80px] py-[40px] overflow-hidden">
          {/* Album art + info (left column) */}
          <div className="flex flex-col items-center md:items-start gap-[24px] md:w-[360px] shrink-0">
            {/* Album art */}
            <div className="w-full max-w-[360px] aspect-square rounded-[16px] overflow-hidden shadow-[0px_10px_30px_-3px_rgba(78,89,104,0.1),0px_15px_80px_-5px_rgba(78,89,104,0.2)] bg-[#f1f5f9]">
              {track?.imageUrl && (
                <img
                  alt={track.title}
                  src={track.imageUrl}
                  className="size-full object-cover"
                />
              )}
            </div>

            {/* Track info */}
            <div className="w-full max-w-[360px]">
              <p className="font-['Pretendard:Bold',sans-serif] text-[#334155] text-[22px] truncate">
                {track?.title ?? "—"}
              </p>
              <div className="flex gap-[8px] items-center mt-[4px]">
                {track?.artist && (
                  <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[16px] truncate">
                    {track.artist}
                  </p>
                )}
                {track?.album && (
                  <>
                    <span className="text-[#94a3b8] text-[12px]">·</span>
                    <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[16px] truncate">
                      {track.album}
                    </p>
                  </>
                )}
                {track?.year && (
                  <>
                    <span className="text-[#94a3b8] text-[12px]">·</span>
                    <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[16px]">
                      {track.year}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Mobile: action buttons */}
            <div className="flex gap-[16px] md:hidden">
              <button
                onClick={() => navigate("/music/sheet")}
                className="bg-[#eff6ff] flex items-center justify-center rounded-full p-[14px] cursor-pointer hover:bg-[#dbeafe] transition-colors"
              >
                <span className="material-symbols-rounded text-[#2563eb] text-[28px]">lyrics</span>
              </button>
            </div>
          </div>

          {/* Lyrics (right column) */}
          {track?.lyrics && track.lyrics.length > 0 ? (
            <div
              ref={lyricsRef}
              className="flex-1 overflow-y-auto max-h-[calc(100vh-64px-80px-80px)] md:max-h-[calc(100vh-64px-80px)] pr-[8px]"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="flex flex-col">
                {track.lyrics.map((line, i) => {
                  const distance = Math.abs(i - activeLyricIndex);
                  return (
                    <LyricLine
                      key={i}
                      text={line}
                      blurAmount={distance * 1.5}
                      isActive={i === activeLyricIndex}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-rounded text-[#e2e8f0] text-[64px]">music_note</span>
                <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[16px] mt-[12px]">
                  가사 정보가 없습니다
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Persistent bottom player bar */}
      <PlayerBar />
    </div>
  );
}
