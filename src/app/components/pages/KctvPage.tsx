import { useState } from "react";
import { useNavigate } from "react-router";
import svgPaths1 from "../../../imports/svg-qbwodzc01g";
import svgPaths2 from "../../../imports/svg-su567nsdly";
import ScaledCanvas from "../ScaledCanvas";

const SCHEDULE_DATA = [
  { time: "14:27", title: "<건강과 생활섭생> 약물들의 부작용증상과 대책 - 프레드니졸론 -" },
  { time: "14:32", title: "<동승기> 원산만에서의 섭조개양식경험" },
  { time: "15:00", title: "◉ 김정은, 강동군병원과 종합봉사소 건설착공식 참석(여멘트, 동영상) ◉ 김정은 연설(여멘트, 동영상)" },
  { time: "16:05", title: "<소개편집물> 두 개의 군공메달증서가 전하는 사연" },
  { time: "16:22", title: "<아동방송시간> 만화영화: 소년장수(제95부)" },
  { time: "17:00", title: "◉ 김정은, 강동군병원과 종합봉사소 건설착공식 참석(여멘트, 동영상) ◉ 김정은 연설(여멘트, 동영상)" },
  { time: "17:53", title: "오늘호 중앙신문개관" },
];

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

const formatDate = (d: Date) =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

export default function KctvPage() {
  const navigate = useNavigate();
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 1, 5));

  const prevDay = () =>
    setCurrentDate((d) => new Date(d.getTime() - 86_400_000));
  const nextDay = () =>
    setCurrentDate((d) => new Date(d.getTime() + 86_400_000));

  return (
    <ScaledCanvas>
    <div
      className={`${showSchedule ? "bg-[#f8fafc]" : "bg-white"} relative size-full`}
    >
      {/* ── Main content ── */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Video + optional schedule panel */}
        <div className="flex gap-[26px] items-center mt-[240px]">
          {/* Video container */}
          <div className="bg-[#475569] h-[600px] rounded-[26px] w-[1067px] shrink-0 overflow-hidden relative">
            <iframe
              src="https://koryo.tv/channel/kctv"
              className="absolute inset-0 size-full border-0"
              allowFullScreen
              title="KCTV 조선중앙텔레비죤 생방송"
            />
          </div>

          {/* Schedule panel (shown when open) */}
          {showSchedule && (
            <div className="backdrop-blur-[3.5px] bg-white flex flex-col gap-[18px] h-[600px] items-start py-[8px] rounded-[26px] shrink-0 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pl-[24px] pr-[8px] w-[300px]">
                <p className="font-['Pretendard:Medium',sans-serif] text-[#334155] text-[15px] whitespace-nowrap">
                  편성표
                </p>
                <button
                  onClick={() => setShowSchedule(false)}
                  className="bg-[#3b82f6] flex items-center p-[9px] rounded-[18px] size-[36px] cursor-pointer border-0"
                >
                  <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                    <mask
                      height="18"
                      id="mask-close"
                      maskUnits="userSpaceOnUse"
                      style={{ maskType: "alpha" }}
                      width="18"
                      x="0"
                      y="0"
                    >
                      <rect fill="#D9D9D9" height="18" width="18" />
                    </mask>
                    <g mask="url(#mask-close)">
                      <path d={svgPaths2.p266b5480} fill="white" />
                    </g>
                  </svg>
                </button>
              </div>

              {/* Date navigation */}
              <div className="flex flex-col items-start px-[24px]">
                <div className="flex gap-[10px] items-center justify-center">
                  <button
                    onClick={prevDay}
                    className="bg-[#f8fafc] flex items-center p-[4px] rounded-[10px] size-[20px] cursor-pointer border-0"
                  >
                    <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                      <mask
                        height="12"
                        id="mask-back"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "alpha" }}
                        width="12"
                        x="0"
                        y="0"
                      >
                        <rect fill="#D9D9D9" height="12" width="12" />
                      </mask>
                      <g mask="url(#mask-back)">
                        <path d={svgPaths2.p329a700} fill="#334155" />
                      </g>
                    </svg>
                  </button>
                  <p className="font-['Pretendard:SemiBold',sans-serif] text-[#334155] text-[20px] tracking-[-0.6px] whitespace-nowrap">
                    {formatDate(currentDate)}
                  </p>
                  <button
                    onClick={nextDay}
                    className="bg-[#f8fafc] flex items-center p-[4px] rounded-[10px] size-[20px] cursor-pointer border-0"
                  >
                    <svg className="size-[12px]" fill="none" viewBox="0 0 12 12">
                      <mask
                        height="12"
                        id="mask-fwd-sm"
                        maskUnits="userSpaceOnUse"
                        style={{ maskType: "alpha" }}
                        width="12"
                        x="0"
                        y="0"
                      >
                        <rect fill="#D9D9D9" height="12" width="12" />
                      </mask>
                      <g mask="url(#mask-fwd-sm)">
                        <path d={svgPaths2.p1a246c00} fill="#334155" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Program list */}
              <div className="flex flex-col items-start w-full overflow-y-auto">
                {SCHEDULE_DATA.map((item, i) => (
                  <div
                    key={i}
                    className={`w-full cursor-pointer ${selectedIndex === i ? "bg-[#eff6ff]" : ""}`}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <div
                      className={`flex gap-[10px] items-start leading-[1.3] px-[24px] py-[16px] text-[15px] ${
                        selectedIndex === i ? "text-[#2563eb]" : "text-[#334155]"
                      }`}
                    >
                      <p className="font-['Pretendard:Regular',sans-serif] shrink-0 w-[38px]">
                        {item.time}
                      </p>
                      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] min-w-0">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* "편성표 보기" button (shown when schedule is hidden) */}
        {!showSchedule && (
          <div className="mt-[40px]">
            <button
              onClick={() => setShowSchedule(true)}
              className="backdrop-blur-[3.5px] bg-[#f1f5f9] flex items-center p-[8px] pl-[16px] rounded-[26px] gap-[10px] cursor-pointer border-0"
            >
              <p className="font-['Pretendard:SemiBold',sans-serif] text-[#334155] text-[17px] text-center whitespace-nowrap">
                편성표 보기
              </p>
              <div className="bg-[#3b82f6] flex items-center p-[9px] rounded-[18px] size-[36px]">
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <mask
                    height="18"
                    id="mask-arrow"
                    maskUnits="userSpaceOnUse"
                    style={{ maskType: "alpha" }}
                    width="18"
                    x="0"
                    y="0"
                  >
                    <rect fill="#D9D9D9" height="18" width="18" />
                  </mask>
                  <g mask="url(#mask-arrow)">
                    <path d={svgPaths1.p9321b80} fill="white" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#f8fafc] flex flex-col items-center justify-center px-[312px] py-[24px] w-[1920px]">
        <p className="font-['Pretendard:Medium',sans-serif] text-[#94a3b8] text-[14px] text-center whitespace-nowrap">
          본 사이트는 북한 정부 또는 조선노동당, 조성중앙텔레비전과는 전혀 관계가
          없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로
          개설되었음을 알려드립니다. 간첩 신고는 국번 없이 111
        </p>
      </div>

      {/* ── Navigation Bar ── */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div
          aria-hidden="true"
          className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none"
        />
        <div className="flex flex-[1_0_0] items-center justify-between min-h-px min-w-px">
          <p className="font-['Pretendard:Medium',sans-serif] text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">
            ★Live
          </p>
          {/* Center nav */}
          <div className="flex gap-[25px] items-center text-[#475569] text-[15px] whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <p
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`cursor-pointer ${
                  item.label === "KCTV"
                    ? "font-['Pretendard:Bold',sans-serif]"
                    : "font-['Pretendard:Regular',sans-serif]"
                }`}
              >
                {item.label}
              </p>
            ))}
          </div>
          {/* Right side placeholder */}
          <div className="flex gap-[16px] items-center font-['Pretendard:Regular',sans-serif] text-[#475569] text-[15px]">
            <p className="cursor-pointer whitespace-nowrap">도움말</p>
            <p className="cursor-pointer whitespace-nowrap">설정</p>
          </div>
        </div>
      </div>
    </div>
    </ScaledCanvas>
  );
}
