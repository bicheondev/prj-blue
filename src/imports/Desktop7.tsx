import svgPaths from "./svg-j8x8junng1";
import imgSheetMusic from "figma:asset/5ea02acbb0827169d136686adceb8c8f4905c7c8.png";
import type { Track } from "../data/types";

interface Desktop7Props {
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  repeat: boolean;
  shuffle: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRepeatToggle: () => void;
  onShuffleToggle: () => void;
  onNavigateToPlayer: () => void;
  onSeek: (seconds: number) => void;
  activeLyricIndex: number;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function NavItems() {
  return (
    <div className="content-stretch flex gap-[25px] items-center leading-[normal] not-italic relative shrink-0 text-[#475569] text-[15px] whitespace-nowrap">
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
      <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">음악</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">스토어</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
    </div>
  );
}

export default function Desktop({
  track,
  isPlaying,
  currentTime,
  repeat,
  shuffle,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onRepeatToggle,
  onShuffleToggle,
  onNavigateToPlayer,
  onSeek,
}: Desktop7Props) {
  const duration = track?.duration ?? 179;
  const progressPercent = duration > 0 ? currentTime / duration : 0;
  const PROGRESS_BAR_WIDTH = 1920;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(duration, ratio * duration)));
  };

  return (
    <div className="bg-white relative size-full" data-name="Desktop - 7">
      {/* Blue gradient background */}
      <div className="absolute bg-gradient-to-r from-[rgba(49,130,246,0)] h-[1008px] left-[428px] to-[rgba(49,130,246,0)] top-0 via-1/2 via-[rgba(49,130,246,0.1)] w-[1120px]" />

      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Music</p>
          <NavItems />
          <div className="bg-[#f8fafc] content-stretch flex h-[34px] items-center justify-between px-[12px] py-[8px] relative rounded-[8px] shrink-0 w-[256px]">
            <div className="overflow-clip relative shrink-0 size-[18px]">
              <svg className="block size-full" fill="none" viewBox="0 0 18 18">
                <path d={svgPaths.p2b63bd00} stroke="#94A3B8" strokeMiterlimit="10" strokeWidth="2" />
              </svg>
            </div>
            <div className="bg-white content-stretch flex h-[18px] items-center justify-center px-[6px] relative rounded-[4px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">⌘K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Left sidebar */}
      <div className="absolute bg-[#f8fafc] border-[#e2e8f0] border-r border-solid h-[944px] left-0 top-[64px] w-[56px]" />
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[4px] top-[70px] w-[48px]">
        <div className="content-stretch flex flex-col gap-[2px] h-[64px] items-center justify-center relative shrink-0 w-full">
          <div className="bg-[#e2e8f0] rounded-[8px] size-[32px]" />
          <p className="font-['Pretendard:Regular',sans-serif] leading-[17.4px] not-italic relative shrink-0 text-[#334155] text-[12px] text-center">홈</p>
        </div>
        <div className="content-stretch flex flex-col gap-[2px] h-[64px] items-center justify-center relative shrink-0 w-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[17.4px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-center">내 음악</p>
        </div>
      </div>

      {/* Bottom controls background */}
      <div className="absolute bg-[#f8fafc] bottom-0 h-[72px] left-0 w-[1920px]" />
      {/* Progress track (clickable) */}
      <div
        className="absolute bg-[#94a3b8] h-[4px] left-0 top-[1008px] w-[1920px] cursor-pointer hover:h-[6px] transition-all"
        style={{ marginTop: -1 }}
        onClick={handleProgressClick}
      />
      {/* Progress fill */}
      <div
        className="absolute bg-[#3b82f6] h-[4px] left-0 top-[1008px] transition-all duration-300 pointer-events-none"
        style={{ width: `${progressPercent * PROGRESS_BAR_WIDTH}px` }}
      />

      {/* Volume/Repeat/Shuffle right */}
      <div className="absolute content-stretch flex gap-[8px] items-center left-[1364px] top-[1026px]">
        <button className="relative shrink-0 size-[40px] cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
            <path d={svgPaths.p8785700} fill="#94A3B8" />
          </svg>
        </button>
        <button onClick={onRepeatToggle} className="relative shrink-0 size-[40px] cursor-pointer transition-opacity hover:opacity-100" style={{ opacity: repeat ? 1 : 0.5 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
            <path d={svgPaths.p2995ef00} fill={repeat ? "#3b82f6" : "#94A3B8"} />
          </svg>
        </button>
        <button onClick={onShuffleToggle} className="relative shrink-0 size-[40px] cursor-pointer transition-opacity hover:opacity-100" style={{ opacity: shuffle ? 1 : 0.5 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
            <path d={svgPaths.pbb0f1f0} fill={shuffle ? "#3b82f6" : "#94A3B8"} />
          </svg>
        </button>
      </div>

      {/* Play controls left */}
      <div className="absolute content-stretch flex gap-[8px] items-center left-[428px] top-[1026px]">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <button onClick={onPrev} className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p360b9a80} fill="#334155" />
            </svg>
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="relative shrink-0 size-[40px] cursor-pointer hover:opacity-70 transition-opacity"
          >
            {isPlaying ? (
              <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
                <rect x="10" y="8" width="7" height="24" rx="2" fill="#334155" />
                <rect x="23" y="8" width="7" height="24" rx="2" fill="#334155" />
              </svg>
            ) : (
              <svg className="absolute block size-full" fill="none" viewBox="0 0 40 40">
                <path d={svgPaths.p90a9770} fill="#334155" />
              </svg>
            )}
          </button>
          <button onClick={onNext} className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-70 transition-opacity">
            <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p338c0380} fill="#334155" />
            </svg>
          </button>
        </div>
        <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[12px] whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </p>
      </div>

      {/* Right side buttons - music note active */}
      <div className="absolute content-stretch flex flex-col items-start p-[40px] right-0 top-[64px] w-[336px]">
        <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
            {/* Lyrics button - inactive */}
            <button
              onClick={onNavigateToPlayer}
              className="bg-[#f8fafc] content-stretch flex items-center justify-center p-[16px] relative rounded-[32px] shrink-0 size-[64px] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
            >
              <svg className="size-[32px]" fill="none" viewBox="0 0 32 32">
                <path d={svgPaths.p1ae60680} fill="#475569" />
              </svg>
            </button>
            {/* Music note button - active */}
            <button className="bg-[#eff6ff] content-stretch flex items-center justify-center px-[16px] py-[14px] relative rounded-[32px] shrink-0 size-[64px] cursor-pointer hover:bg-[#dbeafe] transition-colors">
              <svg className="size-[32px]" fill="none" viewBox="0 0 32 32">
                <path d={svgPaths.p3c129200} fill="#2563EB" />
              </svg>
            </button>
          </div>
          {/* Playlist button */}
          <button className="bg-[#f8fafc] content-stretch flex items-center justify-center px-[16px] py-[14px] relative rounded-[32px] shrink-0 size-[64px] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
            <svg className="size-[32px]" fill="none" viewBox="0 0 32 32">
              <path d={svgPaths.p25fd7400} fill="#475569" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sheet music image */}
      <div className="-translate-x-1/2 absolute h-[662.791px] left-[calc(50%+28px)] pointer-events-none rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,27,55,0.1),0px_15px_80px_-5px_rgba(78,89,104,0.2)] top-[205px] w-[500px]">
        <img alt="악보" className="absolute inset-0 max-w-none object-cover rounded-[10px] size-full" src={imgSheetMusic} />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(0,23,51,0.02)]" />
      </div>

      {/* Track info center bottom */}
      <div className="-translate-x-1/2 absolute bottom-[14px] content-stretch flex gap-[8px] items-center left-[calc(50%+0.3px)]">
        <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
          <div className="relative rounded-[8px] shrink-0 size-[40px]">
            {track && <img alt={track.title} className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={track.imageUrl} />}
          </div>
          <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
            <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#334155] text-[16px] whitespace-nowrap">
              {track?.title ?? "—"}
            </p>
            <div className="content-stretch flex gap-[6.4px] items-center relative shrink-0">
              <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[16px] whitespace-nowrap">{track?.artist ?? ""}</p>
              {track?.album && (
                <>
                  <div className="relative shrink-0 size-[3px]">
                    <svg className="absolute block size-full" fill="none" viewBox="0 0 3 3">
                      <circle cx="1.5" cy="1.5" fill="#94A3B8" r="1.5" />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[16px] whitespace-nowrap">{track.album}</p>
                  <div className="relative shrink-0 size-[3px]">
                    <svg className="absolute block size-full" fill="none" viewBox="0 0 3 3">
                      <circle cx="1.5" cy="1.5" fill="#94A3B8" r="1.5" />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[16px] whitespace-nowrap">{track.year}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="relative shrink-0 size-[36px] cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 36 36">
            <path d={svgPaths.p33f2bf00} fill="#94A3B8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
