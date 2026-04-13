import imgImage1 from "figma:asset/a16ac54d8f28bca4dd21f135c7a35ef1966d8831.png";
import imgImage2 from "figma:asset/e1bf144cc4b21883acbc1ad418c48a99f9e60220.png";

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="font-['Pretendard:Medium',sans-serif] min-w-full relative shrink-0 text-[#94a3b8] text-[10px] w-[min-content]">
        <p className="leading-[normal]">대동강맥주공장</p>
      </div>
      <div className="font-['Pretendard:Bold',sans-serif] relative shrink-0 text-[#334155] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">대동강 2호 맥주 500ml</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[460px] not-italic top-[374px]">
      <Frame8 />
      <div className="font-['Pretendard:Bold',sans-serif] min-w-full relative shrink-0 text-[#2563eb] text-[16px] w-[min-content]">
        <p className="leading-[normal]">₩15,000</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="font-['Pretendard:Medium',sans-serif] min-w-full relative shrink-0 text-[#94a3b8] text-[10px] w-[min-content]">
        <p className="leading-[normal]">대동강식료공장</p>
      </div>
      <div className="font-['Pretendard:Bold',sans-serif] relative shrink-0 text-[#334155] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">평양소주 360ml</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[665px] not-italic top-[374px]">
      <Frame10 />
      <div className="font-['Pretendard:Bold',sans-serif] min-w-full relative shrink-0 text-[#2563eb] text-[16px] w-[min-content]">
        <p className="leading-[normal]">₩24,000</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white h-full min-w-[80px] relative rounded-[1000px] shrink-0 w-[80px]">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[14px] py-[10px] relative size-full">
          <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#64748b] text-[17px] text-center">전체</p>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[80px] px-[14px] py-[10px] relative rounded-[1000px] shrink-0 w-[102px]">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#64748b] text-[17px]">대동강맥주</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[80px] px-[14px] py-[10px] relative rounded-[1000px] shrink-0 w-[87px]">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#64748b] text-[17px]">평양소주</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#f8fafc] content-stretch flex h-[44px] items-center justify-center left-1/2 p-[4px] rounded-[1000px] top-[102px]">
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#475569] text-[20px] tracking-[-0.6px] whitespace-nowrap">★Store</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.7)] content-stretch flex h-[64px] items-center justify-center left-0 px-[232px] py-[18px] top-0 w-[1920px]">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[25px] items-center leading-[normal] left-[calc(50%+0.5px)] not-italic text-[#475569] text-[15px] top-[23px] whitespace-nowrap">
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">사전</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">음악</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">폰트</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">뉴스</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">번역</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">문헌</p>
      <p className="font-['Pretendard:Bold',sans-serif] relative shrink-0">스토어</p>
      <p className="font-['Pretendard:Regular',sans-serif] relative shrink-0">KCTV</p>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop - 9">
      <div className="absolute bg-[#f8fafc] left-[460px] rounded-[12px] size-[181px] top-[181px]" />
      <div className="absolute bg-[#f8fafc] left-[665px] rounded-[12px] size-[181px] top-[181px]" />
      <div className="absolute h-[115px] left-[535px] top-[214px] w-[32px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[115px] left-[740px] top-[214px] w-[32px]" data-name="image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
      <Frame7 />
      <Frame9 />
      <Frame3 />
      <Frame />
      <Frame2 />
    </div>
  );
}