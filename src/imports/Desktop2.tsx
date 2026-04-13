import svgPaths from "./svg-ix5zmfoln4";
import type { DictionaryEntry, DictionarySource } from "../data/types";
import { useNavigate } from "react-router";

interface Desktop2Props {
  query: string;
  source: DictionarySource;
  results: DictionaryEntry[];
  totalCount: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p1a634100} fill="var(--fill-0, #94A3B8)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PartOfSpeechBadge({ label }: { label: string }) {
  return (
    <div className="bg-[#f8fafc] content-stretch flex h-[20px] items-center justify-center px-[7px] relative rounded-[1000px] shrink-0">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[11px] text-center whitespace-nowrap">{label}</p>
    </div>
  );
}

function SenseNumberBadge({ number }: { number: string }) {
  return (
    <div className="bg-[#fef2f2] content-stretch flex h-[20px] items-center justify-center px-[7px] relative rounded-[1000px] shrink-0">
      <p className="font-['Pretendard_JP:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#dc2626] text-[11px] text-center whitespace-nowrap">{number}</p>
    </div>
  );
}

function SouthKoreanBadge({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-[#eff6ff] content-stretch flex h-[20px] items-center justify-center px-[7px] relative rounded-[1000px] shrink-0 cursor-pointer hover:bg-[#dbeafe] transition-colors">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#2563eb] text-[11px] text-center whitespace-nowrap">{label} ↗</p>
    </button>
  );
}

function DictionaryEntryCard({ entry, onRelatedSearch }: { entry: DictionaryEntry; onRelatedSearch: (word: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 pb-[16px] border-b border-[#f1f5f9] last:border-0">
      {/* Header row: headword + hanja + southKorean badge */}
      <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
        <div className="content-stretch flex gap-[2px] items-center leading-[0] not-italic relative shrink-0 whitespace-nowrap">
          <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center relative shrink-0 text-[#475569] text-[17px]">
            <p className="leading-[normal]">{entry.headword}</p>
          </div>
          {entry.hanja && (
            <div className="flex flex-col font-['Pretendard_JP:Regular',sans-serif] justify-center relative shrink-0 text-[#64748b] text-[16px]">
              <p className="leading-[normal]">{entry.hanja}</p>
            </div>
          )}
        </div>
        {entry.southKorean && (
          <SouthKoreanBadge label={entry.southKorean} onClick={() => onRelatedSearch(entry.southKorean!)} />
        )}
      </div>
      {/* Senses */}
      {entry.senses.map((sense) => (
        <div key={sense.number} className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
          <PartOfSpeechBadge label={entry.partOfSpeech} />
          <SenseNumberBadge number={sense.number} />
          <div className="flex flex-col font-['Pretendard_JP:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#475569] text-[15px] flex-1">
            <p className="leading-[normal]">{sense.definition}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[25px] items-center leading-[normal] not-italic relative shrink-0 text-[#475569] text-[15px] whitespace-nowrap">
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
    <div className="content-stretch flex font-['Pretendard:Regular',sans-serif] gap-[16px] items-center relative shrink-0 text-[15px] text-[#475569]">
      <p className="relative shrink-0">도움말</p>
      <p className="relative shrink-0">설정</p>
    </div>
  );
}

export default function Desktop({
  query,
  source,
  results,
  totalCount,
  pageSize,
  onPageSizeChange,
}: Desktop2Props) {
  const navigate = useNavigate();

  const handleRelatedSearch = (word: string) => {
    navigate(`/search?q=${encodeURIComponent(word)}&source=${encodeURIComponent(source)}`);
  };

  return (
    <div className="bg-white relative size-full" data-name="Desktop - 2">
      {/* Header nav */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-center justify-between leading-[normal] min-h-px min-w-px not-italic relative text-[#475569] whitespace-nowrap">
          <p className="font-['Pretendard:Medium',sans-serif] relative shrink-0 text-[20px] tracking-[-0.6px]">★Dictionary</p>
          <Frame9 />
          <Frame10 />
        </div>
      </div>

      {/* Results section */}
      <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[232px] top-[100px] w-[1456px]">
        {/* Results header */}
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="content-stretch flex flex-col font-['Pretendard_JP:Regular',sans-serif] gap-[2px] items-start not-italic relative shrink-0">
            <p className="leading-[0] relative shrink-0 text-[#334155] text-[0px]">
              <span className="font-['Pretendard_JP:Bold',sans-serif] leading-[1.45] text-[24px]">'{query}'</span>
              <span className="font-['Pretendard_JP:Bold',sans-serif] leading-[1.45] text-[24px]">가 포함된 찾기 결과</span>
            </p>
            <p className="leading-[1.45] relative shrink-0 text-[#64748b] text-[15px]">총 {totalCount}개</p>
          </div>
          {/* Page size selector */}
          <div className="relative">
            <div className="bg-[#f8fafc] content-stretch flex gap-[4px] h-[32px] items-center justify-center pl-[12px] pr-[8px] py-[8px] relative rounded-[9px] shrink-0">
              <p className="font-['Pretendard_JP:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[14px] whitespace-nowrap">{pageSize}개씩 보기</p>
              <ChevronDown />
            </div>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            >
              <option value={10}>10개씩 보기</option>
              <option value={25}>25개씩 보기</option>
              <option value={50}>50개씩 보기</option>
            </select>
          </div>
        </div>

        {/* Results list */}
        {results.length === 0 ? (
          <div className="content-stretch flex items-center justify-center w-full py-[80px]">
            <p className="font-['Pretendard:Regular',sans-serif] text-[#94a3b8] text-[17px]">
              '{query}'에 대한 검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full overflow-y-auto max-h-[840px]">
            {results.map((entry) => (
              <DictionaryEntryCard
                key={entry.id}
                entry={entry}
                onRelatedSearch={handleRelatedSearch}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="-translate-x-1/2 absolute bg-[#f8fafc] content-stretch flex flex-col font-['Pretendard:Medium',sans-serif] gap-[6px] h-[88px] items-center justify-center left-1/2 not-italic px-[232px] py-[23px] text-[#94a3b8] text-[14px] text-center top-[992px] w-[1920px] whitespace-nowrap">
        <p className="leading-[normal] relative shrink-0">본 사이트는 북한 정부 또는 조선노동당과는 전혀 관계가 없으며, 이들을 지지하지도 옹호하지도 않고 오로지 학문적인 목적으로 개설되었음을 알려드립니다.</p>
        <p className="leading-[0] relative shrink-0">
          <span className="leading-[normal]">{`Dictionaries from `}</span>
          <a className="cursor-pointer decoration-solid leading-[normal] underline" href="https://github.com/digitalprk/dicrs" target="_blank">
            Github digitalprk/dicrs
          </a>
        </p>
      </div>
    </div>
  );
}
