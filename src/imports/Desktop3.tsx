import svgPaths from "./svg-ztw7noi9u0";
import type { KPFont } from "../data/types";

interface Desktop3Props {
  fonts: KPFont[];
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  testText: string;
  onTestTextChange: (t: string) => void;
  onDownload: (font: KPFont) => void;
}

function FontCard({ font, testText, onDownload }: { font: KPFont; testText: string; onDownload: () => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] h-[255px] items-start relative rounded-[10px] shrink-0 w-[235px]">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      {/* Font name header */}
      <div className="h-[83px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start p-[18px] relative size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 text-[#334155] w-full" style={{ fontFamily: font.fontFamily }}>
            <p className="h-[25px] relative shrink-0 text-[20px] w-full">{font.displayName}</p>
            <p className="h-[18px] relative shrink-0 text-[14px] w-full">{font.series}</p>
          </div>
        </div>
        <div className="absolute h-0 left-0 top-[83px] w-[235px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235 1">
              <line stroke="#E2E8F0" x2="235" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      {/* Test text preview */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center p-[18px] relative w-full">
            <div className="flex-[1_0_0] leading-[0] min-h-px min-w-px not-italic relative text-[#334155] text-[18px]" style={{ fontFamily: font.fontFamily }}>
              <p className="leading-[normal]">{testText || "동해 물과 백두산이"}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Download footer */}
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-end justify-between p-[18px] relative size-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-[199px]">
              {/* Download icon */}
              <button onClick={onDownload} className="cursor-pointer hover:opacity-70 transition-opacity">
                <svg className="block" fill="none" preserveAspectRatio="none" viewBox="0 0 20.98 20.22" width="21" height="21">
                  <g>
                    <path d={svgPaths.p7b91680} fill="#94A3B8" />
                    <path d={svgPaths.p17d5c900} fill="#94A3B8" />
                  </g>
                </svg>
              </button>
              {font.preinstalledOnRedStar && (
                <div className="bg-[#fee2e2] content-stretch flex flex-col h-[22px] items-center justify-center px-[8px] py-[4px] relative rounded-[11px] shrink-0">
                  <p className="font-['Pretendard:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#dc2626] text-[12px] whitespace-nowrap">붉은별 선탑재 폰트</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Desktop({ fonts, searchQuery, onSearchQueryChange, testText, onTestTextChange, onDownload }: Desktop3Props) {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 3">
      {/* Footer disclaimer */}
      <div className="-translate-x-1/2 absolute bg-[#f8fafc] bottom-0 content-stretch flex flex-col font-['Pretendard:Medium',sans-serif] gap-[6px] items-center justify-center leading-[normal] left-1/2 not-italic px-[312px] py-[24px] text-[#94a3b8] text-[14px] text-center w-[1920px] whitespace-nowrap">
        <p className="relative shrink-0">본 사이트는 북한 정부 또는 조선노동당과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다. 간첩 신고는 국번 없이 111</p>
        <p className="relative shrink-0">모든 폰트의 저작권은 모두 조선콤퓨터쎈터(Korea Computer Center)에게 있습니다.</p>
      </div>
      {/* Test text input */}
      <div className="absolute bg-[#f8fafc] content-stretch flex h-[48px] items-center left-[767px] px-[18px] py-[12px] rounded-[5px] top-[128px] w-[345px]">
        <input
          type="text"
          value={testText}
          onChange={e => onTestTextChange(e.target.value)}
          placeholder="테스트 문구"
          className="bg-transparent outline-none font-['Pretendard:Medium',sans-serif] text-[#334155] text-[17px] w-full placeholder:text-[#94a3b8]"
        />
      </div>
      {/* Font search input */}
      <div className="absolute bg-[#f8fafc] content-stretch flex h-[48px] items-center left-[460px] px-[18px] py-[12px] rounded-[5px] top-[128px] w-[289px]">
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchQueryChange(e.target.value)}
          placeholder="폰트 검색"
          className="bg-transparent outline-none font-['Pretendard:Medium',sans-serif] text-[#334155] text-[17px] w-full placeholder:text-[#94a3b8]"
        />
      </div>
      {/* Sort/filter button */}
      <div className="absolute bg-[#f8fafc] content-stretch flex h-[48px] items-center justify-between left-[1132px] px-[18px] py-[12px] rounded-[5px] top-[128px] w-[180px]">
        <div className="font-['Pretendard:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[#475569] text-[17px] whitespace-nowrap">
          <p className="leading-[normal]">종류</p>
        </div>
        <div className="relative shrink-0 size-[16px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path clipRule="evenodd" d={svgPaths.p1a634100} fill="#94A3B8" fillRule="evenodd" />
          </svg>
        </div>
      </div>
      {/* Font grid */}
      <div className="absolute left-[460px] top-[216px] flex flex-wrap gap-[24px] w-[1000px]">
        {fonts.map(font => (
          <FontCard
            key={font.id}
            font={font}
            testText={testText}
            onDownload={() => onDownload(font)}
          />
        ))}
      </div>
      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Font</p>
          <div className="content-stretch flex gap-[25px] items-center leading-[normal] not-italic relative shrink-0 text-[#475569] text-[15px] whitespace-nowrap">
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
            <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">폰트</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">스토어</p>
            <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
          </div>
        </div>
      </div>
    </div>
  );
}
