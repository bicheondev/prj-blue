import svgPaths from "./svg-bgwn97ymyx";
import type { Track } from "../data/types";

interface Desktop5Props {
  recentTracks: Track[];
  onTrackSelect: (track: Track) => void;
}

function IconArrowRight() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="icon-arrow-right-small-mono">
      <div className="absolute inset-[16.3%_30.36%_16.25%_30.3%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.44163 16.1883">
          <path clipRule="evenodd" d={svgPaths.p21bd2100} fill="var(--fill-0, #475569)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function AlbumCard({ track, onClick }: { track: Track; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[167px] cursor-pointer group text-left"
    >
      <div className="h-[167px] relative rounded-[10px] shrink-0 w-full overflow-hidden">
        <img
          alt={track.title}
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full group-hover:scale-105 transition-transform duration-200"
          src={track.imageUrl}
        />
      </div>
      <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#334155] text-[16px] text-center w-full group-hover:text-[#3b82f6] transition-colors">
        {track.title}
      </p>
    </button>
  );
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

export default function Desktop({ recentTracks, onTrackSelect }: Desktop5Props) {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 5">
      {/* Header */}
      <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
        <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-[1_0_0] items-center justify-between leading-[normal] min-h-px min-w-px not-italic relative text-[#475569] whitespace-nowrap">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] tracking-[-0.6px]">★Music</p>
          <NavItems />
          <div className="content-stretch flex font-['Pretendard:Regular',sans-serif] gap-[16px] items-center relative shrink-0 text-[15px]">
            <p className="relative shrink-0">도움말</p>
            <p className="relative shrink-0">설정</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute content-stretch flex flex-col gap-[56px] items-start left-[232px] top-[120px] w-[1120px]">
        {/* Recently played */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="font-['Pretendard:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#334155] text-[34px] whitespace-nowrap">
              <p className="leading-[normal]">최근 재생한 음악</p>
            </div>
            <IconArrowRight />
          </div>
          <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full">
              {recentTracks.slice(0, 6).map((track) => (
                <AlbumCard key={track.id} track={track} onClick={() => onTrackSelect(track)} />
              ))}
            </div>
          </div>
        </div>

        {/* Popular / recommended */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <div className="font-['Pretendard:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#334155] text-[34px] whitespace-nowrap">
              <p className="leading-[normal]">인기 추천곡</p>
            </div>
            <IconArrowRight />
          </div>
          <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full">
              {recentTracks.slice(0, 6).map((track) => (
                <AlbumCard key={`popular-${track.id}`} track={track} onClick={() => onTrackSelect(track)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
