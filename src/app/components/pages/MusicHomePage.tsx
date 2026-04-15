import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { TRACKS } from "../../../data/music";
import { fetchTracksFromR2 } from "../../contexts/MusicContext";
import { useMusicContext } from "../../contexts/MusicContext";
import type { Track } from "../../../data/types";

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

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

function AlbumCard({ track, onClick }: { track: Track; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-[8px] items-start text-left cursor-pointer group shrink-0 w-[160px]"
    >
      <div className="w-full aspect-square rounded-[10px] overflow-hidden bg-[#f1f5f9]">
        <img
          alt={track.title}
          src={track.imageUrl}
          className="size-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <p className="font-['Pretendard:Medium',sans-serif] text-[#334155] text-[14px] w-full truncate group-hover:text-[#3b82f6] transition-colors">
        {track.title}
      </p>
      {track.artist && (
        <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[12px] w-full truncate">
          {track.artist}
        </p>
      )}
    </button>
  );
}

export function PlayerBar() {
  const music = useMusicContext();
  const navigate = useNavigate();
  const progressRef = useRef<HTMLDivElement>(null);
  const track = music.currentTrack;
  const duration = track?.duration ?? 0;
  const progressPercent = duration > 0 ? (music.currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    music.seek(Math.max(0, Math.min(duration, ratio * duration)));
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#f8fafc] border-t border-[#e2e8f0]">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="h-[3px] bg-[#e2e8f0] cursor-pointer group hover:h-[5px] transition-all"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[#3b82f6] transition-[width] duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 h-[68px]">
        {/* Track info */}
        <button
          className="flex items-center gap-[12px] min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/music/player")}
        >
          <div className="w-[40px] h-[40px] rounded-[8px] overflow-hidden shrink-0 bg-[#e2e8f0]">
            <img alt={track.title} src={track.imageUrl} className="size-full object-cover" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <p className="font-['Pretendard:Medium',sans-serif] text-[#334155] text-[14px] truncate max-w-[180px]">
              {track.title}
            </p>
            <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[12px] truncate max-w-[180px]">
              {track.artist}
            </p>
          </div>
        </button>

        {/* Playback controls */}
        <div className="flex items-center gap-[4px]">
          <button
            onClick={music.prev}
            className="text-[#334155] hover:opacity-70 transition-opacity p-[4px]"
          >
            <span className="material-symbols-rounded text-[28px]">skip_previous</span>
          </button>
          <button
            onClick={music.isPlaying ? music.pause : music.resume}
            className="text-[#334155] hover:opacity-70 transition-opacity p-[4px]"
          >
            <span className="material-symbols-rounded text-[40px]">
              {music.isPlaying ? "pause_circle" : "play_circle"}
            </span>
          </button>
          <button
            onClick={music.next}
            className="text-[#334155] hover:opacity-70 transition-opacity p-[4px]"
          >
            <span className="material-symbols-rounded text-[28px]">skip_next</span>
          </button>
        </div>

        {/* Time + extras */}
        <div className="flex items-center gap-[16px]">
          <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[12px] whitespace-nowrap hidden sm:block">
            {formatTime(music.currentTime)} / {formatTime(duration)}
          </p>
          <button
            onClick={music.toggleRepeat}
            className={`transition-opacity p-[4px] ${music.repeat ? "text-[#3b82f6]" : "text-[#94a3b8] opacity-50 hover:opacity-80"}`}
          >
            <span className="material-symbols-rounded text-[22px]">repeat</span>
          </button>
          <button
            onClick={music.toggleShuffle}
            className={`transition-opacity p-[4px] ${music.shuffle ? "text-[#3b82f6]" : "text-[#94a3b8] opacity-50 hover:opacity-80"}`}
          >
            <span className="material-symbols-rounded text-[22px]">shuffle</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MusicHomePage() {
  const navigate = useNavigate();
  const music = useMusicContext();
  const [tracks, setTracks] = useState<Track[]>(TRACKS);

  useEffect(() => {
    fetchTracksFromR2()
      .then((r2Tracks) => {
        if (r2Tracks.length > 0) setTracks(r2Tracks);
      })
      .catch(() => {});
  }, []);

  const handleTrackSelect = (track: Track) => {
    music.play(track);
    navigate("/music/player");
  };

  const recentTracks = useMemo(() => tracks.slice(0, 6), [tracks]);
  const popularTracks = useMemo(() => tracks.slice(0, 6), [tracks]);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ paddingBottom: music.currentTrack ? 80 : 0 }}>
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
          <p className="cursor-pointer whitespace-nowrap">도움말</p>
          <p className="cursor-pointer whitespace-nowrap">설정</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col items-center py-[16px] w-[56px] border-r border-[#e2e8f0] bg-[#f8fafc] shrink-0 gap-[4px]">
          <button className="flex flex-col items-center gap-[2px] w-full px-[4px] py-[8px] rounded-[8px] bg-[#e2e8f0]">
            <span className="material-symbols-rounded text-[#334155] text-[20px]">home</span>
            <span className="font-['Pretendard:Regular',sans-serif] text-[#334155] text-[10px]">홈</span>
          </button>
          <button className="flex flex-col items-center gap-[2px] w-full px-[4px] py-[8px] rounded-[8px] hover:bg-[#e2e8f0] transition-colors">
            <span className="material-symbols-rounded text-[#64748b] text-[20px]">library_music</span>
            <span className="font-['Pretendard:Regular',sans-serif] text-[#64748b] text-[10px]">내 음악</span>
          </button>
        </aside>

        {/* Main content area */}
        <div className="flex-1 overflow-x-hidden px-6 md:px-[48px] py-[40px] flex flex-col gap-[48px]">
          {/* Recently played section */}
          <section>
            <div className="flex items-center justify-between mb-[20px]">
              <h2 className="font-['Pretendard:Bold',sans-serif] text-[#334155] text-[28px]">최근 재생한 음악</h2>
              <span className="material-symbols-rounded text-[#475569] text-[24px] cursor-pointer">arrow_forward_ios</span>
            </div>
            <div className="flex gap-[24px] overflow-x-auto pb-[12px]" style={{ scrollbarWidth: "none" }}>
              {recentTracks.map((track) => (
                <AlbumCard key={track.id} track={track} onClick={() => handleTrackSelect(track)} />
              ))}
            </div>
          </section>

          {/* Popular section */}
          <section>
            <div className="flex items-center justify-between mb-[20px]">
              <h2 className="font-['Pretendard:Bold',sans-serif] text-[#334155] text-[28px]">인기 추천곡</h2>
              <span className="material-symbols-rounded text-[#475569] text-[24px] cursor-pointer">arrow_forward_ios</span>
            </div>
            <div className="flex gap-[24px] overflow-x-auto pb-[12px]" style={{ scrollbarWidth: "none" }}>
              {popularTracks.map((track) => (
                <AlbumCard key={`pop-${track.id}`} track={track} onClick={() => handleTrackSelect(track)} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Persistent bottom player bar */}
      <PlayerBar />
    </div>
  );
}
