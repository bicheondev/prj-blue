import svgPaths from "./svg-ib49f4y1mz";
import type { AcademicDocument } from "../data/types";

interface Desktop8Props {
  breadcrumb: string[];
  documents: AcademicDocument[];
  onDocumentClick: (doc: AcademicDocument) => void;
}

function BookIcon() {
  return (
    <div className="relative shrink-0 size-[22px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_book)">
          <g>
            <path d={svgPaths.p1b3a34f0} fill="#E2E8F0" />
            <path d={svgPaths.p5574980} fill="#3B82F6" />
            <path d={svgPaths.p1af22800} fill="#2563EB" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_book">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DocumentRow({ doc, onClick }: { doc: AcademicDocument; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="content-stretch flex gap-[152px] h-[41px] items-center relative shrink-0 w-full cursor-pointer hover:bg-[#f8fafc] transition-colors px-[11px] -mx-[11px] rounded-[4px] text-left"
    >
      <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
        <BookIcon />
        <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#334155] text-[17px] text-ellipsis w-[200px] whitespace-nowrap">{doc.title}</p>
      </div>
      <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#64748b] text-[17px] text-ellipsis w-[200px] whitespace-nowrap">{doc.subtype}</p>
      <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#64748b] text-[17px] text-ellipsis w-[200px] whitespace-nowrap">{doc.size}</p>
    </button>
  );
}

export default function Desktop({ breadcrumb, documents, onDocumentClick }: Desktop8Props) {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 8">
      {/* Column headers */}
      <div className="absolute content-stretch flex font-['Pretendard:Regular',sans-serif] h-[44px] items-center justify-between left-[460px] px-[48px] py-[12px] top-[202px] w-[1000px]">
        <div aria-hidden="true" className="absolute border-[#94a3b8] border-b border-solid inset-0 pointer-events-none" />
        <p className="leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[200px]">이름</p>
        <p className="leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[200px]">종류</p>
        <p className="leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[200px]">크기</p>
      </div>
      {/* Breadcrumb */}
      <div className="absolute content-stretch flex font-['Pretendard:Medium',sans-serif] gap-[18px] items-center leading-[normal] left-[465px] not-italic text-[24px] top-[146px] whitespace-nowrap">
        {breadcrumb.map((item, i) => (
          <span key={i} className={i === breadcrumb.length - 1 ? "text-[#334155]" : "text-[#94a3b8]"}>
            {item}
            {i < breadcrumb.length - 1 && <span className="text-[#94a3b8] ml-[18px]">{`->`}</span>}
          </span>
        ))}
      </div>
      {/* Document rows */}
      <div className="absolute content-stretch flex flex-col items-start left-[471px] top-[246px] w-[941px]">
        {documents.map(doc => (
          <DocumentRow key={doc.id} doc={doc} onClick={() => onDocumentClick(doc)} />
        ))}
      </div>
      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Paper</p>
        </div>
      </div>
      {/* Nav items */}
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[25px] items-center leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#475569] text-[15px] top-[23px] whitespace-nowrap">
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
        <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">문헌</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">스토어</p>
        <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
      </div>
    </div>
  );
}
