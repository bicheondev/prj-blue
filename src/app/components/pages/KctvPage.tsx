import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Hls from "hls.js";

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

// koryo.tv HLS stream URL for KCTV live
const HLS_URL = "https://koryo.tv/hls/kctv/index.m3u8";

const SCHEDULE_DATA = [
  { time: "14:27", title: "<건강과 생활섭생> 약물들의 부작용증상과 대책 - 프레드니졸론 -" },
  { time: "14:32", title: "<동승기> 원산만에서의 섭조개양식경험" },
  { time: "15:00", title: "◉ 김정은, 강동군병원과 종합봉사소 건설착공식 참석(여멘트, 동영상) ◉ 김정은 연설(여멘트, 동영상)" },
  { time: "16:05", title: "<소개편집물> 두 개의 군공메달증서가 전하는 사연" },
  { time: "16:22", title: "<아동방송시간> 만화영화: 소년장수(제95부)" },
  { time: "17:00", title: "◉ 김정은, 강동군병원과 종합봉사소 건설착공식 참석(여멘트, 동영상) ◉ 김정은 연설(여멘트, 동영상)" },
  { time: "17:53", title: "오늘호 중앙신문개관" },
];

const formatDate = (d: Date) =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

function HlsPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setIsLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setIsLoading(false);
          setError("스트림을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
      });

      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = src;
      const onMeta = () => {
        setIsLoading(false);
        video.play().catch(() => {});
      };
      const onErr = () => {
        setIsLoading(false);
        setError("스트림을 불러올 수 없습니다.");
      };
      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("error", onErr);
      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("error", onErr);
      };
    } else {
      setIsLoading(false);
      setError("이 브라우저는 HLS 스트리밍을 지원하지 않습니다.");
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  return (
    <div className="relative size-full bg-black rounded-[26px] overflow-hidden">
      <video
        ref={videoRef}
        className="size-full object-contain"
        controls
        muted
        playsInline
      />
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-[26px]">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3" />
          <p className="font-['Pretendard:Medium',sans-serif] text-white text-[14px]">스트림 연결 중...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-[26px] px-8">
          <span className="material-symbols-rounded text-white/50 text-[48px] mb-3">signal_wifi_off</span>
          <p className="font-['Pretendard:Medium',sans-serif] text-white/70 text-[14px] text-center">{error}</p>
          <p className="font-['Pretendard:Regular',sans-serif] text-white/40 text-[12px] text-center mt-2">
            koryo.tv에서 직접 시청하시거나 잠시 후 새로고침해주세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default function KctvPage() {
  const navigate = useNavigate();
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 5));

  const prevDay = () => setCurrentDate((d) => new Date(d.getTime() - 86_400_000));
  const nextDay = () => setCurrentDate((d) => new Date(d.getTime() + 86_400_000));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-[#e2e8f0] h-[64px] flex items-center justify-between px-6 md:px-[232px]">
        <p className="font-['Pretendard:Medium',sans-serif] text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">
          ★Live
        </p>
        <nav className="hidden md:flex gap-[25px] items-center text-[#475569] text-[15px]">
          {NAV_ITEMS.map((item) => (
            <p
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer whitespace-nowrap ${
                item.label === "KCTV"
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

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-[40px] px-4 md:px-8">
        <div className="flex gap-[26px] items-start w-full max-w-[1200px]">
          {/* Video container */}
          <div
            className="flex-1 min-w-0 rounded-[26px] overflow-hidden shadow-lg"
            style={{ aspectRatio: "16/9" }}
          >
            <HlsPlayer src={HLS_URL} />
          </div>

          {/* Schedule panel */}
          {showSchedule && (
            <div className="w-[300px] shrink-0 bg-white border border-[#e2e8f0] rounded-[26px] flex flex-col overflow-hidden shadow-sm" style={{ height: "min(600px, 80vh)" }}>
              {/* Header */}
              <div className="flex items-center justify-between pl-[24px] pr-[8px] py-[14px] border-b border-[#e2e8f0]">
                <p className="font-['Pretendard:Medium',sans-serif] text-[#334155] text-[15px]">편성표</p>
                <button
                  onClick={() => setShowSchedule(false)}
                  className="bg-[#3b82f6] flex items-center justify-center rounded-full size-[36px] cursor-pointer border-0 hover:bg-[#2563eb] transition-colors"
                >
                  <span className="material-symbols-rounded text-white text-[18px]">close</span>
                </button>
              </div>

              {/* Date navigation */}
              <div className="flex items-center gap-[10px] px-[24px] py-[12px] border-b border-[#f1f5f9]">
                <button
                  onClick={prevDay}
                  className="bg-[#f8fafc] flex items-center justify-center rounded-[8px] size-[28px] cursor-pointer border-0 hover:bg-[#f1f5f9] transition-colors"
                >
                  <span className="material-symbols-rounded text-[#334155] text-[16px]">chevron_left</span>
                </button>
                <p className="font-['Pretendard:SemiBold',sans-serif] text-[#334155] text-[14px] flex-1 text-center whitespace-nowrap">
                  {formatDate(currentDate)}
                </p>
                <button
                  onClick={nextDay}
                  className="bg-[#f8fafc] flex items-center justify-center rounded-[8px] size-[28px] cursor-pointer border-0 hover:bg-[#f1f5f9] transition-colors"
                >
                  <span className="material-symbols-rounded text-[#334155] text-[16px]">chevron_right</span>
                </button>
              </div>

              {/* Program list */}
              <div className="flex-1 overflow-y-auto">
                {SCHEDULE_DATA.map((item, i) => (
                  <button
                    key={i}
                    className={`w-full text-left cursor-pointer border-0 px-[24px] py-[14px] transition-colors bg-transparent ${
                      selectedIndex === i ? "bg-[#eff6ff]" : "hover:bg-[#f8fafc]"
                    }`}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <div className="flex gap-[10px] items-start leading-[1.3] text-[14px]">
                      <span
                        className={`font-['Pretendard:Regular',sans-serif] shrink-0 w-[38px] ${
                          selectedIndex === i ? "text-[#2563eb]" : "text-[#94a3b8]"
                        }`}
                      >
                        {item.time}
                      </span>
                      <span
                        className={`font-['Pretendard:SemiBold',sans-serif] flex-1 min-w-0 ${
                          selectedIndex === i ? "text-[#2563eb]" : "text-[#334155]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* "편성표 보기" button */}
        {!showSchedule && (
          <div className="mt-[32px]">
            <button
              onClick={() => setShowSchedule(true)}
              className="bg-[#f1f5f9] flex items-center gap-[10px] pl-[16px] pr-[8px] py-[8px] rounded-full cursor-pointer border-0 hover:bg-[#e2e8f0] transition-colors"
            >
              <p className="font-['Pretendard:SemiBold',sans-serif] text-[#334155] text-[17px]">편성표 보기</p>
              <div className="bg-[#3b82f6] flex items-center justify-center rounded-full size-[36px]">
                <span className="material-symbols-rounded text-white text-[18px]">arrow_forward</span>
              </div>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] px-8 py-[24px]">
        <p className="font-['Pretendard:Medium',sans-serif] text-[#94a3b8] text-[14px] text-center">
          본 사이트는 북한 정부 또는 조선노동당, 조성중앙텔레비전과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다. 간첩 신고는 국번 없이 111
        </p>
      </footer>
    </div>
  );
}
