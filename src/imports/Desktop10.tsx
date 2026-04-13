import svgPaths from "./svg-z97mr3xuyh";

function StatMinus() {
  return (
    <div className="relative shrink-0 size-[19px]" data-name="stat_minus_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="stat_minus_1">
          <mask height="19" id="mask0_1_1857" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="19" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="19" id="Bounding box" width="19" />
          </mask>
          <g mask="url(#mask0_1_1857)">
            <path d={svgPaths.p35ff1300} fill="var(--fill-0, #94A3B8)" id="stat_minus_1_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatMinus1() {
  return (
    <div className="relative shrink-0 size-[19px]" data-name="stat_minus_1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="stat_minus_1">
          <mask height="19" id="mask0_1_1850" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="19" x="0" y="0">
            <rect fill="var(--fill-0, #3182F6)" height="19" id="Bounding box" width="19" />
          </mask>
          <g mask="url(#mask0_1_1850)">
            <path d={svgPaths.p35ff1300} fill="var(--fill-0, #60A5FA)" id="stat_minus_1_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

interface Desktop10Props {
  sourceText: string;
  translatedText: string;
  isLoading: boolean;
  onSourceTextChange: (text: string) => void;
  onTranslate: () => void;
  onSwap: () => void;
}

export default function Desktop({ sourceText, translatedText, isLoading, onSourceTextChange, onTranslate, onSwap }: Desktop10Props) {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 10">
      {/* Left text panel */}
      <div className="absolute bg-[#f8fafc] content-stretch flex flex-col gap-[8px] h-[400px] items-start left-[308px] p-[24px] rounded-[12px] top-[246px] w-[636px]">
        {/* "영어" label */}
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[16px] whitespace-nowrap">영어</p>
          <StatMinus />
        </div>
        <textarea
          value={sourceText}
          onChange={e => onSourceTextChange(e.target.value)}
          placeholder="번역할 텍스트를 입력하세요"
          className="w-full flex-1 bg-transparent resize-none outline-none font-['Pretendard:Bold',sans-serif] text-[#64748b] text-[24px] leading-normal"
        />
      </div>
      {/* Right translation panel */}
      <div className="absolute bg-[#f8fafc] content-stretch flex flex-col gap-[8px] h-[400px] items-start left-[976px] p-[24px] rounded-[12px] top-[246px] w-[636px]">
        <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#3b82f6] text-[16px] whitespace-nowrap">조선어</p>
          <StatMinus1 />
        </div>
        <p className="font-['Pretendard:Bold',sans-serif] leading-normal not-italic relative shrink-0 text-[#3b82f6] text-[24px] w-[588px]">
          {isLoading ? "번역 중..." : (translatedText || "번역 결과가 여기에 표시됩니다.")}
        </p>
      </div>
      {/* Translate button */}
      <button onClick={onTranslate} className="absolute bg-[#3b82f6] content-stretch flex flex-col h-[38px] items-center justify-center left-[1552px] px-[16px] py-[18px] rounded-[8px] top-[192px] cursor-pointer hover:bg-[#2563eb] transition-colors">
        <p className="font-['Pretendard:Bold',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">번역</p>
      </button>
      {/* Swap button */}
      <button onClick={onSwap} className="absolute left-[906px] size-[38px] top-[192px] cursor-pointer hover:opacity-80 transition-opacity">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
          <g id="Frame">
            <rect fill="#EFF6FF" height="38" rx="8" width="38" />
            <path d={svgPaths.p286a3a00} fill="#2563EB" id="published_with_changes" />
          </g>
        </svg>
      </button>
      {/* Footer */}
      <div className="-translate-x-1/2 absolute bg-[#f8fafc] bottom-0 content-stretch flex flex-col items-center justify-center left-1/2 px-[312px] py-[24px] w-[1920px]">
        <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[14px] text-center whitespace-nowrap">본 사이트는 북한 정부 또는 조선노동당과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다. 간첩 신고는 국번 없이 111</p>
      </div>
      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Translate</p>
        </div>
      </div>
      {/* Nav items */}
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[25px] items-center leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#475569] text-[15px] top-[23px] whitespace-nowrap">
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
        <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">번역</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">스토어</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
      </div>
    </div>
  );
}
