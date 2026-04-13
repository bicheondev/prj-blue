import svgPaths from "./svg-4el4pw56f8";
import type { DictionarySource } from "../data/types";

interface Desktop1Props {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  activeSource: DictionarySource;
  onSourceChange: (source: DictionarySource) => void;
  autocomplete: string[];
  showAutocomplete: boolean;
  onAutocompleteSelect: (word: string) => void;
}

const SOURCES: { label: string; value: DictionarySource; width: string }[] = [
  { label: "조선어대사전", value: "조선어대사전", width: "w-[117px]" },
  { label: "비약과학기술용어사전", value: "비약과학기술용어사전", width: "w-[175px]" },
  { label: "영조사전", value: "영조사전", width: "w-[87px]" },
  { label: "중조사전", value: "중조사전", width: "w-[87px]" },
  { label: "불조사전", value: "불조사전", width: "w-[87px]" },
  { label: "일조사전", value: "일조사전", width: "w-[87px]" },
  { label: "독조사전", value: "독조사전", width: "w-[87px]" },
  { label: "로조사전", value: "로조사전", width: "w-[87px]" },
];

function Frame5() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f8fafc] content-stretch flex flex-col font-['Pretendard:Medium',sans-serif] gap-[6px] h-[88px] items-center justify-center left-1/2 not-italic px-[232px] py-[23px] text-[#94a3b8] text-[14px] text-center top-[992px] w-[1920px] whitespace-nowrap">
      <p className="leading-[normal] relative shrink-0">본 사이트는 북한 정부 또는 조선노동당과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다. 본 사전에 포함된 정의와 용례에는 편향적이고 거짓된 내용이 담겨 있을 수 있습니다. 간첩 신고는 국번 없이 111</p>
      <p className="leading-[0] relative shrink-0">
        <span className="leading-[normal]">{`Dictionaries from `}</span>
        <a className="[text-decoration-skip-ink:none] cursor-pointer decoration-solid leading-[normal] underline" href="https://github.com/digitalprk/dicrs" target="_blank">
          <span className="[text-decoration-skip-ink:none] decoration-solid underline">
            Github digitalprk/dicrs
          </span>
        </a>
      </p>
    </div>
  );
}

function LogoKk() {
  return (
    <div className="h-[87.143px] relative shrink-0 w-[130px]" data-name="logo_kk 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 130 87.1429">
        <g id="logo_kk 1">
          <path d={svgPaths.p37a808c0} fill="var(--fill-0, #475569)" id="Vector" />
          <path d={svgPaths.p4695a00} fill="var(--fill-0, #475569)" id="Vector_2" />
          <path d={svgPaths.p29cfb400} fill="var(--fill-0, #475569)" id="Vector_3" />
          <path d={svgPaths.p8f4de80} fill="var(--fill-0, #475569)" id="Vector_4" />
          <path d={svgPaths.p9e77380} fill="var(--fill-0, #475569)" id="Vector_5" />
          <path d={svgPaths.p1c930600} fill="var(--fill-0, #475569)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[12.47%_11.85%_11.85%_12.48%]" data-name="Group">
      <div className="absolute inset-[-7.46%_-7.34%_-7.35%_-7.46%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6387 15.638">
          <g id="Group">
            <path d={svgPaths.p2b63bd00} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeMiterlimit="10" strokeWidth="2.032" />
            <path d={svgPaths.p3187f180} id="Line" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.001" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Frame">
      <Group />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 text-[15px]">
      <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">사전</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">스토어</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex font-['Pretendard:Regular',sans-serif] gap-[16px] items-center relative shrink-0 text-[15px]">
      <p className="relative shrink-0">도움말</p>
      <p className="relative shrink-0">설정</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between leading-[normal] min-h-px min-w-px not-italic relative text-[#475569] whitespace-nowrap">
      <p className="font-['Pretendard:Medium',sans-serif] relative shrink-0 text-[20px] tracking-[-0.6px]">★Dictionary</p>
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Frame8 />
    </div>
  );
}

export default function Desktop({
  query,
  onQueryChange,
  onSearch,
  activeSource,
  onSourceChange,
  autocomplete,
  showAutocomplete,
  onAutocompleteSelect,
}: Desktop1Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="bg-white relative size-full" data-name="Desktop - 1">
      <Frame5 />

      {/* Center search area */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[calc(50%-156.43px)]">
        <LogoKk />
        {/* Search row */}
        <div className="content-stretch flex gap-[24px] items-center justify-center relative shrink-0 w-full">
          {/* Search input */}
          <div className="bg-[#f8fafc] content-stretch flex h-[48px] items-center gap-[10px] px-[18px] py-[15px] relative rounded-[10px] shrink-0 w-[420px]" data-name="Frame">
            <Frame4 />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어를 입력하세요"
              className="bg-transparent flex-1 font-['Pretendard:Medium',sans-serif] text-[#475569] text-[16px] outline-none placeholder-[#94a3b8]"
            />
            <div className="bg-white content-stretch flex h-[24px] items-center justify-center px-[8px] py-[5px] relative rounded-[4px] shrink-0">
              <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">⌘</p>
              <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">K</p>
            </div>
          </div>
          {/* Search button */}
          <button
            onClick={onSearch}
            className="bg-[#3b82f6] cursor-pointer content-stretch flex flex-col h-[48px] items-center justify-center px-[28px] py-[18px] relative rounded-[8px] shrink-0 hover:bg-[#2563eb] transition-colors"
          >
            <p className="font-['Pretendard:Bold',sans-serif] leading-[1.6] not-italic relative shrink-0 text-[#f8fafc] text-[16px] text-center whitespace-nowrap">찾기</p>
          </button>
        </div>
      </div>

      <Frame7 />

      {/* Dictionary source tabs */}
      <div className="-translate-x-1/2 absolute bg-[#f1f5f9] content-stretch flex h-[44px] items-center justify-center left-1/2 p-[4px] rounded-[1000px] top-[102px]">
        {SOURCES.map((src) => (
          <button
            key={src.value}
            onClick={() => onSourceChange(src.value)}
            className={`content-stretch flex items-center justify-center min-w-[80px] px-[14px] py-[10px] relative rounded-[1000px] shrink-0 ${src.width} cursor-pointer transition-colors ${
              activeSource === src.value ? "bg-white" : "hover:bg-white/50"
            }`}
          >
            <p className={`flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#64748b] text-[17px] ${activeSource === src.value ? "" : "text-center"}`}>
              {src.label}
            </p>
          </button>
        ))}
      </div>

      {/* Autocomplete dropdown */}
      {showAutocomplete && autocomplete.length > 0 && (
        <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start left-[696px] px-[10px] py-[16px] rounded-[10px] top-[493px] w-[420px] z-10">
          <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1)]" />
          {autocomplete.map((word, i) => (
            <button
              key={i}
              onClick={() => onAutocompleteSelect(word)}
              className="relative shrink-0 w-full text-left hover:bg-[#f1f5f9] rounded-[6px] transition-colors"
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative w-full">
                  <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#3b82f6] text-[16px]">
                    {word}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
